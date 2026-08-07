package com.cirobtorres.blog.api.services;

import com.cirobtorres.blog.api.entities.Articles;
import com.cirobtorres.blog.api.repositories.ArticlesRepository;
import com.cirobtorres.blog.api.dtos.CommentDTO;
import com.cirobtorres.blog.api.dtos.CommentPostDTO;
import com.cirobtorres.blog.api.dtos.CommentPutDTO;
import com.cirobtorres.blog.api.entities.Comment;
import com.cirobtorres.blog.api.repositories.CommentLikeRepository;
import com.cirobtorres.blog.api.repositories.CommentRepository;
import com.cirobtorres.blog.api.exceptions.UserUnauthorizedException;
import com.cirobtorres.blog.api.entities.User;
import com.cirobtorres.blog.api.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final ArticlesRepository articlesRepository;
    private final CommentLikeRepository commentLikeRepository;
    private static final Logger log = LoggerFactory.getLogger(CommentService.class);

    public CommentService(
            CommentRepository commentRepository,
            UserRepository userRepository,
            ArticlesRepository articlesRepository,
            CommentLikeRepository commentLikeRepository
    ) {
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
        this.articlesRepository = articlesRepository;
        this.commentLikeRepository = commentLikeRepository;
    }

    public Comment findCommentById(UUID id) {
        return commentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Comment not found"));
    }

    @Transactional
    public Page<CommentDTO> getAllByQueryParams(UUID userId, UUID articleId, Map<String, String> allParams, Pageable pageable) {
        int limit = allParams.containsKey("limit") ? Integer.parseInt(allParams.get("limit")) : pageable.getPageSize();
        int repliesLimit = allParams.containsKey("repliesLimit") ? Integer.parseInt(allParams.get("repliesLimit")) : 5;

        Pageable customizedPageable = PageRequest.of(
                pageable.getPageNumber(),
                limit,
                Sort.by(Sort.Direction.DESC, "likeCount")
                        .and(Sort.by(Sort.Direction.DESC, "createdAt"))
        );

        Specification<Comment> spec = (root, query, cb) -> cb.and(
                cb.equal(root.get("article").get("id"), articleId),
                cb.isNull(root.get("parent"))
        );

        List<String> filterableFields = List.of("isDeleted", "isBlocked");
        for (String field : filterableFields) {
            String val = allParams.get(field);
            if (val != null && !val.isBlank()) {
                spec = spec.and((root, query, cb) -> cb.equal(root.get(field), Boolean.parseBoolean(val)));
            }
        }

        Page<Comment> rootCommentsPage = commentRepository.findAll(spec, customizedPageable);

        if (rootCommentsPage.isEmpty()) {
            return Page.empty(customizedPageable);
        }

        List<UUID> rootIds = rootCommentsPage.getContent().stream()
                .map(Comment::getId)
                .collect(Collectors.toList());

        List<Comment> allReplies = commentRepository.findTopRepliesByParentIds(rootIds, repliesLimit);

        allReplies.forEach(reply -> {
            Comment parent = reply.getParent();
            if (parent != null) {
                parent.getChildren().add(reply);
            }
        });

        Set<UUID> likedCommentIds = Set.of();

        if (userId != null) {
            Set<UUID> allCommentIds = new HashSet<>();
            rootCommentsPage.forEach(root -> collectAllCommentIds(root, allCommentIds));

            likedCommentIds = commentLikeRepository.findLikedCommentIdsByUserIdAndCommentIds(userId, allCommentIds);
        }

        final Set<UUID> finalLikedCommentIds = likedCommentIds;

        return rootCommentsPage.map(comment -> new CommentDTO(comment, finalLikedCommentIds));
    }

    private void collectAllCommentIds(Comment comment, Set<UUID> accumulator) {
        if (comment == null) return;

        accumulator.add(comment.getId());

        if (comment.getChildren() != null && !comment.getChildren().isEmpty()) {
            for (Comment child : comment.getChildren()) {
                collectAllCommentIds(child, accumulator);
            }
        }
    }

    @Transactional
    public long countVisibleCommentsByArticleId(UUID articleId) {
        return commentRepository.countVisibleCommentsByArticleId(articleId);
    }

    @Transactional
    public CommentDTO postComment(CommentPostDTO request) {
        User user = userRepository.findById(request.userId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Articles article = articlesRepository.findById(request.articleId())
                .orElseThrow(() -> new IllegalArgumentException("Article not found"));

        Comment parentComment = null;
        if (request.parentId() != null) {
            parentComment = commentRepository.findById(request.parentId())
                    .orElseThrow(() -> new IllegalArgumentException("Parent comment not found"));
        }

        Comment comment = new Comment.Builder()
                .user(user)
                .article(article)
                .parent(parentComment)
                .body(request.body())
                .build();

        Comment savedComment = commentRepository.save(comment);
        article.setCommentCountPlusOne();
        articlesRepository.save(article);
        return new CommentDTO(savedComment);
    }

    @Transactional
    public void deleteComment(UUID id, UUID userId) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Comment not found"));

        if (!comment.getUser().getId().equals(userId)) {
            throw new UserUnauthorizedException("You do not have permission to delete this comment");
        }

        comment.setDeleted(true);
        comment.setDeletedAt(LocalDateTime.now());
        commentRepository.save(comment);
        Articles article = comment.getArticle();
        article.setCommentCountMinusOne();
        articlesRepository.save(article);
    }

    @Transactional
    public CommentDTO putComment(UUID commentId, CommentPutDTO request) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("Comment not found"));

        if (comment.getUser() == null || !comment.getUser().getId().equals(request.userId())) {
            throw new UserUnauthorizedException("Unauthorized");
        }

        if (comment.getArticle() == null || !comment.getArticle().getId().equals(request.articleId())) {
            throw new UserUnauthorizedException("Unauthorized");
        }

        if (!isSameParent(comment.getParent(), request.parentId())) {
            throw new UserUnauthorizedException("Unauthorized");
        }

        comment.setBody(request.body());
        Comment savedComment = commentRepository.save(comment);
        return new CommentDTO(savedComment);
    }

    private boolean isSameParent(Comment parentEntity, UUID requestParentId) {
        if (parentEntity == null && requestParentId == null) return true;
        if (parentEntity != null && requestParentId != null) {
            return parentEntity.getId().equals(requestParentId);
        }
        return false;
    }

    private void collectAllCommentIds(Comment comment, List<UUID> accumulator) {
        accumulator.add(comment.getId());
        if (comment.getChildren() != null && !comment.getChildren().isEmpty()) {
            for (Comment child : comment.getChildren()) {
                collectAllCommentIds(child, accumulator);
            }
        }
    }
}
