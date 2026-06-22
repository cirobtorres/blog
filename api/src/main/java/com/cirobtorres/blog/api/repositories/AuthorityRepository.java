package com.cirobtorres.blog.api.repositories;

import com.cirobtorres.blog.api.entities.Authority;
import com.cirobtorres.blog.api.enums.AuthorityType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface AuthorityRepository extends JpaRepository<Authority, UUID> {
    Optional<Authority> findByName(AuthorityType name);
}
