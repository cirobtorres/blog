package com.cirobtorres.blog.api.article.dtos;

import java.util.UUID;

public record ArticleResponseDTO(
        UUID id,
        String title,
        String slug,
        String authorName
) {}