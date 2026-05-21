package com.cirobtorres.blog.api.comment.entities;

import com.cirobtorres.blog.api.article.entities.Articles;
import com.cirobtorres.blog.api.userIdentity.entities.UserIdentity; // NOVO IMPORT
import com.cirobtorres.blog.api.user.entities.User;
import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "comments")
@EntityListeners(AuditingEntityListener.class)
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String body;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "article_id", nullable = false)
    private Articles article;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "identity_id", nullable = false)
    private UserIdentity userIdentity;

    @Column(name = "like_count")
    private int likeCount = 0;

    @Column(name = "is_deleted")
    private boolean isDeleted = false;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    @Column(name = "is_blocked")
    private boolean isBlocked = false;

    @Column(name = "blocked_at")
    private LocalDateTime blockedAt;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // SELF RELATION----------------------------------------------------------------------------------------------
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Comment parent;

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @OrderBy("createdAt ASC")
    private List<Comment> children = new ArrayList<>();

    // DEFAULT CONSTRUCTOR----------------------------------------------------------------------------------------
    @Deprecated
    public Comment() {}

    // BUILDER----------------------------------------------------------------------------------------------------
    private Comment(Builder builder) {
        this.body = builder.body;
        this.article = builder.article;
        this.userIdentity = builder.userIdentity;
        this.parent = builder.parent;
    }

    public static class Builder {
        private String body;
        private Articles article;
        private UserIdentity userIdentity;
        private Comment parent;

        public Builder body(String body) { this.body = body; return this; }
        public Builder article(Articles article) { this.article = article; return this; }
        public Builder userIdentity(UserIdentity userIdentity) { this.userIdentity = userIdentity; return this; }
        public Builder parent(Comment parent) { this.parent = parent; return this; }

        public Comment build() { return new Comment(this); }
    }

    // GETTERS / SETTERS------------------------------------------------------------------------------------------
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public String getBody() { return body; }
    public void setBody(String body) { this.body = body; }

    public Articles getArticle() { return article; }
    public void setArticle(Articles article) { this.article = article; }

    public UserIdentity getUserIdentity() { return userIdentity; }
    public void setUserIdentity(UserIdentity userIdentity) { this.userIdentity = userIdentity; }

    public User getUser() {
        return this.userIdentity != null ? this.userIdentity.getUser() : null;
    }

    public int getLikeCount() { return likeCount; }
    public void setLikeCount(int likeCount) { this.likeCount = likeCount; }

    public boolean isDeleted() { return isDeleted; }
    public void setDeleted(boolean deleted) { isDeleted = deleted; }

    public LocalDateTime getDeletedAt() { return deletedAt; }
    public void setDeletedAt(LocalDateTime deletedAt) { this.deletedAt = deletedAt; }

    public boolean isBlocked() { return isBlocked; }
    public void setBlocked(boolean blocked) { isBlocked = blocked; }

    public LocalDateTime getBlockedAt() { return blockedAt; }
    public void setBlockedAt(LocalDateTime blockedAt) { this.blockedAt = blockedAt; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public Comment getParent() { return parent; }
    public void setParent(Comment parent) { this.parent = parent; }

    public List<Comment> getChildren() {
        if (this.children == null) {
            this.children = new ArrayList<>();
        }
        return this.children;
    }
    public void setChildren(List<Comment> children) { this.children = children; }
}