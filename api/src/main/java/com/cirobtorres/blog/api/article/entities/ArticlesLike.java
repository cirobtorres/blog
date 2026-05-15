package com.cirobtorres.blog.api.article.entities;

import com.cirobtorres.blog.api.user.entities.User;
import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "articles_likes", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"article_id", "user_id"})
})
@EntityListeners(AuditingEntityListener.class)
public class ArticlesLike {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "article_id", nullable = false)
    private Articles article;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    // DEFAULT CONSTRUCTOR----------------------------------------------------------------------------------------
    @Deprecated
    public ArticlesLike() {}

    // BUILDER----------------------------------------------------------------------------------------------------
    private ArticlesLike(Builder builder) {
        this.article = builder.article;
        this.user = builder.user;
    }

    public static class Builder {
        private Articles article;
        private User user;

        public Builder article(Articles article) {
            this.article = article;
            return this;
        }

        public Builder user(User user) {
            this.user = user;
            return this;
        }

        public ArticlesLike build() { return new ArticlesLike(this); }
    }

    // GETTERS / SETTERS------------------------------------------------------------------------------------------
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public Articles getArticle() { return article; }
    public void setArticle(Articles article) { this.article = article; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}