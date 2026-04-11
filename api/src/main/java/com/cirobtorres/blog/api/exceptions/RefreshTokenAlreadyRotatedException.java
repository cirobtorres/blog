package com.cirobtorres.blog.api.exceptions;

/**
 * Thrown when a refresh token was just rotated (e.g. concurrent refresh). Not a reuse attack;
 * callers should rely on the session established by the winning refresh, not revoke all tokens.
 */
public class RefreshTokenAlreadyRotatedException extends RuntimeException {
    public RefreshTokenAlreadyRotatedException(String message) {
        super(message);
    }
}
