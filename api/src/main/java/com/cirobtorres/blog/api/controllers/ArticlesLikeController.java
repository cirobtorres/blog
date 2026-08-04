package com.cirobtorres.blog.api.controllers;

import com.cirobtorres.blog.api.dtos.ArticleLikeDTO;
import com.cirobtorres.blog.api.services.ArticlesService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @PostMapping("articleId/{articleId}")
    public ResponseEntity<ArticleLikeDTO> likeArticle(
            @PathVariable UUID articleId,
            @AuthenticationPrincipal Jwt jwt
    ) {
        UUID userId = UUID.fromString(jwt.getSubject());
        ArticleLikeDTO likeCount = articlesService.likeArticle(articleId, userId);
        return ResponseEntity.ok(likeCount);
    }
}
