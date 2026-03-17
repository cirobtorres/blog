package com.cirobtorres.blog.api.article.dtos;

public record CreateArticleDTO(
        String title,
        String subtitle,
        String body
) {}
