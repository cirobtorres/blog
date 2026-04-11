package com.cirobtorres.blog.api.author.entities;

import com.cirobtorres.blog.api.article.entities.Articles;
import com.cirobtorres.blog.api.user.entities.User;
import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(
        name = "authors",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "user_id")
        }
)
@EntityListeners(AuditingEntityListener.class)
public class Author {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "user_id",
            nullable = false,
            unique = true
    )
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @Column
    private String name;

    @Column(name = "picture_url")
    private String pictureUrl;

    @OneToMany(mappedBy = "author")
    private List<Articles> articles;

    @Column(name = "created_at")
    @CreatedDate
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    @LastModifiedDate
    private LocalDateTime updatedAt;

    // DEFAULT CONSTRUCTOR----------------------------------------------------------------------------------------
    @Deprecated
    public Author() {}

    // BUILDER----------------------------------------------------------------------------------------------------
    private Author(Builder builder) {
        this.user = builder.user;
    }

    public static class Builder {
        private User user;

        public Builder user(User user) {
            this.user = user;
            return this;
        }

        public Author build() {
            return new Author(this);
        }
    }

    // GETTERS / SETTERS------------------------------------------------------------------------------------------
    public UUID getId() {
        return id;
    }
    public void setId(UUID id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getPictureUrl() { return pictureUrl; }
    public void setPictureUrl(String pictureUrl) { this.pictureUrl = pictureUrl; }

    public List<Articles> getArticles() {
        return articles;
    }
    public void setArticles(List<Articles> articles) {
        this.articles = articles;
    }

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
