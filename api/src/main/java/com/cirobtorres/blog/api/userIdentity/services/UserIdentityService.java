package com.cirobtorres.blog.api.userIdentity.services;

import com.cirobtorres.blog.api.ApiApplicationProperties;
import com.cirobtorres.blog.api.authority.services.AuthorityService;
import com.cirobtorres.blog.api.user.entities.User;
import com.cirobtorres.blog.api.user.repositories.UserRepository;
import com.cirobtorres.blog.api.userIdentity.entities.UserIdentity;
import com.cirobtorres.blog.api.userIdentity.enums.UserIdentityProvider;
import com.cirobtorres.blog.api.userIdentity.repositories.UserIdentityRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UserIdentityService {
    private final UserRepository userRepository;
    private final AuthorityService authorityService;
    private final UserIdentityRepository userIdentityRepository;
    private final PasswordEncoder passwordEncoder;
    private final boolean isProd;
    private static final Logger log = LoggerFactory.getLogger(UserIdentityService.class);

    public UserIdentityService(
            ApiApplicationProperties apiApplicationProperties,
            UserRepository userRepository,
            AuthorityService authorityService,
            UserIdentityRepository identityRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.authorityService = authorityService;
        this.userIdentityRepository = identityRepository;
        this.passwordEncoder = passwordEncoder;
        this.isProd = apiApplicationProperties.getApplication().isProduction();
    }

    @Transactional
    public User createLocalUser(
            String name,
            String email,
            String pictureUrl,
            String password
    ) {
        if (!isProd) log.info("UserIdentityService.createLocalUser(): pictureUrl={}", pictureUrl);
        User user = userRepository.findByEmail(email).orElseGet(User::new);

        UserIdentity userIdentity = UserIdentity
                .builder()
                .user(user)
                .name(name)
                .pictureUrl(pictureUrl)
                .provider(UserIdentityProvider.LOCAL)
                .providerUserId(email)
                .providerEmail(email)
                .isProviderEmailVerified(false)
                .passwordHash(passwordEncoder.encode(password))
                .build();

        user.addIdentity(userIdentity);
        user.setEmail(email);
        user.setEnabled(true);
        user.getAuthorities().add(authorityService.getDefaultUserAuthority());
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
            String pictureUrl,
            boolean emailVerified
    ) {
        if (!isProd) log.info("UserIdentityService.createOAuthUser()");
        UserIdentity userIdentity = userIdentityRepository
                .findByProviderAndProviderUserId(provider, providerUserId)
                .orElseGet(
                        () -> resolveUser(
                                provider,
                                providerUserId,
                                name,
                                email,
                                pictureUrl,
                                emailVerified
                        )
                );

        userIdentity.setLastAuthenticatedAt(LocalDateTime.now());

        User user = userIdentity.getUser();
        user.getAuthorities().add(authorityService.getDefaultUserAuthority());

        if (email != null && user.getEmail() == null) {
            user.setEmail(email);
        }

        userRepository.save(user);

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
            String name,
            String email,
            String pictureUrl,
            boolean emailVerified
    ) {
        if (!isProd) log.info("UserIdentityService.resolveUser()");
        User user = findOrMergeUser(
                email,
                emailVerified
        ).orElseGet(User::new);

        userRepository.save(user);

        UserIdentity userIdentity = UserIdentity
                .builder()
                .user(user)
                .name(name)
                .pictureUrl(pictureUrl)
                .provider(provider)
                .providerUserId(providerUserId)
                .build();

        if (email != null) {
            userIdentity.setProviderEmail(email);
            userIdentity.setIsProviderEmailVerified(emailVerified);
        }

        return userIdentityRepository.save(userIdentity);
    }

    private Optional<User> findOrMergeUser(String email, boolean emailVerified) {
        if (!emailVerified || email == null) {
            return Optional.empty();
        }
        return userRepository.findByEmail(email);
    }
}
