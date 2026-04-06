package com.cirobtorres.blog.api.media.enums;

public enum FilterQueryParams {
    is,
    isNot,
    isGreaterThan,
    isGreaterThanOrEqualTo,
    isLowerThan,
    isLowerThanOrEqualTo;

    public static FilterQueryParams fromString(String text) {
        for (FilterQueryParams b : FilterQueryParams.values()) {
            if (b.name().equalsIgnoreCase(text)) return b;
        }
        return is; // default
    }
}