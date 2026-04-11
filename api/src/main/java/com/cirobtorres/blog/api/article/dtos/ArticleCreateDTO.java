package com.cirobtorres.blog.api.article.dtos;

import com.cirobtorres.blog.api.article.entities.Articles;
import com.cirobtorres.blog.api.article.enums.ArticlesStatus;

import java.time.LocalDateTime;
import java.util.UUID;

public record ArticleCreateDTO(
        UUID id,
        String title,
        String subtitle,
        String authorId,
        String bannerUrl,
        String slug,
        ArticlesStatus status,
        LocalDateTime createdAt
) {
    public ArticleCreateDTO(Articles entity) {
        this(
                entity.getId(),
                entity.getTitle(),
                entity.getSubtitle(),
                entity.getAuthor().getId().toString(),
                entity.getMedia().getUrl(),
                entity.getSlug(),
                entity.getStatus(),
                entity.getCreatedAt()
        );
    }
}
