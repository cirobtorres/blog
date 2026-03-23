package com.cirobtorres.blog.api.jwt.interfaces;

import com.cirobtorres.blog.api.jwt.entities.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, UUID> {
    Optional<RefreshToken> findByTokenHash(String refreshToken);

    @Modifying
    @Query("""
    UPDATE RefreshToken r
    SET r.revoked = true,
        r.revokedAt = :when
    WHERE r.userId = :userId
      AND r.revoked = false
    """)
    void revokeAllByUserId(UUID userId, Instant when);

    @Modifying
    @Query("""
    UPDATE RefreshToken r
    SET r.revoked = true, r.revokedAt = :now
    WHERE r.tokenHash = :hash AND r.revoked = false
    """)
    int revokeIfNotRevoked(String hash, Instant now);

    @Modifying @Query("DELETE FROM RefreshToken r WHERE r.revoked = true OR r.revokedAt < :now OR r.expiresAt < :now") long deleteInvalidTokens(LocalDateTime now);
}
