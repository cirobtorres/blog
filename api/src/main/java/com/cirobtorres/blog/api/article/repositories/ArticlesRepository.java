package com.cirobtorres.blog.api.article.repositories;

import com.cirobtorres.blog.api.article.entities.Articles;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface ArticlesRepository extends JpaRepository<Articles, UUID> {
    Optional<Articles> findBySlug(String slug);
}
