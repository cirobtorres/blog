package com.cirobtorres.blog.api.article.dtos;

import java.util.UUID;

public record ArticleDTO(
        String title,
        String description,
        String content,
        String slug,
        UUID authorId
) {
}