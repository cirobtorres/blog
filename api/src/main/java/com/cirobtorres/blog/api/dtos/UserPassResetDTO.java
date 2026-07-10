package com.cirobtorres.blog.api.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UserPassResetDTO(
        @NotBlank @Email String email
) {
}
