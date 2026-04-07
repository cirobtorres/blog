package com.cirobtorres.blog.api.mediaFolder.dtos;

import java.util.UUID;

public record MediaFolderDTO(
        UUID id,
        String path
) {}
