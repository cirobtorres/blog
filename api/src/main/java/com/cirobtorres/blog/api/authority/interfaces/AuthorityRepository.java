package com.cirobtorres.blog.api.authority.interfaces;

import com.cirobtorres.blog.api.authority.entities.Authority;
import com.cirobtorres.blog.api.authority.enums.AuthorityType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface AuthorityRepository extends JpaRepository<Authority, UUID> {
    Optional<Authority> findByName(AuthorityType name);
}
