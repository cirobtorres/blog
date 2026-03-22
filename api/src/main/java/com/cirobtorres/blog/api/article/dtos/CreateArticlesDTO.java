package com.cirobtorres.blog.api.article.dtos;

import com.cirobtorres.blog.api.media.entities.Media;

public record CreateArticlesDTO(
        String title,
        String subtitle,
        String body,
        String slug,
        Media media
) {}
