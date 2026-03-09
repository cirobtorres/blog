package com.cirobtorres.blog.api.auditToken.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record AuditTokenDTO(
        @NotBlank(message = "O token não pode estar vazio")
        @Size(min = 6, max = 6, message = "O token deve ter exatamente 6 caracteres")
        @Pattern(
                regexp = "^[A-Z0-9]{6}$",
                message = "O token deve conter apenas números e letras maiúsculas"
        )
        String token
) {}
