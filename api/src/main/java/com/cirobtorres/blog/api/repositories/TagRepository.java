package com.cirobtorres.blog.api.repositories;

import com.cirobtorres.blog.api.entities.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

public interface TagRepository extends JpaRepository<Tag, UUID> {
    Optional<Tag> findBySlug(String slug);
    Optional<Set<Tag>> findAllByIdIn(Set<UUID> tags);
}
