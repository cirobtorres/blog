package com.cirobtorres.blog.api.configs;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.jspecify.annotations.NonNull;
import org.slf4j.MDC;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.UUID;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class LoggingFilterConfiguration extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        try {
            // IP
            String clientIp = request.getHeader("X-Forwarded-For");
            if (clientIp == null) clientIp = request.getRemoteAddr();
            MDC.put("client_ip", clientIp);

            // REQUEST TRACK
            MDC.put("request_id", UUID.randomUUID().toString().substring(0, 8));

            // CONTINUE
            filterChain.doFilter(request, response);

        } finally {
            MDC.clear(); // CLEAN UP
        }
    }
}