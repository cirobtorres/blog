package com.cirobtorres.blog.api.user.dtos;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record UserDTO (
        UUID id,
        String name,
        String providerEmail,
        String pictureUrl,
        List<String> authorities,
        boolean isProviderEmailVerified,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {}