package com.cirobtorres.blog.api.article.entities;

import com.cirobtorres.blog.api.article.enums.ArticlesStatus;
import com.cirobtorres.blog.api.author.entities.Author;
import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "articles")
@EntityListeners(AuditingEntityListener.class)
public class Articles {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Author author;

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

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "current_published_revision_id")
    private Revisions currentPublishedRevision;

    @OneToMany(mappedBy = "article", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Revisions> revisions = new ArrayList<>();

    @Column(nullable = false, updatable = false, name = "created_at")
    @CreatedDate
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    @LastModifiedDate
    private LocalDateTime updatedAt;

    // DEFAULT CONSTRUCTOR----------------------------------------------------------------------------------------
    @Deprecated
    public Articles() {}

    // BUILDER----------------------------------------------------------------------------------------------------
    private Articles(Builder builder) {
        this.author = builder.author;
        this.slug = builder.slug;
        this.status = builder.status != null ? builder.status : ArticlesStatus.DRAFT;
        this.publishedAt = builder.publishedAt;
        this.currentPublishedRevision = builder.currentPublishedRevision;
    }

    public static class Builder {
        private Author author;
        private String slug;
        private ArticlesStatus status;
        private LocalDateTime publishedAt;
        private Revisions currentPublishedRevision;

        public Builder author(Author author) {
            this.author = author;
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

        public Builder currentPublishedRevision(Revisions revision) {
            this.currentPublishedRevision = revision;
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

    public Revisions getCurrentPublishedRevision() { return currentPublishedRevision; }
    public void setCurrentPublishedRevision(Revisions currentPublishedRevision) { this.currentPublishedRevision = currentPublishedRevision; }

    public List<Revisions> getRevisions() { return revisions; }
    public void setRevisions(List<Revisions> revisions) { this.revisions = revisions; }

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
