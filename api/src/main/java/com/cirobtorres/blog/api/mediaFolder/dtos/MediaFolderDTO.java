package com.cirobtorres.blog.api.mediaFolder.dtos;

import jakarta.validation.constraints.NotBlank;

public record MediaFolderDTO(
        @NotBlank String path
) {}
