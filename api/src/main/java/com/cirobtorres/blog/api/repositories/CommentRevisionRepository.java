package com.cirobtorres.blog.api.repositories;

import com.cirobtorres.blog.api.entities.CommentRevision;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CommentRevisionRepository extends JpaRepository<CommentRevision, UUID> {
    long countByCommentId(UUID commentId);
}
