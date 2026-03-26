package com.cirobtorres.blog.api.mediaFolder.entities;

import com.cirobtorres.blog.api.media.entities.Media;
import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "media_folders")
@EntityListeners(AuditingEntityListener.class)
public class MediaFolder {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String path;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private MediaFolder parent;

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MediaFolder> subfolders = new ArrayList<>();

    @OneToMany(mappedBy = "folder")
    private List<Media> files = new ArrayList<>();

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    // DEFAULT CONSTRUCTOR----------------------------------------------------------------------------------------
    public MediaFolder() {}

    // BUILDER----------------------------------------------------------------------------------------------------
    private MediaFolder(Builder builder) {
        this.name = builder.name;
        this.path = builder.path;
        this.parent = builder.parent;
        if (builder.subfolders != null) this.subfolders = builder.subfolders;
        if (builder.files != null) this.files = builder.files;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private String name;
        private String path;
        private MediaFolder parent;
        private List<MediaFolder> subfolders = new ArrayList<>();
        private List<Media> files = new ArrayList<>();

        public Builder name(String name) {
            this.name = name;
            return this;
        }

        public Builder path(String path) {
            this.path = path;
            return this;
        }

        public Builder parent(MediaFolder parent) {
            this.parent = parent;
            return this;
        }

        public Builder subfolders(List<MediaFolder> subfolders) {
            this.subfolders = subfolders;
            return this;
        }

        public Builder files(List<Media> files) {
            this.files = files;
            return this;
        }

        public MediaFolder build() { return new MediaFolder(this); }
    }

    // HELPERS----------------------------------------------------------------------------------------------------
    public void addSubfolder(MediaFolder folder) {
        this.subfolders.add(folder);
        folder.setParent(this);
    }

    public void addFile(Media file) {
        this.files.add(file);
        file.setFolder(this);
    }

    // GETTERS / SETTERS------------------------------------------------------------------------------------------
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getPath() { return path; }
    public void setPath(String path) { this.path = path; }

    public MediaFolder getParent() { return parent; }
    public void setParent(MediaFolder parent) { this.parent = parent; }

    public List<MediaFolder> getSubfolders() { return subfolders; }
    public void setSubfolders(List<MediaFolder> subfolders) { this.subfolders = subfolders; }

    public List<Media> getFiles() { return files; }
    public void setFiles(List<Media> files) { this.files = files; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}