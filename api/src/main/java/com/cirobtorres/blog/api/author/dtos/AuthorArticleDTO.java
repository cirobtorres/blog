package com.cirobtorres.blog.api.author.dtos;

import com.cirobtorres.blog.api.author.entities.Author;

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
