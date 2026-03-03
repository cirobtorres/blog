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
    private AuthorityType name; // USER, AUTHOR, ADMIN, SUPER_ADMIN

    public UUID getId() { return id; }

    public void setId(UUID id) { this.id = id; }

    public AuthorityType getName() { return name; }

    public void setName(AuthorityType name) { this.name = name; }
}
