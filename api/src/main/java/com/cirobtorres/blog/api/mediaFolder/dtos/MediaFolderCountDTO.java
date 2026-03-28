package com.cirobtorres.blog.api.mediaFolder.dtos;

import java.time.LocalDateTime;

public record MediaFolderCountDTO(
        String path,
        String name,
        LocalDateTime createdAt,
        long subfolderCount,
        long fileCount
) {}
