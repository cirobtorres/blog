package com.cirobtorres.blog.api.services;

import com.cirobtorres.blog.api.ApiApplicationProperties;
import jakarta.servlet.http.HttpServletResponse;
import org.keycloak.representations.AccessTokenResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;

import java.net.URI;

@Service
public class AuthCookieService {
    private final boolean isProd;
    private final String domain;

    public AuthCookieService(ApiApplicationProperties apiApplicationProperties) {
        this.isProd = apiApplicationProperties.getApplication().isProduction();
        this.domain = apiApplicationProperties.getFrontend().getUrl();
    }

    public void addAuthCookies(HttpServletResponse response, AccessTokenResponse tokenResponse) {
        addCookie(
                response,
                "access_token",
                tokenResponse.getToken(),
                tokenResponse.getExpiresIn()
        );

        addCookie(
                response,
                "refresh_token",
                tokenResponse.getRefreshToken(),
                tokenResponse.getRefreshExpiresIn()
        );
    }

    public void clearAuthCookies(HttpServletResponse response) {
        addCookie(response, "access_token", "", 0);
        addCookie(response, "refresh_token", "", 0);
    }

    private void addCookie(HttpServletResponse response, String name, String value, long maxAge) {
        ResponseCookie.ResponseCookieBuilder builder = ResponseCookie
                .from(name, value == null ? "" : value)
                .httpOnly(true)
                .secure(isProd)
                .path("/")
                .maxAge(maxAge)
                .sameSite("Lax");

        String cookieDomain = resolveCookieDomain(domain);

        if (cookieDomain != null) {
            builder.domain(cookieDomain);
        }

        response.addHeader(HttpHeaders.SET_COOKIE, builder.build().toString());
    }

    private String resolveCookieDomain(String frontendUrl) {
        try {
            String host = URI.create(frontendUrl).getHost();

            if (host == null || host.equals("localhost") || host.equals("127.0.0.1")) {
                return null;
            }

            return host;
        } catch (Exception e) {
            return null;
        }
    }
}