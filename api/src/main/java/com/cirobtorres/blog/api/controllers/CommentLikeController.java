package com.cirobtorres.blog.api.controllers;

import com.cirobtorres.blog.api.dtos.CommentLikeDTO;
import com.cirobtorres.blog.api.dtos.CommentLikeRequestDTO;
import com.cirobtorres.blog.api.services.CommentLikeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

@RestController
@RequestMapping("comments/like")
public class CommentLikeController {
    private final CommentLikeService commentLikeService;

    public CommentLikeController(CommentLikeService commentLikeService) {
        this.commentLikeService = commentLikeService;
    }

    @Deprecated(forRemoval = true)
    @PostMapping("{commentId}")
    public ResponseEntity<CommentLikeDTO> toggleLike(
            @PathVariable UUID commentId,
            @RequestBody CommentLikeRequestDTO commentLikeDTO,
            @AuthenticationPrincipal Jwt jwt
    ) {
        if (commentLikeDTO.liked() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "liked is required");
        }
        UUID userId = UUID.fromString(jwt.getSubject());
         CommentLikeDTO likeCount = commentLikeService.toggleLike(commentId, userId);
        return ResponseEntity.ok(likeCount);
    }

    @PutMapping("{commentId}")
    public ResponseEntity<CommentLikeDTO> setLike(
            @PathVariable UUID commentId,
            @RequestBody CommentLikeRequestDTO commentLikeDTO,
            @AuthenticationPrincipal Jwt jwt
    ) {
        if (commentLikeDTO.liked() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "liked is required");
        }
        UUID userId = UUID.fromString(jwt.getSubject());
        CommentLikeDTO likeCount = commentLikeService.setLike(commentId, userId, commentLikeDTO.liked());
        return ResponseEntity.ok(likeCount);
    }
}
