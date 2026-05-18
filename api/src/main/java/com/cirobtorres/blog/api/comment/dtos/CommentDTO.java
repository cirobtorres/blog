package com.cirobtorres.blog.api.comment.dtos;

import com.cirobtorres.blog.api.comment.entities.Comment;
import java.time.LocalDateTime;
import java.util.UUID;

public record CommentDTO(
        UUID id,
        String body,
        ArticleSubGroup article,
        UserSubGroup user,
        int likeCount,
        boolean isDeleted,
        LocalDateTime deletedAt,
        boolean isBlocked,
        LocalDateTime blockedAt,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
    public CommentDTO(Comment comment) {
        this(
                comment.getId(),
                comment.getBody(),
                comment.getArticle() != null ? new ArticleSubGroup(comment.getArticle().getId()) : null,
                comment.getUserIdentity() != null ? new UserSubGroup(
                        comment.getUserIdentity().getUser() != null ? comment.getUserIdentity().getUser().getId() : null,
                        comment.getUserIdentity().getName(),
                        comment.getUserIdentity().getPictureUrl()
                ) : null,
                comment.getLikeCount(),
                comment.isDeleted(),
                comment.getDeletedAt(),
                comment.isBlocked(),
                comment.getBlockedAt(),
                comment.getCreatedAt(),
                comment.getUpdatedAt()
        );
    }

    public record UserSubGroup(UUID id, String name, String pictureUrl) {}
    public record ArticleSubGroup(UUID id) {}
}