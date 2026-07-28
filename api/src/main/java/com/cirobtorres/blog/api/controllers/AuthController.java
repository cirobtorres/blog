package com.cirobtorres.blog.api.controllers;

import com.cirobtorres.blog.api.ApiApplicationProperties;
import com.cirobtorres.blog.api.dtos.UserDTO;
import com.cirobtorres.blog.api.services.AuthCookieService;
import com.cirobtorres.blog.api.services.AuthService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth")
public class AuthController{
    private final AuthService authService;
    private final AuthCookieService authCookieService;
    private final boolean isProd;
    private static final Logger log = LoggerFactory.getLogger(AuthController.class);

    public AuthController(
            AuthService authService,
            AuthCookieService authCookieService,
            ApiApplicationProperties apiApplicationProperties
    ) {
        this.authService = authService;
        this.authCookieService = authCookieService;
        this.isProd = apiApplicationProperties.getApplication().isProduction();
    }

    @GetMapping("/me")
    public ResponseEntity<UserDTO> me(Authentication auth) {
        return ResponseEntity.ok(authService.getUser(auth));
    }
}
