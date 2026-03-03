package com.cirobtorres.blog.api.user.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UserLoginDTO(
        @NotBlank(message = "Required") @Email String email,
        @NotBlank(message = "Required") String password
) {}
