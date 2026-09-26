package com.cirobtorres.blog.api.dtos;

import com.cirobtorres.blog.api.enums.ArticlesStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.Set;
import java.util.UUID;

public record ArticleSaveDTO(
        UUID id,
        @NotNull(message = "Must be an user") UUID userId,
        @NotBlank(message = "Title required") String title,
        @NotBlank(message = "Subtitle required") String subtitle,
        @NotBlank(message = "Slug required") String slug,
        @NotEmpty(message = "At least one tag is required") Set<UUID> tags,
        @NotNull(message = "Banner media id required") UUID banner,
        ArticlesStatus status,
        String body
) {}
