package com.cirobtorres.blog.api.dtos;

public record TokensDTO(
        String accessToken,
        String refreshToken
) {}
