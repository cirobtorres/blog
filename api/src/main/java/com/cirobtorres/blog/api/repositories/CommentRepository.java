package com.cirobtorres.blog.api.repositories;

import com.cirobtorres.blog.api.entities.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface CommentRepository extends JpaRepository<Comment, UUID> {
    Page<Comment> findAll(Specification<Comment> spec, Pageable pageable);

    @Query(value = """
        SELECT c.* FROM comments c
        INNER JOIN (
        SELECT id, ROW_NUMBER() OVER (PARTITION BY parent_id ORDER BY like_count DESC, created_at DESC) as rn
        FROM comments
        WHERE parent_id IN :parentIds AND is_deleted = false AND is_blocked = false
        ) ranked ON c.id = ranked.id
        WHERE ranked.rn <= :repliesLimit
        ORDER BY c.parent_id, c.like_count DESC, c.created_at DESC
    """, nativeQuery = true)
    List<Comment> findTopRepliesByParentIds(
            @Param("parentIds") List<UUID> parentIds,
            @Param("repliesLimit") int repliesLimit
    );
}
