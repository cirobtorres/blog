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
    public ResponseEntity<ArticleCreateDTO> createArticle(
            @RequestBody CreateArticlesDTO createArticleDTO
    ) {
        ArticleCreateDTO article = articlesService.createArticle(createArticleDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(article);
    }

    @GetMapping("/{year}/{month}/{day}/{slug}")
    public ResponseEntity<ArticleDTO> getArticlePage(
            @PathVariable int year,
            @PathVariable int month,
            @PathVariable int day,
            @PathVariable String slug
    ) {
        return ResponseEntity.ok(articlesService.findByUrlMetadata(year, month, day, slug));
    }

    @GetMapping
    public ResponseEntity<Page<ArticlesDTO>> listAllByQueryParams(
            @RequestParam(name = "q", required = false) String query,
            @RequestParam Map<String, String> allParams,
            @PageableDefault(size = 20, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable
    ) {
        return ResponseEntity.ok(articlesService.listPublishedPaged(query, allParams, pageable));
    }

    @GetMapping("slug")
    public ResponseEntity<List<String>> getAllBySlug() {
        List<String> slugs = articlesService.findAllSlugs();
        return ResponseEntity.ok(slugs);
    }

    @GetMapping("slug/{slug}")
    public ResponseEntity<ArticleDTO> getBySlug(
            @PathVariable @NonNull ArticleSlugDTO slug
    ) {
        System.out.println("slug=" + slug.slug());
        ArticleDTO article = articlesService.findBySlug(slug);
        return ResponseEntity.ok(article);
    }
}
