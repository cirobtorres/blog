package com.cirobtorres.blog.api.controllers;

import com.cirobtorres.blog.api.dtos.ArticleLikeDTO;
import com.cirobtorres.blog.api.dtos.ArticleLikeRequestDTO;
import com.cirobtorres.blog.api.services.ArticlesService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

@RestController
@RequestMapping("articles/like")
public class ArticlesLikeController {
    private final ArticlesService articlesService;

    public ArticlesLikeController(
            ArticlesService articlesService
    ) {
        this.articlesService = articlesService;
    }

    @Deprecated(forRemoval = true)
    @PostMapping("articleId/{articleId}")
    public ResponseEntity<ArticleLikeDTO> likeArticle(
            @PathVariable UUID articleId,
            @AuthenticationPrincipal Jwt jwt
    ) {
        UUID userId = UUID.fromString(jwt.getSubject());
        ArticleLikeDTO likeCount = articlesService.likeArticle(articleId, userId);
        return ResponseEntity.ok(likeCount);
    }

    @PutMapping("articleId/{articleId}")
    public ResponseEntity<ArticleLikeDTO> setLike(
            @PathVariable UUID articleId,
            @RequestBody ArticleLikeRequestDTO articleLikeRequestDTO,
            @AuthenticationPrincipal Jwt jwt
    ) {
        if (articleLikeRequestDTO.liked() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "liked is required");
        }
        UUID userId = UUID.fromString(jwt.getSubject());
        ArticleLikeDTO likeCount = articlesService.setLike(articleId, userId, articleLikeRequestDTO.liked());
        return ResponseEntity.ok(likeCount);
    }
}
