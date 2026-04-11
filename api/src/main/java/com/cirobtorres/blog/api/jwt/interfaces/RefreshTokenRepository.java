package com.cirobtorres.blog.api.jwt.interfaces;

import com.cirobtorres.blog.api.jwt.entities.RefreshToken;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, UUID> {
    Optional<RefreshToken> findByTokenHash(String refreshToken);

    // Serializes concurrent refresh attempts for the same stored token (per JVM + DB row lock).
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT r FROM RefreshToken r WHERE r.tokenHash = :hash")
    Optional<RefreshToken> findByTokenHashForRefresh(@Param("hash") String hash);

    @Modifying
    @Query("""
    UPDATE RefreshToken r
    SET r.revoked = true, r.revokedAt = :when
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

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("""
    UPDATE RefreshToken r
    SET r.replacedByTokenHash = :newHash
    WHERE r.tokenHash = :oldHash
    """)
    int setReplacedByTokenHash(@Param("oldHash") String oldHash, @Param("newHash") String newHash);

    @Modifying @Query("""
    DELETE FROM RefreshToken r
    WHERE r.revoked = true
    OR r.revokedAt < :now
    OR r.expiresAt < :now
    """) long deleteInvalidTokens(Instant now);
}
