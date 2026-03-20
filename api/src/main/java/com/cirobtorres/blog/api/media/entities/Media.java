package com.cirobtorres.blog.api.media.entities;

import com.cirobtorres.blog.api.media.enums.MediaType;
import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "media")
public class Media {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String name;

    private String folder; // Folder path (ex: "blender/renders")

    @Column(nullable = false, unique = true)
    private String publicId;

    @Column(nullable = false)
    private String url;

    @Column(nullable = false)
    private String extension; // jpg, mp4, wav

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MediaType type; // Enum: IMAGE, VIDEO, AUDIO

    private Long size; // Bytes

    private Integer width; // Audio = NULLABLE

    private Integer height; // Audio = NULLABLE

    private Double duration; // Audio/videos

    @Column(name = "alt_text")
    private String alt;

    @Column(name = "created_at")
    @CreatedDate
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    @LastModifiedDate
    private LocalDateTime updatedAt;

    // DEFAULT CONSTRUCTOR----------------------------------------------------------------------------------------
    public Media() {}

    // BUILDER----------------------------------------------------------------------------------------------------
    private Media(Builder builder) {
        this.name = builder.name;
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
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private String name;
        private String folder;
        private String publicId;
        private String url;
        private String extension;
        private MediaType type;
        private Long size;
        private Integer width;
        private Integer height;
        private Double duration;
        private String alt;

        public Builder name(String name) {
            this.name = name;
            return this;
        }

        public Builder folder(String folder) {
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

        public Media build() { return new Media(this); }
    }

    // GETTERS / SETTERS------------------------------------------------------------------------------------------
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getPublicId() { return publicId; }
    public void setPublicId(String publicId) { this.publicId = publicId; }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }

    public String getExtension() { return extension; }
    public void setExtension(String extension) { this.extension = extension; }

    public MediaType getType() { return type; }
    public void setType(MediaType type) { this.type = type; }

    public String getFolder() { return folder; }
    public void setFolder(String folder) { this.folder = folder; }

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

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}