package com.cirobtorres.blog.api.dtos;

import com.cirobtorres.blog.api.entities.Comment;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

public record CommentDTO(
        UUID id,
        UUID parentId,
        String body,
        ArticleSubGroup article,
        UserSubGroup user,
        int likeCount,
        boolean likedByCurrentUser,
        boolean isDeleted,
        LocalDateTime deletedAt,
        boolean isBlocked,
        LocalDateTime blockedAt,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        List<CommentDTO> replies
) {
    public CommentDTO(Comment comment, UUID currentUserId) {
        this(
                comment.getId(),
                comment.getParent() != null ? comment.getParent().getId() : null,
                resolveBody(comment),
                comment.getArticle() != null ? new ArticleSubGroup(comment.getArticle().getId()) : null,
                resolveUser(comment),
                comment.getLikeCount(),
                checkIfLiked(comment, currentUserId),
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

    public CommentDTO(Comment comment) {
        this(comment, (UUID) null);
    }

    public CommentDTO(Comment comment, Set<UUID> likedCommentIds) {
        this(
                comment.getId(),
                comment.getParent() != null ? comment.getParent().getId() : null,
                resolveBody(comment),
                comment.getArticle() != null ? new ArticleSubGroup(comment.getArticle().getId()) : null,
                resolveUser(comment),
                comment.getLikeCount(),
                likedCommentIds != null && likedCommentIds.contains(comment.getId()),
                comment.isDeleted(),
                comment.getDeletedAt(),
                comment.isBlocked(),
                comment.getBlockedAt(),
                comment.getCreatedAt(),
                comment.getUpdatedAt(),
                comment.getChildren() != null
                        ? comment.getChildren().stream()
                        .map(child -> new CommentDTO(child, likedCommentIds))
                        .collect(Collectors.toList())
                        : List.of()
        );
    }

    public record UserSubGroup(UUID id, String name) {}

    public record ArticleSubGroup(UUID id) {}

    private static String resolveBody(Comment comment) {
        if (comment.isBlocked()) return "[Comentário bloqueado]";
        if (comment.isDeleted()) return "[Comentário excluído]";
        return comment.getBody();
    }

    private static UserSubGroup resolveUser(Comment comment) {
        if (comment.isDeleted() || comment.isBlocked()) {
            return new UserSubGroup(null, "[Excluído]");
        }
        if (comment.getUser() != null) {
            return new UserSubGroup(
                    comment.getUser().getId(),
                    comment.getUser().getName()
            );
        }
        return null;
    }

    private static boolean checkIfLiked(Comment comment, UUID currentUserId) {
        if (currentUserId == null) return false;
        return false;
    }
}