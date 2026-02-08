package com.cirobtorres.blog.api.client;

import com.cirobtorres.blog.api.client.DTO.LoginRequestDTO;
import com.cirobtorres.blog.api.client.DTO.TokenResponseDTO;
import com.cirobtorres.blog.api.role.Role;
import com.cirobtorres.blog.api.token.AuthorityExtractor;
import com.cirobtorres.blog.api.token.JwtService;
import com.cirobtorres.blog.api.user.User;
import com.cirobtorres.blog.api.user.UserRepository;
import com.cirobtorres.blog.api.userIdentity.UserIdentity;
import com.cirobtorres.blog.api.userIdentity.UserIdentityProvider;
import com.cirobtorres.blog.api.userIdentity.UserIdentityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("clients")
public class ClientController {
    @Autowired
    private UserIdentityRepository userIdentityRepository;

    @Autowired
    private ClientService clientService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthorityExtractor authorityExtractor;

    @PostMapping("/login")
    public TokenResponseDTO login(@RequestBody LoginRequestDTO request) {
        UserIdentity identity = userIdentityRepository
                .findByProviderAndProviderUserId(UserIdentityProvider.LOCAL, request.email())
                .orElseThrow(() -> new RuntimeException("Invalid credentials."));

        if (!identity.isEnabled() || !identity.getUser().isEnabled()) {
            throw new RuntimeException("Client is disabled.");
        }

        if (!passwordEncoder.matches(request.password(), identity.getPasswordHash())) {
            throw new RuntimeException("Invalid credentials.");
        }

        User user = identity.getUser();
        user.setLastLogin(java.time.LocalDateTime.now());

        List<String> authorities = authorityExtractor.fromUser(user);
        List<String> scopes = Collections.emptyList(); // ou scopes customizados do user

        String token = jwtService.generateToken(
                user.getId().toString(),
                "USER",
                authorities,
                scopes
        );

        return new TokenResponseDTO(token);
    }

    @PostMapping("/token")
    public TokenResponseDTO clientToken(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Basic ")) {
            throw new RuntimeException("Missing authorization header.");
        }

        String base64Credentials = authHeader.substring(6);
        String credentials = new String(Base64.getDecoder().decode(base64Credentials));
        String[] parts = credentials.split(":");
        if (parts.length != 2) throw new RuntimeException("Invalid credentials.");

        String clientId = parts[0];
        String clientSecret = parts[1];

        Client client = clientService.findByClientId(clientId)
                .orElseThrow(() -> new RuntimeException("Client not found."));

        if (!client.isEnabled()) throw new RuntimeException("Client is disabled.");

        if (!passwordEncoder.matches(clientSecret, client.getClientSecretHash())) {
            throw new RuntimeException("Invalid client secret.");
        }

        List<String> scopes = List.of(client.getAllowedScopes().split(",")); // opcional

        String token = jwtService.generateToken(
                client.getClientId(),
                "CLIENT",
                Collections.emptyList(),
                scopes
        );

        return new TokenResponseDTO(token);
    }
}
