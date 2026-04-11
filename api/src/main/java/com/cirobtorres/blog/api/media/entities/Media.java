package com.cirobtorres.blog.api.media.entities;

import com.cirobtorres.blog.api.media.enums.MediaType;
import com.cirobtorres.blog.api.mediaFolder.entities.MediaFolder;
import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "media")
@EntityListeners(AuditingEntityListener.class)
public class Media {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "folder_id")
    private MediaFolder folder;

    @Column(name = "public_id", nullable = false, unique = true, columnDefinition = "TEXT")
    private String publicId;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String url;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String extension; // jpg, mp4, wav

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, columnDefinition = "TEXT")
    private MediaType type; // Enum: IMAGE, VIDEO

    private Long size; // Bytes

    private Integer width;

    private Integer height;

    private Double duration; // videos

    @Column(name = "alt_text", columnDefinition = "TEXT")
    private String alt;

    @Column(name = "caption", columnDefinition = "TEXT")
    private String caption;

    @Column(name = "created_at")
    @CreatedDate
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    @LastModifiedDate
    private LocalDateTime updatedAt;

    // DEFAULT CONSTRUCTOR----------------------------------------------------------------------------------------
    @Deprecated
    public Media() {}

    // BUILDER----------------------------------------------------------------------------------------------------
    private Media(Builder builder) {
        this.folder = builder.folder;
        this.publicId = builder.publicId;
        this.url = builder.url;
        this.extension = builder.extension;
        this.type = builder.type;
        this.size = builder.size;
        this.width = builder.width;
        this.height = builder.height;
        this.duration = builder.duration;
        this.alt = builder.alt;
        this.caption = builder.caption;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private MediaFolder folder;
        private String publicId;
        private String url;
        private String extension;
        private MediaType type;
        private Long size;
        private Integer width;
        private Integer height;
        private Double duration;
        private String alt;
        private String caption;

        public Builder folder(MediaFolder folder) {
            this.folder = folder;
            return this;
        }

        public Builder publicId(String publicId) {
            this.publicId = publicId;
            return this;
        }

        public Builder url(String url) {
            this.url = url;
            return this;
        }

        public Builder extension(String extension) {
            this.extension = extension;
            return this;
        }

        public Builder type(MediaType type) {
            this.type = type;
            return this;
        }

        public Builder size(Long size) {
            this.size = size;
            return this;
        }

        public Builder width(Integer width) {
            this.width = width;
            return this;
        }

        public Builder height(Integer height) {
            this.height = height;
            return this;
        }

        public Builder duration(Double duration) {
            this.duration = duration;
            return this;
        }

        public Builder alt(String alt) {
            this.alt = alt;
            return this;
        }

        public Builder caption(String caption) {
            this.caption = caption;
            return this;
        }

        public Media build() { return new Media(this); }
    }

    // GETTERS / SETTERS------------------------------------------------------------------------------------------
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public String getPublicId() { return publicId; }
    public void setPublicId(String publicId) { this.publicId = publicId; }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }

    public String getExtension() { return extension; }
    public void setExtension(String extension) { this.extension = extension; }

    public MediaType getType() { return type; }
    public void setType(MediaType type) { this.type = type; }

    public MediaFolder getFolder() { return folder; }
    public void setFolder(MediaFolder folder) { this.folder = folder; }

    public Long getSize() { return size; }
    public void setSize(Long size) { this.size = size; }

    public Integer getWidth() { return width; }
    public void setWidth(Integer width) { this.width = width; }

    public Integer getHeight() { return height; }
    public void setHeight(Integer height) { this.height = height; }

    public Double getDuration() { return duration; }
    public void setDuration(Double duration) { this.duration = duration; }

    public String getAlt() { return alt; }
    public void setAlt(String alt) { this.alt = alt; }

    public String getCaption() { return caption; }
    public void setCaption(String caption) { this.caption = caption; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
