package com.cirobtorres.blog.api.exceptions;

import java.time.LocalDateTime;
import java.util.Map;

public record ErrorResponse(
        int status,
        String message,
        LocalDateTime timestamp,
        String path,
        Map<String, String> errors
) {
    public ErrorResponse(
            int status,
            String message,
            String path
    ) {
        this(
                status,
                message,
                LocalDateTime.now(),
                path,
                null
        );
    }
}