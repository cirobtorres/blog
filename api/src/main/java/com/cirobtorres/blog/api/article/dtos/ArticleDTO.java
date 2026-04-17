package com.cirobtorres.blog.api.article.dtos;

import com.cirobtorres.blog.api.article.entities.Articles;
import com.cirobtorres.blog.api.article.entities.Revisions;
import com.cirobtorres.blog.api.article.enums.ArticlesStatus;
import com.cirobtorres.blog.api.author.dtos.AuthorArticleDTO;
import com.cirobtorres.blog.api.media.dtos.MediaArticleDTO;
import com.cirobtorres.blog.api.tag.dtos.TagDTO;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

public record ArticleDTO(
        UUID id,
        String title,
        String subtitle,
        String slug,
        Set<TagDTO> tags,
        AuthorArticleDTO author,
        MediaArticleDTO media,
        String body,
        ArticlesStatus status,
        Integer likeCount,
        Integer commentCount,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
    public ArticleDTO(Articles article) {
        this(article, article.getCurrentPublishedRevision());
    }

    public ArticleDTO(Articles article, Revisions revision) {
        this(
                article.getId(),
                revision != null ? revision.getTitle() : "Sem título",
                revision != null ? revision.getSubtitle() : "",
                article.getSlug(),
                revision != null ? revision.getTags().stream().map(TagDTO::new).collect(Collectors.toSet()) : Collections.emptySet(),
                article.getAuthor() != null ? new AuthorArticleDTO(article.getAuthor()) : null,
                (revision != null && revision.getMedia() != null) ? new MediaArticleDTO(revision.getMedia()) : null,
                revision != null ? revision.getBody() : "",
                article.getStatus(),
                article.getLikeCount(),
                article.getCommentCount(),
                article.getCreatedAt(),
                revision != null ? revision.getCreatedAt() : article.getUpdatedAt()
        );
    }
}