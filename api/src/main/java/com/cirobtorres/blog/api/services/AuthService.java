package com.cirobtorres.blog.api.services;

import com.cirobtorres.blog.api.dtos.UserDTO;
import com.cirobtorres.blog.api.entities.User;
import com.cirobtorres.blog.api.exceptions.UserUnauthorizedException;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
public class AuthService {
    private final UserService userService;
    private static final Logger log = LoggerFactory.getLogger(AuthService.class);

    public AuthService(
            UserService userService
    ) {
        this.userService = userService;
    }

    @Transactional
    public UserDTO getUser(Authentication auth) {
        if (auth == null || !auth.isAuthenticated() || auth instanceof AnonymousAuthenticationToken) {
            throw new UserUnauthorizedException("Invalid authentication");
        }

        if (!(auth.getPrincipal() instanceof Jwt jwt)) {
            return null;
        }

        UUID keycloakId = UUID.fromString(jwt.getSubject());
        String email = jwt.getClaimAsString("email");
        String name = jwt.getClaimAsString("name");

        boolean verifiedInToken =
                jwt.getClaimAsBoolean("email_verified") != null
                && jwt.getClaimAsBoolean("email_verified");

        User user = userService.provisionOrUpdateUser(keycloakId, name, email, verifiedInToken);

        List<String> authorities = auth.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority).filter(Objects::nonNull)
                .map(role -> role.replace("ROLE_", ""))
                .toList();

        return new UserDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.isEmailVerified(),
                user.isBanned(),
                user.isDeleted(),
                authorities,
                user.getCreatedAt(),
                user.getUpdatedAt()
        );
    }
}
