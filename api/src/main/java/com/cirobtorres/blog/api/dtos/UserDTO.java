package com.cirobtorres.blog.api.dtos;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record UserDTO (
        UUID id,
        String name,
        String email,
        boolean isEmailVerified,
        boolean isBanned,
        boolean isDeleted,
        List<String> authorities,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {}
