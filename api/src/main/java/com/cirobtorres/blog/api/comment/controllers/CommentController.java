package com.cirobtorres.blog.api.comment.controllers;

import com.cirobtorres.blog.api.comment.dtos.CommentDTO;
import com.cirobtorres.blog.api.comment.repositories.CommentRepository;
import com.cirobtorres.blog.api.comment.services.CommentService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("comments")
public class CommentController {
    private final CommentService commentService;

    public CommentController(
            CommentService commentService
    ) {
        this.commentService = commentService;
    }

    // GET--------------------------------------------------------------------------------------------------------
    @GetMapping
    public ResponseEntity<Page<CommentDTO>> getComments(
            @RequestParam UUID articleId,
            @RequestParam Map<String, String> allParams,
            @PageableDefault(size = 20, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable

    ) {
        // params: limit, repliesLimit
        Page<CommentDTO> comments = commentService
                .getAllByQueryParams(articleId, allParams, pageable);
        return ResponseEntity.ok(comments);
    }

    @GetMapping("id/{id}")
    public ResponseEntity<Void> getComment(
            @PathVariable String id
    ) {
        return ResponseEntity.noContent().build();
    }

    // POST-------------------------------------------------------------------------------------------------------
    @PostMapping
    public ResponseEntity<Void> postComment() {
        return ResponseEntity.noContent().build();
    }

    // PUT--------------------------------------------------------------------------------------------------------
    @PutMapping("id/{id}")
    public ResponseEntity<Void> putComment() {
        return ResponseEntity.noContent().build();
    }

    // DELETE-----------------------------------------------------------------------------------------------------
    @DeleteMapping("id/{id}")
    public ResponseEntity<Void> deleteComment() {
        return ResponseEntity.noContent().build();
    }
}
