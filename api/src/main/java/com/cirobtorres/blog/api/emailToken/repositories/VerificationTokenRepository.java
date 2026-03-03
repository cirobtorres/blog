package com.cirobtorres.blog.api.emailToken.repositories;

import com.cirobtorres.blog.api.emailToken.entities.VerificationToken;
import com.cirobtorres.blog.api.userIdentity.entities.UserIdentity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

public interface VerificationTokenRepository extends JpaRepository<VerificationToken, UUID> {
    Optional<VerificationToken> findByTokenHash(String token);

    Optional<VerificationToken> findByUserIdentity(UserIdentity userIdentity);

    @Modifying @Transactional void deleteByUserIdentity(UserIdentity userIdentity);

    @Modifying @Transactional long deleteByExpiryDateBefore(LocalDateTime agora);
}
