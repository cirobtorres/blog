package com.cirobtorres.blog.api.oauth2;

import com.cirobtorres.blog.api.userIdentity.UserIdentityProvider;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
public class OAuth2ProviderRegistry {
    private final Map<UserIdentityProvider, OAuth2ProviderAdapter> adapters;

    public OAuth2ProviderRegistry(List<OAuth2ProviderAdapter> adapters) {
        this.adapters = adapters.stream()
                .collect(Collectors.toMap(
                        OAuth2ProviderAdapter::getProvider,
                        Function.identity()
                ));
    }

    public OAuth2ProviderAdapter get(UserIdentityProvider provider) {
        OAuth2ProviderAdapter adapter = adapters.get(provider);
        if (adapter == null) {
            throw new IllegalStateException("No adapter for " + provider);
        }
        return adapter;
    }
}
