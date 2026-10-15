package com.cirobtorres.blog.api.repositories;

import com.cirobtorres.blog.api.entities.ArticlesLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface ArticlesLikeRepository extends JpaRepository<ArticlesLike, UUID> {
    Optional<ArticlesLike> findByArticleIdAndUserId(UUID commentId, UUID userId);

    void deleteByArticleId(UUID id);

    @Modifying
    @Query(value = """
    INSERT INTO articles_likes (id, article_id, user_id, created_at)
    VALUES (gen_random_uuid(), :articleId, :userId, now())
    ON CONFLICT (article_id, user_id) DO NOTHING
    """, nativeQuery = true)
    int insertIfAbsent(@Param("articleId") UUID articleId, @Param("userId") UUID userId);

    @Modifying
    @Query("DELETE FROM ArticlesLike l WHERE l.article.id = :articleId AND l.user.id = :userId")
    int deleteIfPresent(@Param("articleId") UUID articleId, @Param("userId") UUID userId);
}
