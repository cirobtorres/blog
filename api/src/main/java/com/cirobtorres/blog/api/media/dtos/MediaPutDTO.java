package com.cirobtorres.blog.api.media.dtos;

import com.cirobtorres.blog.api.mediaFolder.dtos.MediaFolderDTO;
import jakarta.validation.constraints.NotBlank;

public record MediaPutDTO(
        @NotBlank String name,
        @NotBlank MediaFolderDTO folder,
        String alt,
        String caption
) {}
