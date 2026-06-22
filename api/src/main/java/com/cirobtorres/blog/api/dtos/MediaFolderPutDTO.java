package com.cirobtorres.blog.api.dtos;

import java.util.UUID;

public record MediaFolderPutDTO(
        String newName,
        UUID parentFolderId,
        UUID currentFolderId
) {}
