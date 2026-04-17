package com.cirobtorres.blog.api.article.entities;

import com.cirobtorres.blog.api.media.entities.Media;
import com.cirobtorres.blog.api.media.enums.MediaType;
import com.cirobtorres.blog.api.tag.entities.Tag;
import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "revisions")
@EntityListeners(AuditingEntityListener.class)
public class Revisions {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(length = 200)
    private String subtitle;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String body;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "media_id")
    @OnDelete(action = OnDeleteAction.SET_NULL)
    private Media media;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "revision_tags",
            joinColumns = @JoinColumn(name = "revision_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private Set<Tag> tags = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "article_id", nullable = false)
    private Articles article;

    @Column(nullable = false, updatable = false, name = "created_at")
    @CreatedDate
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    @LastModifiedDate
    private LocalDateTime updatedAt;

    // DEFAULT CONSTRUCTOR----------------------------------------------------------------------------------------
    @Deprecated
    public Revisions() {}

    // BUILDER----------------------------------------------------------------------------------------------------
    private Revisions(Builder builder) {
        this.title = builder.title;
        this.subtitle = builder.subtitle;
        this.body = builder.body;
        this.media = builder.media;
        this.tags = builder.tags;
        this.article = builder.article;
    }

    public static class Builder {
        private String title;
        private String subtitle;
        private String body;
        private Media media;
        private Set<Tag> tags = new HashSet<>();
        private Articles article;

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

        public Builder media(Media media) {
            this.media = media;
            return this;
        }

        public Builder tags(Set<Tag> tags) {
            this.tags = tags;
            return this;
        }

        public Builder article(Articles article) {
            this.article = article;
            return this;
        }

        public Revisions build() {
            if (this.article == null) {
                throw new IllegalStateException("Revision must be associated with an Article.");
            }
            return new Revisions(this);
        }
    }

    // GETTERS / SETTERS------------------------------------------------------------------------------------------
    public UUID getId() {
        return id;
    }
    public void setId(UUID id) {
        this.id = id;
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

    public Media getMedia() { return media; }
    public void setMedia(Media media) {
        if (media != null && media.getType() != MediaType.IMAGE) {
            throw new IllegalArgumentException("Media type must be IMAGE.");
        }
        this.media = media;
    }

    public Set<Tag> getTags() { return tags; }
    public void setTags(Set<Tag> tags) { this.tags = tags; }

    public Articles getArticle() { return article; }
    public void setArticle(Articles article) { this.article = article; }

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
