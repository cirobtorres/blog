package com.cirobtorres.blog.api.dtos;

import com.cirobtorres.blog.api.entities.Articles;
import com.cirobtorres.blog.api.entities.Revisions;
import com.cirobtorres.blog.api.enums.ArticlesStatus;

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
        boolean likedByCurrentUser,
        String body,
        ArticlesStatus status,
        Integer likeCount,
        Integer commentCount,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
    public ArticleDTO(Articles article, Revisions revision, boolean likedByCurrentUser) {
        this(
                article.getId(),
                revision != null ? revision.getTitle() : "Sem título",
                revision != null ? revision.getSubtitle() : "",
                article.getSlug(),
                revision != null ? revision.getTags().stream().map(TagDTO::new).collect(Collectors.toSet()) : Collections.emptySet(),
                article.getAuthor() != null ? new AuthorArticleDTO(article.getAuthor()) : null,
                (revision != null && revision.getMedia() != null) ? new MediaArticleDTO(revision.getMedia()) : null,
                likedByCurrentUser,
                revision != null ? revision.getBody() : "",
                article.getStatus(),
                article.getLikeCount(),
                article.getCommentCount(),
                article.getCreatedAt(),
                revision != null ? revision.getCreatedAt() : article.getUpdatedAt()
        );
    }

    public ArticleDTO(Articles article) {
        this(article, article.getCurrentPublishedRevision(), false);
    }

    public ArticleDTO(Articles article, Revisions revision) {
        this(article, revision, false);
    }

    public ArticleDTO(Articles article, Revisions revision, UUID currentUserId) {
        this(article, revision, checkIfLiked(article, currentUserId));
    }

    private static boolean checkIfLiked(Articles article, UUID currentUserId) {
        if (currentUserId == null || article.getLikes() == null || article.getLikes().isEmpty()) {
            return false;
        }
        return article.getLikes().stream()
                .anyMatch(like -> like.getUser() != null && currentUserId.equals(like.getUser().getId()));
    }
}
