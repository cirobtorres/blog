package com.cirobtorres.blog.api.article.repositories;

import com.cirobtorres.blog.api.article.entities.Articles;
import com.cirobtorres.blog.api.article.enums.ArticlesStatus;
import org.jspecify.annotations.NonNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ArticlesRepository extends JpaRepository<Articles, UUID>, JpaSpecificationExecutor<Articles> {
    @EntityGraph(attributePaths = {"author", "currentPublishedRevision", "currentPublishedRevision.tags", "currentPublishedRevision.media"})
    Optional<Articles> findBySlugAndStatus(String slug, ArticlesStatus status);

    @EntityGraph(attributePaths = {"author", "media"})
    Optional<Articles> findBySlug(String slug);

    @NonNull
    @Override
    @EntityGraph(attributePaths = {"author", "currentPublishedRevision", "currentPublishedRevision.tags", "currentPublishedRevision.media"})
    Optional<Articles> findById(UUID id);

    @NonNull
    @Override
    @EntityGraph(attributePaths = {"author", "currentPublishedRevision", "currentPublishedRevision.tags"})
    Page<Articles> findAll(@NonNull Specification<Articles> spec, @NonNull Pageable pageable);

    @Query("SELECT a.slug FROM Articles a")
    List<String> findAllSlugs();
}
