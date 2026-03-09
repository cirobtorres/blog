package com.cirobtorres.blog.api.user.dtos;

import jakarta.validation.constraints.NotBlank;

public record UserPasswordDTO(
        @NotBlank(message = "Required") String password
) {}
