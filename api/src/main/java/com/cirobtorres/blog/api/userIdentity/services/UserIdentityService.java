package com.cirobtorres.blog.api.userIdentity.services;

import com.cirobtorres.blog.api.authority.entities.Authority;
import com.cirobtorres.blog.api.authority.enums.AuthorityType;
import com.cirobtorres.blog.api.authority.interfaces.AuthorityRepository;
import com.cirobtorres.blog.api.user.entities.User;
import com.cirobtorres.blog.api.user.repositories.UserRepository;
import com.cirobtorres.blog.api.userIdentity.entities.UserIdentity;
import com.cirobtorres.blog.api.userIdentity.enums.UserIdentityProvider;
import com.cirobtorres.blog.api.userIdentity.repositories.UserIdentityRepository;
import jakarta.transaction.Transactional;
import org.jspecify.annotations.NonNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UserIdentityService {
    private final UserRepository userRepository;
    private final AuthorityRepository authorityRepository;
    private final UserIdentityRepository userIdentityRepository;
    private final PasswordEncoder passwordEncoder;
    private static final Logger log = LoggerFactory.getLogger(UserIdentityService.class);

    public UserIdentityService(
            UserRepository userRepository,
            AuthorityRepository authorityRepository,
            UserIdentityRepository identityRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.authorityRepository = authorityRepository;
        this.userIdentityRepository = identityRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public User createLocalUser(
            String name,
            String email,
            String password
    ) {
        User user = userRepository.findByEmail(email).orElseGet(User::new);

        UserIdentity userIdentity = new UserIdentity();
        userIdentity.setUser(user);
        userIdentity.setProvider(UserIdentityProvider.LOCAL);
        userIdentity.setProviderUserId(email);
        userIdentity.setProviderEmail(email);
        userIdentity.setIsProviderEmailVerified(false);
        userIdentity.setPasswordHash(passwordEncoder.encode(password));

        user.addIdentity(userIdentity);
        user.setName(name);
        user.setEmail(email);
        user.setEnabled(true);
        user.getAuthorities().add(userAuthority());
        userRepository.save(user);
        userIdentityRepository.save(userIdentity);

        return user;
    }

    @Transactional
    public User createOAuthUser(
            UserIdentityProvider provider,
            String providerUserId,
            String name,
            String email,
            boolean emailVerified
    ) {
        UserIdentity userIdentity = userIdentityRepository
                .findByProviderAndProviderUserId(provider, providerUserId)
                .orElseGet(() -> resolveUser(provider, providerUserId, email, emailVerified));

        userIdentity.setLastAuthenticatedAt(LocalDateTime.now());

        User user = userIdentity.getUser();
        user.getAuthorities().add(userAuthority());

        syncUserData(user, name, email);

        return user;
    }

    @Transactional
    public void updateLastLogin(User user) {
        user.setLastLogin(LocalDateTime.now());
        userRepository.save(user);
    }

    private UserIdentity resolveUser(
            UserIdentityProvider provider,
            String providerUserId,
            String email,
            boolean emailVerified
    ) {
        User user = findMergeCandidate(email, emailVerified).orElseGet(User::new);
        userRepository.save(user);

        UserIdentity userIdentity = new UserIdentity();
        userIdentity.setUser(user);

        // "providerEmail" + "providerUserId" is key for security.
        // If a user alters its provider email, "user.email" must remain
        // the same email as before so it preserves other identities.
        userIdentity.setProvider(provider);
        userIdentity.setProviderUserId(providerUserId);

        if (email != null) {
            userIdentity.setProviderEmail(email);
            userIdentity.setIsProviderEmailVerified(emailVerified);
        }

        return userIdentityRepository.save(userIdentity);
    }

    private void syncUserData(
            User user,
            String name,
            String email
    ) {
        if (user.getName() == null && name != null) {
            user.setName(name);
        }
        if (email != null && user.getEmail() == null) {
            user.setEmail(email);
        }
        userRepository.save(user);
    }

    private @NonNull Authority userAuthority() {
        return authorityRepository.findByName(AuthorityType.USER)
                .orElseThrow(
                        () -> new IllegalStateException("Authority USER not found")
                );
    }

    private @NonNull Authority userAuthority(AuthorityType authority) {
        return authorityRepository.findByName(authority)
                .orElseThrow(
                        () -> new IllegalStateException("Authority USER not found")
                );
    }

    private Optional<User> findMergeCandidate(String email, boolean emailVerified) {
        if (!emailVerified || email == null) {
            return Optional.empty();
        }
        return userRepository.findByEmail(email);
    }
}
