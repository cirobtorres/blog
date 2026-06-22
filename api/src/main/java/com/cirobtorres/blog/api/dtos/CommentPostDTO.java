package com.cirobtorres.blog.api.dtos;

import java.util.UUID;

public record CommentPostDTO(
        UUID identityId,
        UUID articleId,
        UUID parentId,
        String body
) {}
