package com.cirobtorres.blog.api.userIdentity.repositories;

import com.cirobtorres.blog.api.userIdentity.entities.UserIdentity;
import com.cirobtorres.blog.api.userIdentity.enums.UserIdentityProvider;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserIdentityRepository extends JpaRepository<UserIdentity, UUID> {
    Optional<UserIdentity> findByProviderAndProviderUserId(
            UserIdentityProvider provider,
            String providerUserId
    );

    @Query("SELECT ui FROM UserIdentity ui WHERE ui.user.id = :userId AND ui.provider = 'LOCAL'")
    Optional<UserIdentity> findLocalIdentityByUserId(@Param("userId") UUID userId);

    List<UserIdentity> findAllByProviderEmail(@NotBlank(message = "Required") @Email String email);
}
