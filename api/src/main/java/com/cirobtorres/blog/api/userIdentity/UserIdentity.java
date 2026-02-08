package com.cirobtorres.blog.api.userIdentity;

import com.cirobtorres.blog.api.user.User;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.UUID;

// Sometimes called credentials (a single user might have multiple credentials)
// For instance: this App (client), Google, GitHub, LinkedIn, ...
// User 1 → N UserIdentity
@Entity
@Table(
        name = "user_identities",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"provider", "providerUserId"}),
                @UniqueConstraint(columnNames = {"email"})
        }
)
public class UserIdentity {
    // Local users + User providers
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserIdentityProvider provider;

    @Column(name = "provider_user_id", nullable = false)
    private String providerUserId;

    // Local users
    @Column(name = "password_hash")
    private String passwordHash;

    @Column(name = "linked_at", nullable = false, updatable = false)
    private LocalDateTime linkedAt;

    @Column(nullable = false)
    private boolean enabled = true; // false = prevents A CERTAIN IDENTITY from authenticating

    public UserIdentity() {}

    @PrePersist
    void onCreate() {
        this.linkedAt = LocalDateTime.now();
    }

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

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public boolean isEnabled() { return enabled; }

    public void setEnabled(boolean enabled) { this.enabled = enabled; }

    public LocalDateTime getLinkedAt() { return linkedAt; }

    public void setLinkedAt(LocalDateTime linkedAt) { this.linkedAt = linkedAt; }
}
