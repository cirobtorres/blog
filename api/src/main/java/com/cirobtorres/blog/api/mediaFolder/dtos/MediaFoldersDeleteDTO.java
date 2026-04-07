package com.cirobtorres.blog.api.mediaFolder.dtos;

import java.util.List;
import java.util.UUID;

public record MediaFoldersDeleteDTO(
        List<UUID> foldersId
) {}
