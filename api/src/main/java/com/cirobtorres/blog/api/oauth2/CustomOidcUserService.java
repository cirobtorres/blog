package com.cirobtorres.blog.api.oauth2;

import com.cirobtorres.blog.api.user.User;
import com.cirobtorres.blog.api.userIdentity.UserIdentityProvider;
import com.cirobtorres.blog.api.userIdentity.UserIdentityService;
import jakarta.transaction.Transactional;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

// Provider supports OIDC?
//    ├─ YES → OidcUserService
//    └─ NO  → OAuth2UserService
// Ex.: Google
@Service
public class CustomOidcUserService extends OidcUserService {

    private final OAuth2ProviderRegistry registry;
    private final UserIdentityService userIdentityService;

    public CustomOidcUserService(
            OAuth2ProviderRegistry registry,
            UserIdentityService userIdentityService
    ) {
        this.registry = registry;
        this.userIdentityService = userIdentityService;
    }

    @Override
    @Transactional
    public OidcUser loadUser(OidcUserRequest request) {
        OidcUser user = super.loadUser(request);

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
