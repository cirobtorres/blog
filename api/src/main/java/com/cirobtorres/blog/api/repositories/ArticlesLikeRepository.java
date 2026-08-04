package com.cirobtorres.blog.api.repositories;

import com.cirobtorres.blog.api.entities.ArticlesLike;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface ArticlesLikeRepository extends JpaRepository<ArticlesLike, UUID> {
    Optional<ArticlesLike> findByArticleIdAndUserId(UUID commentId, UUID userId);
}
