package com.cirobtorres.blog.api.entities;

import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "comments_likes", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"comment_id", "user_id"})
})
@EntityListeners(AuditingEntityListener.class)
public class CommentLike {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comment_id", nullable = false)
    private Comment comment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    // DEFAULT CONSTRUCTOR----------------------------------------------------------------------------------------
    @Deprecated
    public CommentLike() {}

    // BUILDER----------------------------------------------------------------------------------------------------
    private CommentLike(Builder builder) {
        this.comment = builder.comment;
        this.user = builder.user;
    }

    public static class Builder {
        private Comment comment;
        private User user;

        public Builder comment(Comment comment) {
            this.comment = comment;
            return this;
        }

        public Builder user(User user) {
            this.user = user;
            return this;
        }

        public CommentLike build() { return new CommentLike(this); }
    }

    // GETTERS / SETTERS------------------------------------------------------------------------------------------
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public Comment getComment() { return comment; }
    public void setComment(Comment comment) { this.comment = comment; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}