package com.cirobtorres.blog.api.dtos;

import java.util.UUID;

public record MediaFoldersDTO(
        UUID id,
        UUID parentId,
        String name,
        String path
) {}
