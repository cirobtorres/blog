package com.cirobtorres.blog.api.auditToken.entities;

import com.cirobtorres.blog.api.auditToken.enums.AuditTokenType;
import com.cirobtorres.blog.api.userIdentity.entities.UserIdentity;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "audit_tokens")
public class AuditToken {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String tokenHash;

    @ManyToOne(targetEntity = UserIdentity.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "user_identity_id")
    private UserIdentity userIdentity;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AuditTokenType tokenType;

    @Column(nullable = false)
    private LocalDateTime expiresAt;

    @Column(nullable = false)
    private boolean revoked;

    private LocalDateTime revokedAt;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    public AuditToken() {}

    private AuditToken(Builder builder) {
        this.tokenHash = builder.tokenHash;
        this.tokenType = builder.tokenType;
        this.userIdentity = builder.userIdentity;
        this.expiresAt = builder.expiresAt;
        this.revoked = builder.revoked;
    }

    // Getters e Setters
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public String getTokenHash() { return tokenHash; }
    public void setTokenHash(String token) { this.tokenHash = token; }

    public UserIdentity getUserIdentity() { return userIdentity; }
    public void setUserIdentity(UserIdentity userIdentity) { this.userIdentity = userIdentity; }

    public AuditTokenType getTokenType() { return tokenType; }
    public void setTokenType(AuditTokenType tokenType) { this.tokenType = tokenType; }

    public LocalDateTime getExpiresAt() { return expiresAt; }
    public void setExpiresAt(LocalDateTime expiresAt) { this.expiresAt = expiresAt; }

    public boolean isRevoked() { return revoked; }
    public void setRevoked(boolean revoked) { this.revoked = revoked; }

    public LocalDateTime getRevokedAt() { return revokedAt; }
    public void setRevokedAt(LocalDateTime revokedAt) { this.revokedAt = revokedAt; }

    public LocalDateTime getCreatedAt() { return createdAt; }

    public boolean isExpired() {
        return LocalDateTime.now().isAfter(this.expiresAt);
    }

    public boolean isValid() {
        return !revoked && !isExpired();
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private String tokenHash;
        private AuditTokenType tokenType;
        private UserIdentity userIdentity;
        private LocalDateTime expiresAt;
        private boolean revoked;

        public Builder tokenHash(String tokenHash) {
            this.tokenHash = tokenHash;
            return this;
        }

        public Builder tokenType(AuditTokenType tokenType) {
            this.tokenType = tokenType;
            return this;
        }

        public Builder userIdentity(UserIdentity userIdentity) {
            this.userIdentity = userIdentity;
            return this;
        }

        public Builder expiryDate(LocalDateTime expiryDate) {
            this.expiresAt = expiryDate;
            return this;
        }

        public Builder revoked(boolean revoked) {
            this.revoked = revoked;
            return this;
        }

        public AuditToken build() {
            return new AuditToken(this);
        }
    }
}