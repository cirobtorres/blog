package com.cirobtorres.blog.api.dtos;

import com.cirobtorres.blog.api.entities.Comment;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

public record CommentDTO(
        UUID id,
        UUID parentId,
        String body,
        ArticleSubGroup article,
        UserSubGroup user,
        int likeCount,
        boolean isDeleted,
        LocalDateTime deletedAt,
        boolean isBlocked,
        LocalDateTime blockedAt,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        List<CommentDTO> replies
) {
    public CommentDTO(Comment comment) {
        this(
                comment.getId(),
                resolveParentId(comment),
                resolveBody(comment),
                comment.getArticle() != null ? new ArticleSubGroup(comment.getArticle().getId()) : null,
                resolveUser(comment),
                comment.getLikeCount(),
                comment.isDeleted(),
                comment.getDeletedAt(),
                comment.isBlocked(),
                comment.getBlockedAt(),
                comment.getCreatedAt(),
                comment.getUpdatedAt(),
                comment.getChildren() != null
                        ? comment.getChildren().stream().map(CommentDTO::new).collect(Collectors.toList())
                        : List.of()
        );
    }

    public record UserSubGroup(UUID id, String name, String pictureUrl) {}

    public record ArticleSubGroup(UUID id) {}

    private static UUID resolveParentId(Comment comment) {
        if (comment.getParent() != null) {
            return comment.getParent().getId();
        }
        return null;
    }

    private static String resolveBody(Comment comment) {
        if (comment.isBlocked()) return "[Comentário bloqueado]";
        if (comment.isDeleted()) return "[Comentário excluído]";
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