package com.cirobtorres.blog.api.exceptions;

public class TokenNotFoundException extends RuntimeException {
    public TokenNotFoundException(String message) { super(message); }
}