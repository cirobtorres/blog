package com.cirobtorres.blog.api.article.dtos;

import com.cirobtorres.blog.api.article.entities.Articles;
import com.cirobtorres.blog.api.article.enums.ArticlesStatus;
import com.cirobtorres.blog.api.author.dtos.AuthorArticleDTO;
import com.cirobtorres.blog.api.media.dtos.MediaArticleDTO;

import java.time.LocalDateTime;
import java.util.UUID;

public record ArticleDTO(
        UUID id,
        String title,
        String subtitle,
        String slug,
        AuthorArticleDTO author,
        MediaArticleDTO media,
        String body,
        ArticlesStatus status,
        Integer likeCount,
        Integer commentCount,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
    public ArticleDTO(Articles entity) {
        this(
                entity.getId(),
                entity.getTitle(),
                entity.getSubtitle(),
                entity.getSlug(),
                entity.getAuthor() != null ? new AuthorArticleDTO(entity.getAuthor()) : null,
                entity.getMedia() != null ? new MediaArticleDTO(entity.getMedia()) : null,
                entity.getBody(),
                entity.getStatus(),
                entity.getLikeCount(),
                entity.getCommentCount(),
                entity.getCreatedAt(),
                entity.getUpdatedAt()
        );
    }
}