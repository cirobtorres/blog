package com.cirobtorres.blog.api.comment.services;

import com.cirobtorres.blog.api.comment.dtos.CommentDTO;
import com.cirobtorres.blog.api.comment.entities.Comment;
import com.cirobtorres.blog.api.comment.repositories.CommentRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CommentService {
    private final CommentRepository commentRepository;

    public CommentService(
            CommentRepository commentRepository
    ) {
        this.commentRepository = commentRepository;
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
}
