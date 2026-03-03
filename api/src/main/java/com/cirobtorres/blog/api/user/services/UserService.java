package com.cirobtorres.blog.api.user.services;

import com.cirobtorres.blog.api.exceptions.UserNotFoundException;
import com.cirobtorres.blog.api.user.dtos.UserDTO;
import com.cirobtorres.blog.api.user.repositories.UserRepository;
import com.cirobtorres.blog.api.userIdentity.entities.UserIdentity;
import com.cirobtorres.blog.api.userIdentity.enums.UserIdentityProvider;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final static Logger log = LoggerFactory.getLogger(UserService.class);

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public UserDTO getAuthenticatedUserDTO(Authentication auth) {
        if (auth == null || !auth.isAuthenticated() || auth instanceof AnonymousAuthenticationToken) {
            return null;
        }

        UUID userId = UUID.fromString(auth.getName());
        List<String> authorities = auth
                .getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        return userRepository.findById(userId)
                .map(user -> {
                    boolean isProviderEmailVerified = user.getIdentities().stream()
                            .filter(identity -> identity.getProvider() == UserIdentityProvider.LOCAL)
                            .map(UserIdentity::isProviderEmailVerified)
                            .findFirst()
                            .orElse(false);

                    return new UserDTO(
                            user.getId(),
                            user.getName(),
                            user.getEmail(),
                            authorities,
                            isProviderEmailVerified,
                            user.getCreatedAt(),
                            user.getUpdatedAt()
                    );
                })
                .orElseThrow(
                        () -> new UserNotFoundException("User not found.")
                );
    }
}