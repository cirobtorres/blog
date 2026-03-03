package com.cirobtorres.blog.api.oauth2;

import com.cirobtorres.blog.api.oauth2.interfaces.OAuth2ProviderAdapter;
import com.cirobtorres.blog.api.oauth2.providers.OAuth2ProviderRegistry;
import com.cirobtorres.blog.api.oauth2.records.OAuth2Context;
import com.cirobtorres.blog.api.user.entities.User;
import com.cirobtorres.blog.api.userIdentity.enums.UserIdentityProvider;
import com.cirobtorres.blog.api.userIdentity.services.UserIdentityService;
import jakarta.transaction.Transactional;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class BlogOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
    private final OAuth2ProviderRegistry auth2ProviderRegistry;
    private final UserIdentityService userIdentityService;
    private final DefaultOAuth2UserService delegate = new DefaultOAuth2UserService();

    public BlogOAuth2UserService(
            OAuth2ProviderRegistry auth2ProviderRegistry,
            UserIdentityService userIdentityService
    ) {
        this.auth2ProviderRegistry = auth2ProviderRegistry;
        this.userIdentityService = userIdentityService;
    }

    @Override
    @Transactional
    public OAuth2User loadUser(OAuth2UserRequest request) {
        OAuth2User user = delegate.loadUser(request);
        Map<String, Object> attributes = new HashMap<>(user.getAttributes());
        UserIdentityProvider provider =
                UserIdentityProvider.valueOf(
                        request.getClientRegistration()
                                .getRegistrationId()
                                .toUpperCase()
                );
        OAuth2Context ctx = new OAuth2Context(provider, user, request);
        OAuth2ProviderAdapter adapter = auth2ProviderRegistry.get(provider);
        User domainUser = userIdentityService.createOAuthUser(
                provider,
                adapter.extractProviderUserId(ctx),
                adapter.extractName(ctx),
                adapter.extractEmail(ctx).orElse(null),
                adapter.isEmailVerified(ctx)
        );
        attributes.put("domainUserId", domainUser.getId().toString());
        userIdentityService.updateLastLogin(domainUser);
        String nameAttributeKey =
                request.getClientRegistration()
                        .getProviderDetails()
                        .getUserInfoEndpoint()
                        .getUserNameAttributeName();
        return new DefaultOAuth2User(
                user.getAuthorities(),
                attributes,
                nameAttributeKey
        );

    }
}
