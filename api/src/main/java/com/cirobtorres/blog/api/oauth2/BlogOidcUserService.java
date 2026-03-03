package com.cirobtorres.blog.api.oauth2;

import com.cirobtorres.blog.api.oauth2.interfaces.OAuth2ProviderAdapter;
import com.cirobtorres.blog.api.oauth2.providers.OAuth2ProviderRegistry;
import com.cirobtorres.blog.api.oauth2.records.OAuth2Context;
import com.cirobtorres.blog.api.user.entities.User;
import com.cirobtorres.blog.api.userIdentity.enums.UserIdentityProvider;
import com.cirobtorres.blog.api.userIdentity.services.UserIdentityService;
import jakarta.transaction.Transactional;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class BlogOidcUserService extends OidcUserService {
    private final OAuth2ProviderRegistry auth2ProviderAdapter;
    private final UserIdentityService userIdentityService;

    public BlogOidcUserService(
            OAuth2ProviderRegistry registry,
            UserIdentityService userIdentityService
    ) {
        this.auth2ProviderAdapter = registry;
        this.userIdentityService = userIdentityService;
    }

    @Override
    @Transactional
    public OidcUser loadUser(OidcUserRequest request) {
        OidcUser oidcUser = super.loadUser(request);
        UserIdentityProvider provider =
                UserIdentityProvider.valueOf(
                        request.getClientRegistration()
                                .getRegistrationId()
                                .toUpperCase()
                );
        OAuth2Context ctx = new OAuth2Context(provider, oidcUser, request);
        OAuth2ProviderAdapter adapter = auth2ProviderAdapter.get(provider);
        User domainUser = userIdentityService.createOAuthUser(
                provider,
                adapter.extractProviderUserId(ctx),
                adapter.extractName(ctx),
                adapter.extractEmail(ctx).orElse(null),
                adapter.isEmailVerified(ctx)
        );
        Map<String, Object> attributes = new HashMap<>(oidcUser.getAttributes());
        attributes.put("domainUserId", domainUser.getId().toString());
        userIdentityService.updateLastLogin(domainUser);
        return new DefaultOidcUser(
                oidcUser.getAuthorities(),
                oidcUser.getIdToken(),
                oidcUser.getUserInfo(),
                "sub"
        ) {
            @Override
            public Map<String, Object> getAttributes() {
                return attributes;
            }
        };
    }
}
