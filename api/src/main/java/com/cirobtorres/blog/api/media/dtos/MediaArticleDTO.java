package com.cirobtorres.blog.api.media.dtos;

import com.cirobtorres.blog.api.media.entities.Media;

public record MediaArticleDTO(
        String bannerUrl,
        String alt,
        String caption
) {
    public MediaArticleDTO(Media mediaEntity) {
        this(
                mediaEntity.getUrl(),
                mediaEntity.getAlt(),
                mediaEntity.getCaption()
        );
    }
}