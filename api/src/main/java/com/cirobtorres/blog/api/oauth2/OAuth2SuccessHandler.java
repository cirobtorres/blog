package com.cirobtorres.blog.api.oauth2;

import com.cirobtorres.blog.api.ApiApplicationProperties;
import com.cirobtorres.blog.api.role.Roles;
import com.cirobtorres.blog.api.token.AuthorityExtractor;
import com.cirobtorres.blog.api.token.JwtService;
import com.cirobtorres.blog.api.user.User;
import com.cirobtorres.blog.api.user.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.jspecify.annotations.NonNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {
    private final ApiApplicationProperties apiApplicationProperties;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final AuthorityExtractor authorityExtractor;

    private static final Logger log = LoggerFactory.getLogger(OAuth2SuccessHandler.class);

    public OAuth2SuccessHandler(
            ApiApplicationProperties apiApplicationProperties,
            JwtService jwtService,
            UserRepository userRepository,
            AuthorityExtractor authorityExtractor
    ) {
        this.apiApplicationProperties = apiApplicationProperties;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.authorityExtractor = authorityExtractor;
    }

    @Override
    public void onAuthenticationSuccess(
            @NonNull HttpServletRequest request,
            HttpServletResponse response,
            @NonNull Authentication authentication
    ) throws IOException {

        log.info("Authentication successful");
        log.info(apiApplicationProperties.getFrontend().getUrl());

        OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();

        assert oauthUser != null;

        String email = oauthUser.getAttribute("email");
        String name = oauthUser.getAttribute("name");

        User user = userRepository.findByEmail(email)
                .orElseGet(() -> userRepository.save(
                        new User(email, name, Roles.USER)
                ));

        String token = jwtService.generateToken(
                user.getId().toString(),
                "ACCESS",
                authorityExtractor.fromUser(user),
                null
        );

        Cookie cookie = new Cookie("access_token", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(false); // true em HTTPS
        cookie.setPath("/");
        cookie.setMaxAge(3600);

        response.addCookie(cookie);
        response.sendRedirect(apiApplicationProperties.getFrontend().getUrl());
    }
}

