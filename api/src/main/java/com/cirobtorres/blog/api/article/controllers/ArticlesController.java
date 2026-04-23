package com.cirobtorres.blog.api.article.controllers;

import com.cirobtorres.blog.api.article.dtos.*;
import com.cirobtorres.blog.api.article.services.ArticlesService;
import org.jspecify.annotations.NonNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("articles")
public class ArticlesController {
    private final ArticlesService articlesService;

    public ArticlesController(
            ArticlesService articlesService
    ) {
        this.articlesService = articlesService;
    }

    // GET----------------------------------------------------------------------------------------------------
    @GetMapping("/{year}/{month}/{day}/{slug}")
    public ResponseEntity<ArticleDTO> getArticlePage(
            @PathVariable int year,
            @PathVariable int month,
            @PathVariable int day,
            @PathVariable String slug
    ) {
        return ResponseEntity.ok(articlesService.getByUrlMetadata(year, month, day, slug));
    }

    @GetMapping
    public ResponseEntity<Page<ArticleDTO>> getAllByQueryParams(
            @RequestParam(name = "q", required = false) String query,
            @RequestParam Map<String, String> allParams,
            @PageableDefault(size = 20, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable
    ) {
        return ResponseEntity.ok(articlesService.getAllByQueryParams(query, allParams, pageable));
    }

    @GetMapping("slug")
    public ResponseEntity<List<String>> getAllSlug() {
        List<String> slugs = articlesService.getAllSlugs();
        return ResponseEntity.ok(slugs);
    }

    @GetMapping("id/{id}")
    public ResponseEntity<ArticleDTO> getById(
            @PathVariable UUID id
    ) {
        return ResponseEntity.ok(articlesService.getById(id));
    }

    @GetMapping("slug/{slug}")
    public ResponseEntity<ArticleDTO> getBySlug(
            @PathVariable @NonNull ArticleSlugDTO slug
    ) {
        ArticleDTO article = articlesService.getBySlug(slug);
        return ResponseEntity.ok(article);
    }

    // POST---------------------------------------------------------------------------------------------------
    @PostMapping
    public ResponseEntity<ArticleDTO> createArticle(
            @RequestBody ArticleSaveDTO createArticleDTO
    ) {
        ArticleDTO article = articlesService.createArticle(createArticleDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(article);
    }

    // PUT----------------------------------------------------------------------------------------------------
    @PutMapping("id/{id}")
    public ResponseEntity<ArticleDTO> putArticle(
            @RequestBody ArticleSaveDTO createArticleDTO
    ) {
        ArticleDTO article = articlesService.putArticle(createArticleDTO);
        return ResponseEntity.ok(article);
    }

    // DELETE-------------------------------------------------------------------------------------------------
    @DeleteMapping("id/{id}")
    public ResponseEntity<ArticleDTO> deleteArticle(
            @PathVariable String id
    ) {
        // TODO
        return ResponseEntity.noContent().build();
    }
}
