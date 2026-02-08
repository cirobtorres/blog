package com.cirobtorres.blog.api.client;

public record ClientDTO(
        String clientId,
        String clientSecret,
        String redirectUri
) {
}
