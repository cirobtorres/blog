package com.cirobtorres.blog.api.dtos;

import java.util.UUID;

public record CommentPutDTO(
        UUID identityId,
        UUID articleId,
        UUID parentId,
        String body
) {}
