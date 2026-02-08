package com.cirobtorres.blog.api.oauth2;

import com.cirobtorres.blog.api.userIdentity.UserIdentityProvider;

import java.util.Optional;

public interface OAuth2ProviderAdapter {
    UserIdentityProvider getProvider();
    String extractProviderUserId(OAuth2Context ctx);
    String extractName(OAuth2Context ctx);
    Optional<String> extractEmail(OAuth2Context ctx);
    boolean isEmailVerified(OAuth2Context ctx);
}
