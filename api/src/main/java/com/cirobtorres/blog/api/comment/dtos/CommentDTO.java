package com.cirobtorres.blog.api.comment.dtos;

import com.cirobtorres.blog.api.article.entities.Articles;
import com.cirobtorres.blog.api.comment.entities.Comment;
import com.cirobtorres.blog.api.comment.entities.CommentLike;
import com.cirobtorres.blog.api.user.entities.User;

import java.time.LocalDateTime;
import java.util.UUID;

public record CommentDTO(
        UUID id,
        String body,
        Articles article,
        User user,
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
                comment.getArticle(),
                comment.getUser(),
                comment.getLikeCount(),
                comment.isDeleted(),
                comment.getDeletedAt(),
                comment.isBlocked(),
                comment.getBlockedAt(),
                comment.getCreatedAt(),
                comment.getUpdatedAt()
        );
    }
}
