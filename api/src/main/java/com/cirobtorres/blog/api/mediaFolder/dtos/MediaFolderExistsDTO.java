package com.cirobtorres.blog.api.mediaFolder.dtos;

import java.util.UUID;

public record MediaFolderExistsDTO(
        String folderName,
        UUID parentFolderId
) {}
