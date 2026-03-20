package com.cirobtorres.blog.api.article.dtos;

public record CreateArticlesDTO(
        String title,
        String subtitle,
        String body,
        String slug,
        String bannerUrl
) {}
