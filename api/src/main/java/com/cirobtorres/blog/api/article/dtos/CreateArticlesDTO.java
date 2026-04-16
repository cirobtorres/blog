package com.cirobtorres.blog.api.article.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.Set;
import java.util.UUID;

public record CreateArticlesDTO(
        @NotBlank(message = "Must be an user") UUID userId,
        @NotBlank(message = "Title required") String title,
        @NotBlank(message = "Subtitle required") String subtitle,
        @NotBlank(message = "Slug required") String slug,
        @NotBlank(message = "At least one tag is required") Set<UUID> tags,
        @NotNull(message = "Banner media id required") UUID banner,
        String body
) {}
