package com.cirobtorres.blog.api.controllers;

import com.cirobtorres.blog.api.dtos.CommentLikeDTO;
import com.cirobtorres.blog.api.services.CommentLikeService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("comments/like")
public class CommentLikeController {
    private final CommentLikeService commentLikeService;

    public CommentLikeController(CommentLikeService commentLikeService) {
        this.commentLikeService = commentLikeService;
    }

    @PostMapping("{commentId}")
    public ResponseEntity<CommentLikeDTO> toggleLike(
            @PathVariable UUID commentId,
            @AuthenticationPrincipal Jwt jwt
    ) {
        UUID userId = UUID.fromString(jwt.getSubject());
        CommentLikeDTO likeCount = commentLikeService.toggleLike(commentId, userId);
        return ResponseEntity.ok(likeCount);
    }
}
