package com.cirobtorres.blog.api.dtos;

public record CommentLikeDTO(
        boolean liked,
        int likeCount
) {}
