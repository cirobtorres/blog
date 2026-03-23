package com.cirobtorres.blog.api.jwt.enums;

public enum TokenType {
    ACCESS("access"),
    VALIDATE("validate"),
    REFRESH("refresh");

    private final String type;

    TokenType(String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }
}
