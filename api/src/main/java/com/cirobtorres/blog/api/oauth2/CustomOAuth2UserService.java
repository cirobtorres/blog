package com.cirobtorres.blog.api.oauth2;

import com.cirobtorres.blog.api.user.User;
import com.cirobtorres.blog.api.userIdentity.UserIdentityProvider;
import com.cirobtorres.blog.api.userIdentity.UserIdentityService;
import jakarta.transaction.Transactional;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

// Provider supports OIDC?
//    ├─ YES → OidcUserService
//    └─ NO  → OAuth2UserService
// Ex.: GitHub
@Service
public class CustomOAuth2UserService
        implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final OAuth2ProviderRegistry registry;
    private final UserIdentityService userIdentityService;
    private final DefaultOAuth2UserService delegate = new DefaultOAuth2UserService();

    public CustomOAuth2UserService(
            OAuth2ProviderRegistry registry,
            UserIdentityService userIdentityService
    ) {
        this.registry = registry;
        this.userIdentityService = userIdentityService;
    }

    @Override
    @Transactional
    public OAuth2User loadUser(OAuth2UserRequest request) {
        OAuth2User user = delegate.loadUser(request);

        UserIdentityProvider provider =
                UserIdentityProvider.valueOf(
                        request.getClientRegistration()
                                .getRegistrationId()
                                .toUpperCase()
                );

        OAuth2Context ctx = new OAuth2Context(provider, user, request);
        OAuth2ProviderAdapter adapter = registry.get(provider);

        User domainUser = userIdentityService.resolveUser(
                provider,
                adapter.extractProviderUserId(ctx),
                adapter.extractName(ctx),
                adapter.extractEmail(ctx).orElse(null),
                adapter.isEmailVerified(ctx)
        );

        domainUser.setLastLogin(LocalDateTime.now());

        return user;
    }
}
