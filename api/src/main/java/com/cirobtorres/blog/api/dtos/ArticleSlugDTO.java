package com.cirobtorres.blog.api.dtos;

import jakarta.validation.constraints.NotBlank;

public record ArticleSlugDTO(
        @NotBlank String slug
) {}
