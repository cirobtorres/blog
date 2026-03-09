package com.cirobtorres.blog.api.userIdentity.enums;

public enum UserIdentityProvider {
    LOCAL("diretamente conosco"),
    GOOGLE("ao Google"),
    GITHUB("ao GitHub"),
    MICROSOFT("à Microsoft"),
    LINKEDIN("ao LinkedIn"),
    APPLE("à Apple");

    private final String displaySuffix;

    UserIdentityProvider(String displaySuffix) {
        this.displaySuffix = displaySuffix;
    }

    public String getDisplaySuffix() {
        return displaySuffix;
    }
}