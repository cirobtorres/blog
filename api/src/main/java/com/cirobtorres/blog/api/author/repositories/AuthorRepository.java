package com.cirobtorres.blog.api.author.repositories;

import com.cirobtorres.blog.api.author.entities.Author;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface AuthorRepository extends JpaRepository<Author, UUID> {
    Optional<Author> findByUserId(UUID userId);
}
