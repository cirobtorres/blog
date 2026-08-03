package com.cirobtorres.blog.api.controllers;

import com.cirobtorres.blog.api.dtos.UserDTO;
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
    private static final Logger log = LoggerFactory.getLogger(AuthController.class);

    public AuthController(
            AuthService authService
    ) {
        this.authService = authService;
    }

    // GET--------------------------------------------------------------------------------------------------------
    @GetMapping("/me")
    public ResponseEntity<UserDTO> me(Authentication auth) {
        return ResponseEntity.ok(authService.getUser(auth));
    }
}
