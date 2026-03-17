package com.cirobtorres.blog.api.auditToken.repositories;

import com.cirobtorres.blog.api.auditToken.entities.AuditToken;
import com.cirobtorres.blog.api.auditToken.enums.AuditTokenType;
import com.cirobtorres.blog.api.userIdentity.entities.UserIdentity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

public interface AuditTokenRepository extends JpaRepository<AuditToken, UUID> {
    Optional<AuditToken> findByTokenHash(String token);

    Optional<AuditToken> findByUserIdentityAndTokenType(UserIdentity userIdentity, AuditTokenType auditTokenType);

    @Modifying @Transactional void deleteByUserIdentityAndTokenType(UserIdentity userIdentity, AuditTokenType auditTokenType);

    @Modifying @Query("DELETE FROM AuditToken t WHERE t.revoked = true OR t.expiresAt < :now") long deleteInvalidTokens(LocalDateTime now);
}
