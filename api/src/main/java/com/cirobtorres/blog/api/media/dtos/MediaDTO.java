package com.cirobtorres.blog.api.media.dtos;

import com.cirobtorres.blog.api.media.entities.Media;
import com.cirobtorres.blog.api.media.enums.MediaType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record MediaDTO(
        @NotBlank String name,
        @NotBlank String folder,
        @NotBlank String publicId,
        @NotBlank String url,
        @NotBlank String extension,
        @NotNull MediaType type,
        @Positive Long size,
        Integer width, // NULLABLE (audio)
        Integer height, // NULLABLE (audio)
        Double duration, // NULLABLE (video)
        String alt
) {
    public Media toEntity() {
        return new Media
                .Builder()
                .name(this.name)
                .folder(this.folder)
                .publicId(this.publicId)
                .url(this.url)
                .extension(this.extension)
                .type(this.type)
                .size(this.size)
                .width(this.width)
                .height(this.height)
                .duration(this.duration)
                .alt(this.alt)
                .build();
    }
}
