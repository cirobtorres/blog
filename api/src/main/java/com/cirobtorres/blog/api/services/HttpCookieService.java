package com.cirobtorres.blog.api.services;

import com.cirobtorres.blog.api.ApiApplicationProperties;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
public class HttpCookieService {
    private final boolean isProd;
    private final String domain;

    public HttpCookieService(ApiApplicationProperties apiProperties) {
        this.isProd = apiProperties.getApplication().isProduction();
        this.domain = resolveCookieDomain(apiProperties.getApplication().getDomain());
    }


    // Adds cookies to secure HTTP responses (HttpOnly, SameSite=Lax)
    public void addCookie(HttpServletResponse response, String name, String value, long maxAge) {
        addCookie(response, name, value, maxAge, true, "Lax", "/");
    }

    // Adds flexible cookies with custom params
    public void addCookie(
            HttpServletResponse response,
            String name,
            String value,
            long maxAge,
            boolean httpOnly,
            String sameSite,
            String path
    ) {
        ResponseCookie cookie = buildCookie(name, value, maxAge, httpOnly, sameSite, path);
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }

    // Invalidates cookies
    public void clearCookie(HttpServletResponse response, String name) {
        addCookie(response, name, "", 0);
    }

    // Factory
    public ResponseCookie buildCookie(
            String name,
            String value,
            long maxAge,
            boolean httpOnly,
            String sameSite,
            String path
    ) {
        ResponseCookie.ResponseCookieBuilder builder = ResponseCookie
                .from(name, value == null ? "" : value)
                .httpOnly(httpOnly)
                .secure(isProd)
                .path(path)
                .maxAge(Duration.ofSeconds(maxAge))
                .sameSite(sameSite);

        if (domain != null) {
            builder.domain(domain);
        }

        return builder.build();
    }

    private String resolveCookieDomain(String domain) {
        if (domain == null || domain.isBlank()) {
            return null;
        }

        String cleanDomain = domain.trim().toLowerCase();

        if (cleanDomain.equals("localhost") || cleanDomain.equals("127.0.0.1")) {
            return null;
        }

        return cleanDomain;
    }
}