package com.cirobtorres.blog.api.mediaFolder.dtos;

public record MediaFolderCountDTO(
        String path,
        String name,
        long subfolderCount,
        long fileCount
) {}
