package com.cirobtorres.blog.api.configs;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpMethod;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.net.URI;
import java.util.Set;

public class SameOriginMutationFilter extends OncePerRequestFilter {
    private final Set<String> allowedOrigins;

    public SameOriginMutationFilter(Set<String> allowedOrigins) {
        this.allowedOrigins = allowedOrigins;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path = request.getRequestURI();
        return path.equals("/auth/register");
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        String method = request.getMethod();

        boolean isMutation =
                HttpMethod.POST.matches(method)
                        || HttpMethod.PUT.matches(method)
                        || HttpMethod.PATCH.matches(method)
                        || HttpMethod.DELETE.matches(method);

        if (!isMutation) {
            filterChain.doFilter(request, response);
            return;
        }

        String origin = request.getHeader("Origin");
        String referer = request.getHeader("Referer");

        if (origin != null && allowedOrigins.contains(origin)) {
            filterChain.doFilter(request, response);
            return;
        }

        if (origin == null && referer != null) {
            try {
                URI uri = URI.create(referer);
                String refererOrigin = uri.getScheme() + "://" + uri.getAuthority();

                if (allowedOrigins.contains(refererOrigin)) {
                    filterChain.doFilter(request, response);
                    return;
                }
            } catch (Exception ignored) {
            }
        }

        response.sendError(HttpServletResponse.SC_FORBIDDEN, "Invalid request origin");
    }
}
