package com.cirobtorres.blog.api.token.dtos;

public record TokensDTO(
        String accessToken,
        String refreshToken
) {}
