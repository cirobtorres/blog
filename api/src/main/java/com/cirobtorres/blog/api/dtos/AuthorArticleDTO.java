package com.cirobtorres.blog.api.dtos;

import com.cirobtorres.blog.api.entities.Author;

public record AuthorArticleDTO(
        String name,
        String pictureUrl
) {
    public AuthorArticleDTO(Author author) {
        this(
                author.getName(),
                author.getPictureUrl()
        );
    }
}
