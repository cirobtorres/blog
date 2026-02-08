package com.cirobtorres.blog.api.userIdentity;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserIdentityRepository extends JpaRepository<UserIdentity, UUID> {
    Optional<UserIdentity> findByProviderAndProviderUserId(
            UserIdentityProvider provider,
            String providerUserId
    );
}
