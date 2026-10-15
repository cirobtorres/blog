package com.cirobtorres.blog.api.entities;

import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(
        name = "comment_revisions",
        uniqueConstraints = @UniqueConstraint(
                name = "uk_comment_revision_number",
                columnNames = {"comment_id", "revision_number"}
        )
)
public class CommentRevision {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "comment_id", nullable = false, updatable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Comment comment;

    @Column(name = "revision_number", nullable = false, updatable = false)
    private int revisionNumber;

    @Column(name = "previous_body", nullable = false, updatable = false, columnDefinition = "TEXT")
    private String previousBody;

    @Column(name = "edited_by", nullable = false, updatable = false)
    private UUID editedBy;

    @Column(name = "edited_at", nullable = false, updatable = false)
    private LocalDateTime editedAt;

    // DEFAULT CONSTRUCTOR----------------------------------------------------------------------------------------
    @Deprecated
    protected CommentRevision() {}

    // BUILDER----------------------------------------------------------------------------------------------------
    private CommentRevision(Builder builder) {
        this.comment = builder.comment;
        this.revisionNumber = builder.revisionNumber;
        this.previousBody = builder.previousBody;
        this.editedBy = builder.editedBy;
        this.editedAt = builder.editedAt;
    }

    public static class Builder {
        private Comment comment;
        private int revisionNumber;
        private String previousBody;
        private UUID editedBy;
        private LocalDateTime editedAt;

        public Builder comment(Comment comment) { this.comment = comment; return this; }
        public Builder revisionNumber(int revisionNumber) { this.revisionNumber = revisionNumber; return this; }
        public Builder previousBody(String previousBody) { this.previousBody = previousBody; return this; }
        public Builder editedBy(UUID editedBy) { this.editedBy = editedBy; return this; }
        public Builder editedAt(LocalDateTime editedAt) { this.editedAt = editedAt; return this; }

        public CommentRevision build() { return new CommentRevision(this); }
    }

    // GETTERS / SETTERS------------------------------------------------------------------------------------------
    public UUID getId() { return id; }
    public Comment getComment() { return comment; }
    public int getRevisionNumber() { return revisionNumber; }
    public String getPreviousBody() { return previousBody; }
    public UUID getEditedBy() { return editedBy; }
    public LocalDateTime getEditedAt() { return editedAt; }
}