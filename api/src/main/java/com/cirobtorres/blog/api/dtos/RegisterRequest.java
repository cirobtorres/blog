package com.cirobtorres.blog.api.dtos;

public record RegisterRequest(
        String name,
        String email,
        String password
) {}
