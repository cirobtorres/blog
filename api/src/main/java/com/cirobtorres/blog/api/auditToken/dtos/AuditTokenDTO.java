package com.cirobtorres.blog.api.auditToken.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record AuditTokenDTO(
        @NotBlank(message = "Token cannot be empty.")
        @Size(min = 6, max = 6, message = "Token must have 6 characters exactly.")
        @Pattern(
                regexp = "^[A-Z0-9]{6}$",
                message = "Token accept only numbers."
        )
        String token
) {}
