package com.cirobtorres.blog.api.comment.services;

import com.cirobtorres.blog.api.article.entities.Articles;
import com.cirobtorres.blog.api.article.repositories.ArticlesRepository;
import com.cirobtorres.blog.api.comment.dtos.CommentDTO;
import com.cirobtorres.blog.api.comment.dtos.CommentPostDTO;
import com.cirobtorres.blog.api.comment.entities.Comment;
import com.cirobtorres.blog.api.comment.repositories.CommentRepository;
import com.cirobtorres.blog.api.exceptions.UserUnauthorizedException;
import com.cirobtorres.blog.api.user.entities.User;
import com.cirobtorres.blog.api.user.repositories.UserRepository;
import com.cirobtorres.blog.api.userIdentity.entities.UserIdentity;
import com.cirobtorres.blog.api.userIdentity.repositories.UserIdentityRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final UserIdentityRepository userIdentityRepository;
    private final ArticlesRepository articlesRepository;

    public CommentService(
            CommentRepository commentRepository,
            UserRepository userRepository,
            UserIdentityRepository userIdentityRepository,
            ArticlesRepository articlesRepository
    ) {
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
        this.userIdentityRepository = userIdentityRepository;
        this.articlesRepository = articlesRepository;
    }

    @Transactional
    public Page<CommentDTO> getAllByQueryParams(UUID articleId, Map<String, String> allParams, Pageable pageable) {
        int limit = allParams.containsKey("limit") ? Integer.parseInt(allParams.get("limit")) : pageable.getPageSize();
        int repliesLimit = allParams.containsKey("repliesLimit") ? Integer.parseInt(allParams.get("repliesLimit")) : 5;

        Pageable customizedPageable = PageRequest.of(
                pageable.getPageNumber(),
                limit,
                Sort.by(Sort.Direction.DESC, "likeCount").and(Sort.by(Sort.Direction.DESC, "createdAt"))
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

        return rootCommentsPage.map(CommentDTO::new);
    }

    @Transactional
    public CommentDTO postComment(CommentPostDTO request) {
        UserIdentity identity = userIdentityRepository.findById(request.identityId())
                .orElseThrow(() -> new IllegalArgumentException("Identity not found: id=" + request.identityId()));

        Articles article = articlesRepository.findById(request.articleId())
                .orElseThrow(() -> new IllegalArgumentException("Article not found: id=" + request.articleId()));

        Comment parentComment = null;
        if (request.parentId() != null) {
            parentComment = commentRepository.findById(request.parentId())
                    .orElseThrow(() -> new IllegalArgumentException("Parent comment not found: id=" + request.parentId()));
        }

        Comment comment = new Comment.Builder()
                .userIdentity(identity)
                .article(article)
                .parent(parentComment)
                .body(request.body())
                .build();

        Comment savedComment = commentRepository.save(comment);

        return new CommentDTO(savedComment);
    }

    @Transactional
    public void deleteComment(UUID id, UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found: id=" + userId));

        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Comment not found: id=" + id));

        if (!comment.getUser().getId().equals(user.getId())) {
            throw new UserUnauthorizedException("You do not own permission to delete the comment");
        }

        comment.setDeleted(true);
        comment.setDeletedAt(LocalDateTime.now());
        Comment deletedComment = commentRepository.save(comment);
    }
}
