package com.cirobtorres.blog.api.article.dtos;

import jakarta.validation.constraints.NotBlank;

public record ArticleSlugDTO(
        @NotBlank String slug
) {}
