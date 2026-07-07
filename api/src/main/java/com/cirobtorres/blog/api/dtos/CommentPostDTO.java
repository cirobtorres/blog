package com.cirobtorres.blog.api.dtos;

import java.util.UUID;

public record CommentPostDTO(
        UUID userId,
        UUID articleId,
        UUID parentId,
        String body
) {}
