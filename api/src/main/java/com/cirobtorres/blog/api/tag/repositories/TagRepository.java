package com.cirobtorres.blog.api.tag.repositories;

import com.cirobtorres.blog.api.tag.entities.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TagRepository extends JpaRepository<Tag, UUID> {
}
