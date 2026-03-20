package com.cirobtorres.blog.api.article.controllers;

import com.cirobtorres.blog.api.ApiApplicationProperties;
import com.cirobtorres.blog.api.article.dtos.CreateArticlesDTO;
import com.cirobtorres.blog.api.article.entities.Articles;
import com.cirobtorres.blog.api.article.services.ArticlesService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("articles")
public class ArticlesController {
    private final boolean isProd;
    private final ArticlesService articlesService;
    private static final Logger log = LoggerFactory.getLogger(ArticlesController.class);

    public ArticlesController(
            ApiApplicationProperties apiApplicationProperties,
            ArticlesService articlesService
    ) {
        this.articlesService = articlesService;
        this.isProd = apiApplicationProperties.getApplication().isProduction();
    }

    @PostMapping
    public ResponseEntity<Articles> create(
            @RequestPart("data") CreateArticlesDTO createArticleDTO,
            Authentication auth,
            HttpServletResponse response
    ) {
        if (!isProd) log.info("ArticleController.createArticle(): createArticleDTO={}", createArticleDTO);
        if (!isProd) log.info("ArticleController.createArticle(): auth={}", auth);
        if (!isProd) log.info("ArticleController.createArticle(): response={}", response);

        Articles article = articlesService.createArticle(createArticleDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(article);
    }

    @GetMapping("/{slug}")
    public ResponseEntity<Articles> getBySlug(
            @PathVariable String slug
    ) {
        return ResponseEntity.ok(articlesService.findBySlug(slug));
    }
}
