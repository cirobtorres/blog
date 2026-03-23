package com.cirobtorres.blog.api.jwt.entities;

import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(
        name = "refresh_tokens",
        indexes = {
                @Index(name = "idx_refresh_user", columnList = "user_id"),
                @Index(name = "idx_refresh_hash", columnList = "tokenHash")
        }
)
@EntityListeners(AuditingEntityListener.class)
public class RefreshToken {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "token_hash", nullable = false, unique = true, length = 64)
    private String tokenHash;

    @Column(name = "expires_at", nullable = false)
    private Instant expiresAt;

    @Column(name = "created_at", nullable = false)
    @CreatedDate
    private Instant createdAt;

    @Column(nullable = false)
    private boolean revoked;

    @Column(name = "revoked_at")
    private Instant revokedAt;

     @Column(name = "replaced_by_token_hash")
     private String replacedByTokenHash;

    // DEFAULT CONSTRUCTOR----------------------------------------------------------------------------------------
    public RefreshToken() {}

    // BUILDER----------------------------------------------------------------------------------------------------
    private RefreshToken(Builder builder) {
        this.userId = builder.userId;
        this.tokenHash = builder.tokenHash;
        this.expiresAt = builder.expiresAt;
        this.revoked = builder.revoked;
        this.revokedAt = builder.revokedAt;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private UUID userId;
        private String tokenHash;
        private Instant expiresAt;
        private boolean revoked;
        private Instant revokedAt;

        public Builder userId(UUID userId) {
            this.userId = userId;
            return this;
        }

        public Builder tokenHash(String tokenHash) {
            this.tokenHash = tokenHash;
            return this;
        }

        public Builder expiresAt(Instant expiresAt) {
            this.expiresAt = expiresAt;
            return this;
        }

        public Builder revoked(boolean revoked) {
            this.revoked = revoked;
            return this;
        }

        public Builder revokedAt(Instant revokedAt) {
            this.revokedAt = revokedAt;
            return this;
        }

        public RefreshToken build() {
            return new RefreshToken(this);
        }
    }

    // GETTERS / SETTERS------------------------------------------------------------------------------------------
    public UUID getId() {
        return id;
    }
    public void setId(UUID id) { this.id = id; }

    public UUID getUserId() {
        return userId;
    }
    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public String getTokenHash() {
        return tokenHash;
    }
    public void setTokenHash(String tokenHash) {
        this.tokenHash = tokenHash;
    }

    public Instant getExpiresAt() {
        return expiresAt;
    }
    public void setExpiresAt(Instant expiresAt) {
        this.expiresAt = expiresAt;
    }

    public boolean isRevoked() {
        return revoked;
    }
    public void setRevoked(boolean revoked) {
        this.revoked = revoked;
    }

    public Instant getRevokedAt() {
        return revokedAt;
    }
    public void setRevokedAt(Instant revokedAt) {
        this.revokedAt = revokedAt;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public String getReplacedByTokenHash() { return replacedByTokenHash; }
    public void setReplacedByTokenHash(String replacedByTokenHash) { this.replacedByTokenHash = replacedByTokenHash; }
}