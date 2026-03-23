package com.cirobtorres.blog.api.jwt.enums;

public enum RefreshTokenClaims {
    TYPE("type"),
    AUTHORITIES("authorities"),
    SCOPES("scopes"),;

    private final String value;

    RefreshTokenClaims(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
