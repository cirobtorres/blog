package com.cirobtorres.blog.api.article.controllers;

import com.cirobtorres.blog.api.ApiApplicationProperties;
import com.cirobtorres.blog.api.article.dtos.CreateArticleDTO;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("articles")
public class ArticleController {
    private final boolean isProd;
    private static final Logger log = LoggerFactory.getLogger(ArticleController.class);

    public ArticleController(
            ApiApplicationProperties apiApplicationProperties
    ) {
        this.isProd = apiApplicationProperties.getApplication().isProduction();
    }

    @PostMapping
    public ResponseEntity<Void> createArticle(
            @RequestBody @Valid CreateArticleDTO createArticleDTO,
            Authentication auth,
            HttpServletResponse response
    ) {
        if (!isProd) log.info("ArticleController.createArticle(): createArticleDTO={}", createArticleDTO);
        if (!isProd) log.info("ArticleController.createArticle(): auth={}", auth);
        if (!isProd) log.info("ArticleController.createArticle(): response={}", response);
        if (!isProd) log.info("ArticleController.createArticle(): Article created!");
        return ResponseEntity.ok().build();
    }
}
