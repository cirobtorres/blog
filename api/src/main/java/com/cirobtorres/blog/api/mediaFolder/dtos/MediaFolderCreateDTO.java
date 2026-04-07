package com.cirobtorres.blog.api.mediaFolder.dtos;

import java.util.UUID;

public record MediaFolderCreateDTO(
        String folderName,
        UUID parentFolderId
) {}
