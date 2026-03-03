package com.cirobtorres.blog.api.auth;


import com.cirobtorres.blog.api.ApiApplicationProperties;
import com.cirobtorres.blog.api.emailToken.dtos.VTokenDTO;
import com.cirobtorres.blog.api.token.dtos.TokensDTO;
import com.cirobtorres.blog.api.token.services.JwtService;
import com.cirobtorres.blog.api.user.dtos.UserLoginDTO;
import com.cirobtorres.blog.api.user.dtos.UserRegisterDTO;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.net.URI;
import java.security.NoSuchAlgorithmException;
import java.util.UUID;

@RestController
@RequestMapping("auth")
public class AuthController {
    private final AuthService authService;
    private final JwtService jwtService;
    private final String clientUrl;
    private final boolean isProd;
    private static final Logger log = LoggerFactory.getLogger(AuthController.class);

    public AuthController(
            ApiApplicationProperties apiApplicationProperties,
            AuthService authService,
            JwtService jwtService
    ) {
        this.clientUrl = apiApplicationProperties.getFrontend().getUrl();
        this.authService = authService;
        this.jwtService = jwtService;
        this.isProd = apiApplicationProperties.getApplication().isProduction();
    }

    @PostMapping("login")
    public ResponseEntity<Void> login(
            @RequestBody @Valid UserLoginDTO userLoginDTO,
            HttpServletResponse response
    ) {
        TokensDTO tokens = authService.login(userLoginDTO);
        jwtService.addTokensToCookies(response, tokens);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("logout")
    public ResponseEntity<Void> logout(
            @CookieValue(name = "refresh_token", required = false) String refreshToken,
            HttpServletResponse response
    ) {
        if (!isProd) log.info("AuthController.logout(): refresh_token={}", refreshToken);
        if (refreshToken != null) {
            try {
                authService.logout(refreshToken);
            } catch (Exception e) {
                if (!isProd) log.error("AuthController.authService.logout(): {}", e.getMessage());
            }
        }
        jwtService.clearTokensFromCookies(response);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("register")
    public ResponseEntity<Void> register(
            @RequestBody @Valid UserRegisterDTO userRegisterDTO,
            HttpServletResponse response
    ) throws NoSuchAlgorithmException, MessagingException {
        TokensDTO tokens = authService.register(userRegisterDTO);
        jwtService.addTokensToCookies(response, tokens);
        return ResponseEntity.created(URI.create("/api/users/me")).build();
    }

    @PostMapping("refresh")
    public ResponseEntity<Void> refresh(
            @CookieValue("refresh_token") String refreshToken,
            HttpServletResponse response
    ) throws NoSuchAlgorithmException {
        TokensDTO tokens = authService.refresh(refreshToken);
        jwtService.addTokensToCookies(response, tokens);
        return ResponseEntity.ok().build();
    }

    @PostMapping("validation")
    public ResponseEntity<Void> validation(
            @RequestBody @Valid VTokenDTO vTokenDTO,
            Authentication auth,
            HttpServletResponse response
    ) throws NoSuchAlgorithmException {
        UUID userId = UUID.fromString(auth.getName());
        String vToken = vTokenDTO.token().toUpperCase();
        TokensDTO tokens = authService.validateEmail(vToken, userId);
        jwtService.addTokensToCookies(response, tokens);
        return ResponseEntity.ok().build();
    }

    @PostMapping("renew-code")
    public ResponseEntity<Void> renewCode(
            Authentication auth
    ) throws MessagingException, NoSuchAlgorithmException {
        UUID userId = UUID.fromString(auth.getName());
        authService.renewCode(userId);
        return ResponseEntity.ok().build();
    }
}
