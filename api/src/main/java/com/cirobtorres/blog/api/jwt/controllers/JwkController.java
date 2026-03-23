package com.cirobtorres.blog.api.jwt.controllers;

import java.security.interfaces.RSAPublicKey;
import java.util.List;
import java.util.Map;

import com.cirobtorres.blog.api.jwt.services.JwtService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class JwkController {
    private final RSAPublicKey publicKey;
    private final JwtService jwtService;

    public JwkController(
            RSAPublicKey publicKey,
            JwtService jwtService
    ) {
        this.publicKey = publicKey;
        this.jwtService = jwtService;
    }

    @GetMapping("/.well-known/jwks.json")
    public Map<String, Object> keys() {
        return Map.of(
            "keys", List.of(
                Map.of(
                    "kty", "RSA",
                    "alg", "RS256",
                    "use", "sig",
                    "kid", "blog-key-1",
                    "n", jwtService.base64Url(publicKey.getModulus()),
                    "e", jwtService.base64Url(publicKey.getPublicExponent())
                )
            )
        );
    }
}
