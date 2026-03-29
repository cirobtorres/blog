package com.cirobtorres.blog.api.mediaFolder.dtos;

public record MediaFolderPutDTO(
        String newName,
        String newDestinationPath,
        String currentPath
) {}
