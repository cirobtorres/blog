package com.cirobtorres.blog.api.user.services;

import com.cirobtorres.blog.api.ApiApplicationProperties;
import com.cirobtorres.blog.api.exceptions.UserNotFoundException;
import com.cirobtorres.blog.api.user.dtos.UserDTO;
import com.cirobtorres.blog.api.user.repositories.UserRepository;
import com.cirobtorres.blog.api.userIdentity.entities.UserIdentity;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final boolean isProd;
    private final static Logger log = LoggerFactory.getLogger(UserService.class);

    public UserService(
            ApiApplicationProperties apiApplicationProperties,
            UserRepository userRepository
    ) {
        this.userRepository = userRepository;
        this.isProd = apiApplicationProperties.getApplication().isProduction();
    }

    @Transactional
    public UserDTO getAuthenticatedUserDTO(Authentication auth) {
        if (auth == null || !auth.isAuthenticated() || auth instanceof AnonymousAuthenticationToken) {
            return null;
        }

        UUID userId = UUID.fromString(auth.getName());

        // Custom provider = LOCAL
        String currentProvider = "LOCAL";
        if (auth.getPrincipal() instanceof Jwt jwt) {
            String providerClaim = jwt.getClaimAsString("provider");
            if (providerClaim != null) {
                currentProvider = providerClaim.toUpperCase();
            }
        }

        // Fallback: LOCAL login
        else if (auth.getDetails() instanceof Map) {
            @SuppressWarnings("unchecked")
            Map<String, Object> details = (Map<String, Object>) auth.getDetails();
            currentProvider = details.getOrDefault("provider", "LOCAL").toString().toUpperCase();
        }

        final String providerToMatch = currentProvider;

        List<String> authorities = auth
                .getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        return userRepository.findById(userId)
                .map(user -> {
                    // Find correct userIdentity
                    UserIdentity activeIdentity = user
                            .getIdentities()
                            .stream()
                            .filter(id -> id.getProvider().name().equals(providerToMatch))
                            .findFirst()
                            .orElseGet(() -> user.getIdentities().iterator().next()); // If fails, gets the first one it can find

                    return new UserDTO(
                            user.getId(),
                            activeIdentity.getName(),
                            activeIdentity.getProviderEmail(),
                            activeIdentity.getPictureUrl(),
                            authorities,
                            activeIdentity.isProviderEmailVerified(),
                            user.getCreatedAt(),
                            user.getUpdatedAt()
                    );
                })
                .orElseThrow(
                        () -> new UserNotFoundException("User not found.")
                );
    }
}
