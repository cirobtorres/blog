package com.cirobtorres.blog.api.dtos;

import java.util.UUID;

public record MediaFolderDTO(
        UUID id,
        String path
) {}
