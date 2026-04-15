package com.cirobtorres.blog.api.tag.dtos;

import com.cirobtorres.blog.api.tag.entities.Tag;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDateTime;
import java.util.UUID;

public record TagDTO(
        @NotBlank(message = "Id is required") UUID id,
        @NotBlank(message = "Name is required") String name,
        @NotBlank(message = "Slug is required") String slug,
        LocalDateTime updatedAt,
        LocalDateTime createdAt
) {
    public TagDTO(Tag entity) {
        this(
                entity.getId(),
                entity.getName(),
                entity.getSlug(),
                entity.getUpdatedAt(),
                entity.getCreatedAt()
        );
    }
}
