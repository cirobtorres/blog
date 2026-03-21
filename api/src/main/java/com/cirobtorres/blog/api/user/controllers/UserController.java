package com.cirobtorres.blog.api.user.controllers;

import com.cirobtorres.blog.api.user.repositories.UserRepository;
import com.cirobtorres.blog.api.user.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("users")
public class UserController {
    private final UserRepository userRepository;

    @Autowired
    public UserController(
            UserRepository userRepository
    ) {
        this.userRepository = userRepository;
    }

    @DeleteMapping
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> delete(Authentication auth) {
        if (auth == null || !auth.isAuthenticated() || auth instanceof AnonymousAuthenticationToken) {
            return ResponseEntity.ok(null);
        }
        UUID userId = UUID.fromString(auth.getName());
        User user = userRepository.findById(userId).orElseThrow();
        userRepository.delete(user);
        return ResponseEntity.noContent().build();
    }
}
