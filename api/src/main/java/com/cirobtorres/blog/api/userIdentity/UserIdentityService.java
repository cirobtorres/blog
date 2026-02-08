package com.cirobtorres.blog.api.userIdentity;

import com.cirobtorres.blog.api.user.User;
import com.cirobtorres.blog.api.user.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserIdentityService {
    private final UserRepository userRepository;
    private final UserIdentityRepository userIdentityRepository;

    public UserIdentityService(
            UserRepository userRepository,
            UserIdentityRepository identityRepository
    ) {
        this.userRepository = userRepository;
        this.userIdentityRepository = identityRepository;
    }

    @Transactional
    public User resolveUser(
            UserIdentityProvider provider,
            String providerUserId,
            String name,
            String email,
            boolean emailVerified
    ) {
        return userIdentityRepository
                .findByProviderAndProviderUserId(provider, providerUserId)
                .map(UserIdentity::getUser)
                .orElseGet(() -> createAndLinkUser(
                        provider,
                        providerUserId,
                        name,
                        email,
                        emailVerified
                ));
    }

    private User createAndLinkUser(
            UserIdentityProvider provider,
            String providerUserId,
            String name,
            String email,
            boolean emailVerified
    ) {
        User user = findMergeCandidate(email, emailVerified)
                .orElseGet(() -> createUser(name, email, emailVerified));

        UserIdentity identity = new UserIdentity();
        identity.setUser(user);
        identity.setProvider(provider);
        identity.setProviderUserId(providerUserId);

        userIdentityRepository.save(identity);

        return user;
    }

    private Optional<User> findMergeCandidate(String email, boolean emailVerified) {
        if (!emailVerified || email == null) {
            return Optional.empty();
        }
        return userRepository.findByEmail(email);
    }

    private User createUser(String name, String email, boolean emailVerified) {
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setEmailVerified(emailVerified);
        return userRepository.save(user);
    }
}
