package com.cirobtorres.blog.api.oauth2;

import com.cirobtorres.blog.api.ApiApplicationProperties;
import com.cirobtorres.blog.api.token.dtos.TokensDTO;
import com.cirobtorres.blog.api.token.services.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.jspecify.annotations.NonNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.Objects;
import java.util.UUID;

@Component
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {
    private final JwtService jwtService;
    private final String webUrl;
    private static final Logger log = LoggerFactory.getLogger(OAuth2SuccessHandler.class);

    public OAuth2SuccessHandler(
            ApiApplicationProperties apiApplicationProperties,
            JwtService jwtService
    ) {
        this.jwtService = jwtService;
        this.webUrl = apiApplicationProperties.getFrontend().getUrl();
    }

    @Override
    public void onAuthenticationSuccess(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull Authentication authentication
    ) throws IOException {
        OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();
        String domainUserId = Objects.requireNonNull(oauthUser).getAttribute("domainUserId");

        if (domainUserId == null || domainUserId.isBlank()) {
            log.error("Login OAuth2 fail: domainUserId is missing. oauthUser.getAttributes() = {}", oauthUser.getAttributes());
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Erro na identificação do usuário");
            return;
        }

        UUID userId = UUID.fromString(domainUserId);

        try {
            TokensDTO tokens = jwtService.createTokensForOAuth2User(userId);
            jwtService.addTokensToCookies(response, tokens);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }

        request.getSession().invalidate();
        SecurityContextHolder.clearContext();
        String callbackUrl = webUrl + "/local/auth/callback";
        response.sendRedirect(callbackUrl);
    }
}
