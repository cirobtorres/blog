package com.cirobtorres.blog.api.authority.entities;

import com.cirobtorres.blog.api.authority.enums.AuthorityType;
import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "authorities")
public class Authority {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Enumerated(EnumType.STRING)
    @Column(unique = true, nullable = false)
    private AuthorityType name; // USER, AUTHOR

    // DEFAULT CONSTRUCTOR----------------------------------------------------------------------------------------
    @Deprecated
    public Authority() {}

    // BUILDER----------------------------------------------------------------------------------------------------
    private Authority(Builder builder) {
        this.name = builder.name;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private AuthorityType name;

        public Builder authorityType(AuthorityType name) {
            this.name = name;
            return this;
        }

        public Authority build() { return new Authority(this); }
    }

    // GETTERS / SETTERS------------------------------------------------------------------------------------------
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public AuthorityType getName() { return name; }
    public void setName(AuthorityType name) { this.name = name; }
}
