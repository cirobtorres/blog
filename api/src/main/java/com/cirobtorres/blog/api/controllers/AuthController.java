package com.cirobtorres.blog.api.controllers;

import com.cirobtorres.blog.api.ApiApplicationProperties;
import com.cirobtorres.blog.api.dtos.LoginRequest;
import com.cirobtorres.blog.api.dtos.RegisterRequest;
import com.cirobtorres.blog.api.dtos.UserDTO;
import com.cirobtorres.blog.api.services.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.representations.AccessTokenResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("auth")
public class AuthController{
    private final AuthService authService;
    private final String keycloakUrl;
    private final String realm;
    private final String webClientId;
    private final boolean isProd;
    private static final Logger log = LoggerFactory.getLogger(AuthController.class);

    public AuthController(
            AuthService authService,
            ApiApplicationProperties apiApplicationProperties
    ) {
        this.authService = authService;
        this.keycloakUrl = apiApplicationProperties.getKeycloak().getKeycloakUrl();
        this.realm = apiApplicationProperties.getKeycloak().getRealm();
        this.webClientId = apiApplicationProperties.getKeycloak().getWebClientId();
        this.isProd = apiApplicationProperties.getApplication().isProduction();
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest request) {
        UserDTO userDTO = authService.saveLocalUser(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(userDTO);
    }

    @PostMapping("/login")
    public ResponseEntity<Void> login(@Valid @RequestBody LoginRequest request, HttpServletResponse response) {
        AccessTokenResponse tokenResponse = authService.login(request);

        ResponseCookie accessTokenCookie = ResponseCookie
                .from("access_token", tokenResponse.getToken())
                .httpOnly(true)
                .secure(isProd)
                .path("/")
                .maxAge(tokenResponse.getExpiresIn())
                .sameSite("Lax")
                .build();

        ResponseCookie refreshTokenCookie = ResponseCookie
                .from("refresh_token", tokenResponse.getRefreshToken())
                .httpOnly(true)
                .secure(isProd)
                .path("/")
                .maxAge(tokenResponse.getRefreshExpiresIn())
                .sameSite("Lax")
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, accessTokenCookie.toString());
        response.addHeader(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString());

        return ResponseEntity.ok().build();
    }

    @PostMapping("/refresh")
    public ResponseEntity<Void> refresh(
            @CookieValue(name = "refresh_token", required = false) String refreshToken,
            HttpServletResponse response
    ) {
        // log.info("1. refresh_token: {}", refreshToken);
        // log.info("2. refreshToken == null || refreshToken.isBlank(): {}", refreshToken == null || refreshToken.isBlank());
        if (refreshToken == null || refreshToken.isBlank()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        try {
            String tokenEndpoint = String.format("%s/realms/%s/protocol/openid-connect/token", keycloakUrl, realm);
            // log.info("3. tokenEndpoint: {}", tokenEndpoint);
            RestTemplate restTemplate = new RestTemplate();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

            org.springframework.util.MultiValueMap<String, String> map = new org.springframework.util.LinkedMultiValueMap<>();
            map.add("grant_type", "refresh_token");
            map.add("client_id", webClientId);
            map.add("refresh_token", refreshToken);

            HttpEntity<MultiValueMap<String, String>> requestEntity =
                    new HttpEntity<>(map, headers);

            ResponseEntity<AccessTokenResponse> tokenResponseWrapper = restTemplate.postForEntity(
                    tokenEndpoint,
                    requestEntity,
                    AccessTokenResponse.class
            );

            AccessTokenResponse tokenResponse = tokenResponseWrapper.getBody();
            // log.info("4. tokenResponse: {}", tokenResponse);
            if (tokenResponse == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }

            ResponseCookie accessTokenCookie = ResponseCookie
                    .from("access_token", tokenResponse.getToken())
                    .httpOnly(true)
                    .secure(isProd)
                    .path("/")
                    .maxAge(tokenResponse.getExpiresIn())
                    .sameSite("Lax")
                    .build();

            String newRefreshToken = tokenResponse.getRefreshToken() != null ? tokenResponse.getRefreshToken() : refreshToken;
            // log.info("5. newRefreshToken: {}", newRefreshToken);
            long newRefreshMaxAge = tokenResponse.getRefreshExpiresIn() > 0 ? tokenResponse.getRefreshExpiresIn() : 2592000;

            // log.info("6. newRefreshMaxAge: {}", newRefreshMaxAge);
            ResponseCookie refreshTokenCookie = ResponseCookie
                    .from("refresh_token", newRefreshToken)
                    .httpOnly(true)
                    .secure(isProd)
                    .path("/")
                    .maxAge(newRefreshMaxAge)
                    .sameSite("Lax")
                    .build();

            // log.info("7. refreshToken: {}", refreshToken);
            response.addHeader(HttpHeaders.SET_COOKIE, accessTokenCookie.toString());
            response.addHeader(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString());

            // log.info("8. ResponseEntity.ok().build()");
            return ResponseEntity.ok().build();

        } catch (org.springframework.web.client.HttpClientErrorException e) {
            // log.warn("Keycloak refused refresh_token (expired): {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch (Exception e) {
            // log.error("Renovation failed: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("me")
    public ResponseEntity<UserDTO> me(
            Authentication auth
    ) {
        return ResponseEntity.ok(authService.getUser(auth));
    }
}
