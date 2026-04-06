package com.cirobtorres.blog.api.media.dtos;

import java.util.Map;
import java.util.UUID;

public record MediaFilesMoveToDTO(
        String folderDestination,
        Map<String, UUID> filesId
) {}
