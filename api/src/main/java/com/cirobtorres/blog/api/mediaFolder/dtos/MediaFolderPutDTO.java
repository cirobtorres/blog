package com.cirobtorres.blog.api.mediaFolder.dtos;

import java.util.UUID;

public record MediaFolderPutDTO(
        String newName,
        UUID parentFolderId,
        UUID currentFolderId
) {}
