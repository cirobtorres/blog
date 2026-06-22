package com.cirobtorres.blog.api.dtos;

import java.util.List;
import java.util.UUID;

public record MediaDeleteAllDTO(
        List<UUID> fileIds
) {}
