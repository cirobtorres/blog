package com.cirobtorres.blog.api.auth.controllers;


import com.cirobtorres.blog.api.ApiApplicationProperties;
import com.cirobtorres.blog.api.auditToken.dtos.AuditTokenDTO;
import com.cirobtorres.blog.api.auth.services.AuthService;
import com.cirobtorres.blog.api.jwt.dtos.PassResTokenDTO;
import com.cirobtorres.blog.api.jwt.dtos.TokensDTO;
import com.cirobtorres.blog.api.jwt.services.JwtService;
import com.cirobtorres.blog.api.user.dtos.*;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
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
    private final boolean isProd;
    private static final Logger log = LoggerFactory.getLogger(AuthController.class);

    public AuthController(
            ApiApplicationProperties apiApplicationProperties,
            AuthService authService,
            JwtService jwtService
    ) {
        this.authService = authService;
        this.jwtService = jwtService;
        this.isProd = apiApplicationProperties.getApplication().isProduction();
    }

    @PostMapping("login")
    public ResponseEntity<Void> login(
            @RequestBody @Valid UserLoginDTO userLoginDTO,
            HttpServletResponse response
    ) throws NoSuchAlgorithmException {
        TokensDTO tokens = authService.login(userLoginDTO);
        jwtService.addTokensToCookies(response, tokens);
        return ResponseEntity.ok().build();
    }

    @PostMapping("logout")
    public ResponseEntity<Void> logout(
            @CookieValue(name = "refresh_token", required = false) String refreshToken,
            HttpServletResponse response
    ) {
        if (refreshToken != null) {
            try {
                authService.logout(refreshToken);
            } catch (Exception e) {
                log.error("AuthController.logout(): error={ {} }", e.getMessage());
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
        return ResponseEntity.created(URI.create("/api/auth/me")).build();
    }

    @GetMapping("me")
    public ResponseEntity<UserDTO> me(Authentication auth) {
        UserDTO user = authService.getUser(auth);
        return user != null ? ResponseEntity.ok(user) : ResponseEntity.noContent().build();
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
            @RequestBody @Valid AuditTokenDTO vTokenDTO,
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

    @PostMapping("password-reset-email-request")
    public ResponseEntity<Void> passwordResetEmailRequest(
            @RequestBody @Valid UserEmailDTO userEmailDTO
    ) throws NoSuchAlgorithmException, MessagingException {
        authService.passwordResetEmailCodeRequest(userEmailDTO);
        return ResponseEntity.ok().build();
    }

    @PostMapping("password-reset-code")
    public ResponseEntity<Void> passwordResetCode(
            @RequestBody @Valid AuditTokenDTO codeDTO,
            HttpServletResponse response
    ) throws NoSuchAlgorithmException {
        PassResTokenDTO token = authService.passwordResetCodeConfirmation(codeDTO);
        long fifteenMin = 1000 * 60 * 15;
        jwtService.addToCookies(
                response,
                "reset_password_token",
                token.passResetToken(),
                "/",
                fifteenMin
        );
        return  ResponseEntity.ok().build();
    }

    @PostMapping("password-reset")
    public ResponseEntity<Void> passwordReset(
            @RequestBody @Valid UserPasswordDTO passwordDTO,
            HttpServletResponse response
    ) {
        authService.passwordReset(passwordDTO);
        jwtService.addToCookies(
                response,
                "reset_password_token",
                "",
                "/",
                0
        ); // Clear token
        return  ResponseEntity.ok().build();
    }
}
