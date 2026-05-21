package com.cirobtorres.blog.api.comment.dtos;

import java.util.UUID;

public record CommentPutDTO(
        UUID identityId,
        UUID articleId,
        UUID parentId,
        String body
) {}
