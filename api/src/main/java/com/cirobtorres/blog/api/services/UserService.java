package com.cirobtorres.blog.api.services;

import com.cirobtorres.blog.api.entities.User;
import com.cirobtorres.blog.api.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final static Logger log = LoggerFactory.getLogger(UserService.class);

    public UserService(
            UserRepository userRepository
    ) {
        this.userRepository = userRepository;
    }

    @Transactional
    public User provisionOrUpdateUser(
            UUID keycloakId,
            String name,
            String email,
            boolean isEmailVerifiedInToken
    ) {
        // Just-in-Time Provisioning: search or create if it does not exist
        User user = userRepository.findById(keycloakId).orElseGet(() -> {
            User newUser = User.builder()
                    .id(keycloakId)
                    .name(name != null ? name : "Anonymous")
                    .email(email)
                    .build();
            newUser.setEmailVerified(isEmailVerifiedInToken);
            return userRepository.save(newUser);
        });

        // Lazy sync is_email_verified with keycloak, in case it has been validated
        if (user.isEmailVerified() != isEmailVerifiedInToken) {
            user.setEmailVerified(isEmailVerifiedInToken);
        }

        user.setLastLogin(LocalDateTime.now());
        return userRepository.save(user);
    }

    @Transactional
    public User findUserById(UUID id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }

    @Transactional
    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with e-mail: " + email));
    }

    @Transactional
    public void deleteUserById(UUID id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
    }
}
