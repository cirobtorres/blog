package com.cirobtorres.blog.api.exceptions;

public class MediaNameAlreadyExistsException extends RuntimeException {
    public MediaNameAlreadyExistsException(String message) {
        super(message);
    }
}
