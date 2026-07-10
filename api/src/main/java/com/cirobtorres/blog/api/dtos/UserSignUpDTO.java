package com.cirobtorres.blog.api.dtos;

public record UserSignUpDTO(
        String name,
        String email,
        String password
) {}
