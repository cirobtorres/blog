package com.cirobtorres.blog.api.dtos;

import java.util.Map;
import java.util.UUID;

public record MediaFoldersMoveToDTO(
        UUID parentFolderId,
        Map<String, UUID> foldersId
) {}
