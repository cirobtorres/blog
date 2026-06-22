package com.cirobtorres.blog.api.dtos;

import jakarta.validation.constraints.NotBlank;

public record MediaPutDTO(
        @NotBlank String name,
        @NotBlank MediaFolderDTO folder,
        String alt,
        String caption
) {}
