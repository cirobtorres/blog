package com.cirobtorres.blog.api.dtos;

import java.util.UUID;

public record MediaFolderExistsDTO(
        String folderName,
        UUID parentFolderId
) {}
