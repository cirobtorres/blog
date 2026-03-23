package com.cirobtorres.blog.api.jwt.dtos;

public record TokensDTO(
        String accessToken,
        String refreshToken
) {}
