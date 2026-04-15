package com.cirobtorres.blog.api.tag.dtos;

import jakarta.validation.constraints.NotBlank;

public record TagCreateDTO(
        @NotBlank(message = "Name is required") String name,
        @NotBlank(message = "Slug is required") String slug
) {}
