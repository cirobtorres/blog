package com.cirobtorres.blog.api.userIdentity.entities;

import com.cirobtorres.blog.api.user.entities.User;
import com.cirobtorres.blog.api.userIdentity.enums.UserIdentityProvider;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(
        name = "user_identities",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"provider", "provider_user_id"})
        }
)
public class UserIdentity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column
    private String name;

    @Column(name = "picture_url")
    private String pictureUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserIdentityProvider provider;

    @Column(name = "provider_user_id", nullable = false)
    private String providerUserId;

    @Column(name = "provider_email")
    private String providerEmail;

    @Column(name = "is_provider_email_verified")
    private Boolean isProviderEmailVerified;

    @Column(name = "is_provider_email_verified_at")
    private LocalDateTime isProviderEmailVerifiedAt;

    @Column(name = "last_authenticated_at")
    private LocalDateTime lastAuthenticatedAt;

    @Column(name = "password_hash")
    private String passwordHash;

    @Column(name = "linked_at", nullable = false, updatable = false)
    private LocalDateTime linkedAt;

    @Column(nullable = false)
    private boolean enabled = true;

    @PrePersist
    void onCreate() {
        this.linkedAt = LocalDateTime.now();
    }

    // DEFAULT CONSTRUCTOR----------------------------------------------------------------------------------------
    public UserIdentity() {}

    // BUILDER----------------------------------------------------------------------------------------------------
    private UserIdentity(Builder builder) {
        this.user = builder.user;
        this.name = builder.name;
        this.pictureUrl = builder.pictureUrl;
        this.provider = builder.provider;
        this.providerUserId = builder.providerUserId;
        this.providerEmail = builder.providerEmail;
        this.isProviderEmailVerified = builder.isProviderEmailVerified;
        this.passwordHash = builder.passwordHash;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private User user;
        private String name;
        private String pictureUrl;
        private UserIdentityProvider provider;
        private String providerUserId;
        private String providerEmail;
        private Boolean isProviderEmailVerified;
        private String passwordHash;

        public Builder user(User user) {
            this.user = user;
            return this;
        }

        public Builder name(String name) {
            this.name = name;
            return this;
        }

        public Builder pictureUrl(String pictureUrl) {
            this.pictureUrl = pictureUrl;
            return this;
        }

        public Builder provider(UserIdentityProvider provider) {
            this.provider = provider;
            return this;
        }

        public Builder providerUserId(String providerUserId) {
            this.providerUserId = providerUserId;
            return this;
        }

        public Builder providerEmail(String providerEmail) {
            this.providerEmail = providerEmail;
            return this;
        }

        public Builder isProviderEmailVerified(boolean isProviderEmailVerified) {
            this.isProviderEmailVerified = isProviderEmailVerified;
            return this;
        }

        public Builder passwordHash(String passwordHash) {
            this.passwordHash = passwordHash;
            return this;
        }

        public UserIdentity build() { return new UserIdentity(this); }
    }

    // GETTERS / SETTERS------------------------------------------------------------------------------------------
    public UUID getId() {
        return id;
    }
    public void setId(UUID id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getPictureUrl() {
        return pictureUrl;
    }
    public void setPictureUrl(String pictureUrl) {
        this.pictureUrl = pictureUrl;
    }

    public UserIdentityProvider getProvider() {
        return provider;
    }
    public void setProvider(UserIdentityProvider provider) {
        this.provider = provider;
    }

    public String getProviderUserId() {
        return providerUserId;
    }
    public void setProviderUserId(String providerUserId) {
        this.providerUserId = providerUserId;
    }

    public String getProviderEmail() {
        return providerEmail;
    }
    public void setProviderEmail(String providerEmail) {
        this.providerEmail = providerEmail;
    }

    public Boolean isProviderEmailVerified() {
        return isProviderEmailVerified;
    }
    public void setIsProviderEmailVerified(Boolean isProviderEmailVerified) { this.isProviderEmailVerified = isProviderEmailVerified; }

    public LocalDateTime isProviderEmailVerifiedAt() {
        return isProviderEmailVerifiedAt;
    }
    public void setIsProviderEmailVerifiedAt(LocalDateTime isProviderEmailVerifiedAt) { this.isProviderEmailVerifiedAt = isProviderEmailVerifiedAt; }

    public LocalDateTime getLastAuthenticatedAt() {
        return lastAuthenticatedAt;
    }
    public void setLastAuthenticatedAt(LocalDateTime lastAuthenticatedAt) { this.lastAuthenticatedAt = lastAuthenticatedAt; }

    public String getPasswordHash() { return passwordHash; }
    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public LocalDateTime getLinkedAt() {
        return linkedAt;
    }
    public void setLinkedAt(LocalDateTime linkedAt) {
        this.linkedAt = linkedAt;
    }

    public boolean isEnabled() {
        return enabled;
    }
    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }
}
