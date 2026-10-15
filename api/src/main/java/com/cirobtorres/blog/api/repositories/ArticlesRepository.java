package com.cirobtorres.blog.api.repositories;

import com.cirobtorres.blog.api.entities.Articles;
import org.jspecify.annotations.NonNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ArticlesRepository extends JpaRepository<Articles, UUID>, JpaSpecificationExecutor<Articles> {
    @EntityGraph(attributePaths = {
            "author",
            "currentPublishedRevision",
            "currentPublishedRevision.tags",
            "currentPublishedRevision.media"
    })
    Optional<Articles> findBySlug(String slug);

    @NonNull
    @Override
    @EntityGraph(attributePaths = {
            "author",
            "currentPublishedRevision",
            "currentPublishedRevision.tags",
            "currentPublishedRevision.media"
    })
    Optional<Articles> findById(UUID id);

    @NonNull
    @Override
    @EntityGraph(attributePaths = {
            "author",
            "currentPublishedRevision",
            "currentPublishedRevision.tags"
    })
    Page<Articles> findAll(@NonNull Specification<Articles> spec, @NonNull Pageable pageable);

    @Modifying
    @Query("""
    UPDATE Articles a
    SET a.likeCount = CAST((SELECT COUNT(l) FROM ArticlesLike l WHERE l.article.id = :articleId) AS integer)
    WHERE a.id = :articleId
    """)
    void refreshLikeCount(@Param("articleId") UUID articleId);

    @Query("SELECT a.likeCount FROM Articles a WHERE a.id = :articleId")
    int findLikeCountById(@Param("articleId") UUID articleId);

    @Query("SELECT a.slug FROM Articles a")
    List<String> findAllSlugs();

    boolean existsBySlugAndIdNot(String slug, UUID id);

    boolean existsBySlug(String slug);
}
