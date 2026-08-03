package com.cirobtorres.blog.api.services;

import com.cirobtorres.blog.api.dtos.CommentLikeDTO;
import com.cirobtorres.blog.api.entities.Comment;
import com.cirobtorres.blog.api.entities.CommentLike;
import com.cirobtorres.blog.api.entities.User;
import com.cirobtorres.blog.api.repositories.CommentLikeRepository;
import com.cirobtorres.blog.api.repositories.CommentRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class CommentLikeService {
    private final CommentRepository commentRepository;
    private final CommentLikeRepository commentLikeRepository;
    private final CommentService commentService;
    private final UserService userService;

    public CommentLikeService(
            CommentRepository commentRepository,
            CommentLikeRepository commentLikeRepository,
            CommentService commentService,
            UserService userService
    ) {
        this.commentRepository = commentRepository;
        this.commentLikeRepository = commentLikeRepository;
        this.commentService = commentService;
        this.userService = userService;
    }

    @Transactional
    public CommentLikeDTO toggleLike(UUID commentId, UUID userId) {
        Comment comment = commentService.findCommentById(commentId);
        User user = userService.findUserById(userId);
        Optional<CommentLike> existsLike = commentLikeRepository.findByCommentIdAndUserId(commentId, userId);
        boolean liked;
        if (existsLike.isPresent()) {
            commentLikeRepository.delete(existsLike.get());
            comment.setLikeCount(Math.max(0, comment.getLikeCount() - 1));
            liked = false;
        } else {
            CommentLike newLike = new CommentLike.Builder()
                    .comment(comment)
                    .user(user)
                    .build();
            commentLikeRepository.save(newLike);
            comment.setLikeCount(comment.getLikeCount() + 1);
            liked = true;
        }
        commentRepository.save(comment);
        return new CommentLikeDTO(liked, comment.getLikeCount());
    }
}
