package com.cirobtorres.blog.api.article.repositories;

import com.cirobtorres.blog.api.article.entities.Revisions;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface RevisionsRepository extends JpaRepository<Revisions, UUID> {
}
