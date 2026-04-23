package com.cirobtorres.blog.api.media.dtos;

import com.cirobtorres.blog.api.media.entities.Media;

import java.util.UUID;

public record MediaArticleDTO(
        UUID id,
        String url,
        String alt,
        String caption
) {
    public MediaArticleDTO(Media mediaEntity) {
        this(
                mediaEntity.getId(),
                mediaEntity.getUrl(),
                mediaEntity.getAlt(),
                mediaEntity.getCaption()
        );
    }
}