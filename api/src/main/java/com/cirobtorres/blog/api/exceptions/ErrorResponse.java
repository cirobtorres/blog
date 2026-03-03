package com.cirobtorres.blog.api.exceptions;

public record ErrorResponse(int status, ErrorCode code, String message) {}