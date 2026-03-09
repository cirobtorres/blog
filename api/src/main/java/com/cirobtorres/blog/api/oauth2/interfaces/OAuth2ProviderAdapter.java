package com.cirobtorres.blog.api.oauth2.interfaces;

import com.cirobtorres.blog.api.oauth2.records.OAuth2Context;
import com.cirobtorres.blog.api.userIdentity.enums.UserIdentityProvider;

import java.util.Optional;

public interface OAuth2ProviderAdapter {
    UserIdentityProvider getProvider();
    String extractProviderUserId(OAuth2Context ctx);
    String extractName(OAuth2Context ctx);
    Optional<String> extractEmail(OAuth2Context ctx);
    Optional<String> extractPicture(OAuth2Context ctx);
    boolean isEmailVerified(OAuth2Context ctx);
}
