package com.cirobtorres.blog.api.oauth2.google;

import com.cirobtorres.blog.api.oauth2.interfaces.OAuth2ProviderAdapter;
import com.cirobtorres.blog.api.oauth2.records.OAuth2Context;
import com.cirobtorres.blog.api.userIdentity.enums.UserIdentityProvider;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class GoogleOidcAdapter implements OAuth2ProviderAdapter {
    private final UserIdentityProvider provider;

    public GoogleOidcAdapter() {
        this.provider = UserIdentityProvider.GOOGLE;
    }

    @Override
    public UserIdentityProvider getProvider() {
        return provider;
    }

    @Override
    public String extractProviderUserId(OAuth2Context ctx) {
        return ((OidcUser) ctx.user()).getSubject();
    }

    @Override
    public String extractName(OAuth2Context ctx) {
        return ((OidcUser) ctx.user()).getFullName();
    }

    @Override
    public Optional<String> extractEmail(OAuth2Context ctx) {
        return Optional.ofNullable(((OidcUser) ctx.user()).getEmail());
    }

    @Override
    public boolean isEmailVerified(OAuth2Context ctx) {
        return Boolean.TRUE.equals(((OidcUser) ctx.user()).getEmailVerified());
    }
}
