package com.cirobtorres.blog.api.tag.repositories;

import com.cirobtorres.blog.api.tag.entities.Tag;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

public interface TagRepository extends JpaRepository<Tag, UUID> {
    Optional<Tag> findBySlug(String slug);
    Optional<Set<Tag>> findAllByIdIn(Set<UUID> tags);
}
