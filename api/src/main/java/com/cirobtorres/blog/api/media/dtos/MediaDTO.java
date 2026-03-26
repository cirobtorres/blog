package com.cirobtorres.blog.api.media.dtos;

import com.cirobtorres.blog.api.media.enums.MediaType;
import com.cirobtorres.blog.api.mediaFolder.dtos.MediaFolderDTO;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.util.UUID;

public record MediaDTO(
        UUID id,
        @NotBlank String name,
        @NotBlank MediaFolderDTO folder,
        @NotBlank String publicId,
        @NotBlank String url,
        @NotBlank String extension,
        @NotNull MediaType type,
        @Positive Long size,
        Integer width, // NULLABLE (audio)
        Integer height, // NULLABLE (audio)
        Double duration, // NULLABLE (video)
        String alt,
        String caption
) {}
