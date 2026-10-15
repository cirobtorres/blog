package com.cirobtorres.blog.api.repositories;

import com.cirobtorres.blog.api.entities.CommentLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

public interface CommentLikeRepository extends JpaRepository<CommentLike, UUID> {
    Optional<CommentLike> findByCommentIdAndUserId(UUID commentId, UUID userId);

    @Query("""
    SELECT cl.comment.id FROM CommentLike cl
    WHERE cl.user.id = :userId AND cl.comment.id IN :commentIds
    """)
    Set<UUID> findLikedCommentIdsByUserIdAndCommentIds(
            @Param("userId") UUID userId,
            @Param("commentIds") Collection<UUID> commentIds
    );

    @Modifying
    @Query(value = """
        INSERT INTO comments_likes (id, comment_id, user_id, created_at)
        VALUES (gen_random_uuid(), :commentId, :userId, now())
        ON CONFLICT (comment_id, user_id) DO NOTHING
        """, nativeQuery = true)
    int insertIfAbsent(@Param("commentId") UUID commentId, @Param("userId") UUID userId);

    @Modifying
    @Query("DELETE FROM CommentLike l WHERE l.comment.id = :commentId AND l.user.id = :userId")
    int deleteIfPresent(@Param("commentId") UUID commentId, @Param("userId") UUID userId);
}
