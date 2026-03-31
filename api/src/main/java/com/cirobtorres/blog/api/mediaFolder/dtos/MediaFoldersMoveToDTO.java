package com.cirobtorres.blog.api.mediaFolder.dtos;

import java.util.Map;
import java.util.UUID;

public record MediaFoldersMoveToDTO(
        String folderDestination,
        Map<String, UUID> foldersId
) {}
