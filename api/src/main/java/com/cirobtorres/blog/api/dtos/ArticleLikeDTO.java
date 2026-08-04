package com.cirobtorres.blog.api.dtos;

public record ArticleLikeDTO(
        boolean liked,
        int likeCount
) {}
