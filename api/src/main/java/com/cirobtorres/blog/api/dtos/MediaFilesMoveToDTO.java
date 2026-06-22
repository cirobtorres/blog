package com.cirobtorres.blog.api.dtos;

import java.util.Map;
import java.util.UUID;

public record MediaFilesMoveToDTO(
        UUID targetFolderId,
        Map<String, UUID> filesId
) {}
