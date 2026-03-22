package com.cirobtorres.blog.api.article.entities;

import com.cirobtorres.blog.api.article.enums.ArticlesStatus;
import com.cirobtorres.blog.api.author.Author;
import com.cirobtorres.blog.api.media.entities.Media;
import com.cirobtorres.blog.api.media.enums.MediaType;
import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "articles")
@EntityListeners(AuditingEntityListener.class)
public class Articles {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id") // NULLABLE
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Author author;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(length = 200)
    private String subtitle;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String body;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "banner_media_id")
    private Media banner;

    @Column(nullable = false, unique = true)
    private String slug;

    @Column(name = "comment_count")
    private int commentCount = 0;

    @Column(name = "like_count")
    private int likeCount = 0;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ArticlesStatus status = ArticlesStatus.DRAFT;

    @Column(name = "published_at")
    private LocalDateTime publishedAt;

    @Column(nullable = false, updatable = false, name = "created_at")
    @CreatedDate
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    @LastModifiedDate
    private LocalDateTime updatedAt;

    // DEFAULT CONSTRUCTOR----------------------------------------------------------------------------------------
    public Articles() {}

    // BUILDER----------------------------------------------------------------------------------------------------
    private Articles(Builder builder) {
        this.author = builder.author;
        this.title = builder.title;
        this.subtitle = builder.subtitle;
        this.body = builder.body;
        this.banner = builder.banner;
        this.slug = builder.slug;
        this.status = builder.status;
        this.publishedAt = builder.publishedAt;
    }

    public static class Builder {
        private Author author;
        private String title;
        private String subtitle;
        private String body;
        private Media banner;
        private String slug;
        private ArticlesStatus status;
        private LocalDateTime publishedAt;

        public Builder author(Author author) {
            this.author = author;
            return this;
        }

        public Builder title(String title) {
            this.title = title;
            return this;
        }

        public Builder subtitle(String subtitle) {
            this.subtitle = subtitle;
            return this;
        }

        public Builder body(String body) {
            this.body = body;
            return this;
        }

        public Builder banner(Media media) {
            this.banner = media;
            return this;
        }

        public Builder slug(String slug) {
            this.slug = slug;
            return this;
        }

        public Builder status(ArticlesStatus status) {
            this.status = status;
            return this;
        }

        public Builder publishedAt(LocalDateTime publishedAt) {
            this.publishedAt = publishedAt;
            return this;
        }

        public Articles build() {
            return new Articles(this);
        }
    }

    // GETTERS / SETTERS------------------------------------------------------------------------------------------
    public UUID getId() {
        return id;
    }
    public void setId(UUID id) {
        this.id = id;
    }

    public Author getAuthor() {
        return author;
    }
    public void setAuthor(Author author) {
        this.author = author;
    }

    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }

    public String getSubtitle() {
        return subtitle;
    }
    public void setSubtitle(String subtitle) {
        this.subtitle = subtitle;
    }

    public String getBody() {
        return body;
    }
    public void setBody(String body) {
        this.body = body;
    }

    public Media getBanner() { return banner; }
    public void setBanner(Media banner) {
        if (banner != null && banner.getType() != MediaType.IMAGE) {
            throw new IllegalArgumentException("Banner type must be IMAGE.");
        }
        this.banner = banner;
    }

    public String getSlug() {
        return slug;
    }
    public void setSlug(String slug) {
        this.slug = slug;
    }

    public int getCommentCount() {
        return commentCount;
    }
    public void setCommentCount(int commentCount) {
        this.commentCount = commentCount;
    }

    public int getLikeCount() {
        return likeCount;
    }
    public void setLikeCount(int likeCount) {
        this.likeCount = likeCount;
    }

    public ArticlesStatus getStatus() { return status; }
    public void setStatus(ArticlesStatus status) { this.status = status; }

    public LocalDateTime getPublishedAt() { return publishedAt; }
    public void setPublishedAt(LocalDateTime publishedAt) { this.publishedAt = publishedAt; }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
