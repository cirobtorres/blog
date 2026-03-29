package com.cirobtorres.blog.api.mediaFolder.dtos;

import java.time.LocalDateTime;
import java.util.UUID;

public record MediaFolderCountDTO(
        UUID id,
        String path,
        String name,
        LocalDateTime createdAt,
        long subfolderCount,
        long fileCount
) {}
