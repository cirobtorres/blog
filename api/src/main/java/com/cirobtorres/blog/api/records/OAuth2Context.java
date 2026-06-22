package com.cirobtorres.blog.api.records;

import com.cirobtorres.blog.api.enums.UserIdentityProvider;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;

public record OAuth2Context(
        UserIdentityProvider provider,
        OAuth2User user,
        OAuth2UserRequest request
) {}
