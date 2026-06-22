package com.cirobtorres.blog.api.dtos;

import java.util.UUID;

public record MediaFolderCreateDTO(
        String folderName,
        UUID parentFolderId
) {}
