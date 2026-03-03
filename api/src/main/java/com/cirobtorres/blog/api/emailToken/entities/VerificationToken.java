package com.cirobtorres.blog.api.emailToken.entities;

import com.cirobtorres.blog.api.userIdentity.entities.UserIdentity;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "verification_tokens")
public class VerificationToken {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String tokenHash;

    @OneToOne(targetEntity = UserIdentity.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "user_identity_id")
    private UserIdentity userIdentity;

    @Column(nullable = false)
    private LocalDateTime expiryDate;

    public VerificationToken() {}

    public void setId(UUID id) { this.id = id; }

    public UUID getId() {
        return id;
    }

    public String getTokenHash() {
        return tokenHash;
    }

    public void setTokenHash(String tokenHash) {
        this.tokenHash = tokenHash;
    }

    public UserIdentity getUserIdentity() {
        return userIdentity;
    }

    public void setUserIdentity(UserIdentity userIdentity) {
        this.userIdentity = userIdentity;
    }

    public LocalDateTime getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(LocalDateTime expiryDate) {
        this.expiryDate = expiryDate;
    }
}