package com.cirobtorres.blog.api.article.controllers;

import com.cirobtorres.blog.api.article.dtos.ArticleResponseDTO;
import com.cirobtorres.blog.api.article.dtos.CreateArticlesDTO;
import com.cirobtorres.blog.api.article.entities.Articles;
import com.cirobtorres.blog.api.article.services.ArticlesService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("articles")
public class ArticlesController {
    private final ArticlesService articlesService;

    public ArticlesController(
            ArticlesService articlesService
    ) {
        this.articlesService = articlesService;
    }

    @PostMapping
    public ResponseEntity<ArticleResponseDTO> create(
            @RequestBody CreateArticlesDTO createArticleDTO
    ) {
        ArticleResponseDTO article = articlesService.createArticle(createArticleDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(article);
    }

    @GetMapping("/{slug}")
    public ResponseEntity<Articles> getBySlug(
            @PathVariable String slug
    ) {
        return ResponseEntity.ok(articlesService.findBySlug(slug));
    }
}
