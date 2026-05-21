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
                resolveBody(comment),
                comment.getArticle() != null ? new ArticleSubGroup(comment.getArticle().getId()) : null,
                resolveUser(comment),
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

    private static String resolveBody(Comment comment) {
        if (comment.isBlocked()) {
            return "[Comentário bloqueado]";
        }
        if (comment.isDeleted()) {
            return "[Comentário excluído]";
        }
        return comment.getBody();
    }

    private static UserSubGroup resolveUser(Comment comment) {
        if (comment.isDeleted() || comment.isBlocked()) {
            return new UserSubGroup(null, "[Excluído]", null);
        }
        if (comment.getUserIdentity() != null) {
            UUID userId = comment.getUserIdentity().getUser() != null
                    ? comment.getUserIdentity().getUser().getId()
                    : null;
            return new UserSubGroup(
                    userId,
                    comment.getUserIdentity().getName(),
                    comment.getUserIdentity().getPictureUrl()
            );
        }
        return null;
    }
}