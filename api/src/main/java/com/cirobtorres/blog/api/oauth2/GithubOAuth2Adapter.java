package com.cirobtorres.blog.api.oauth2;

import com.cirobtorres.blog.api.userIdentity.UserIdentityProvider;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Component
public class GithubOAuth2Adapter implements OAuth2ProviderAdapter {

    @Override
    public UserIdentityProvider getProvider() {
        return UserIdentityProvider.GITHUB;
    }

    @Override
    public String extractProviderUserId(OAuth2Context ctx) {
        return Objects.requireNonNull(ctx.user().getAttribute("id")).toString();
    }

    @Override
    public String extractName(OAuth2Context ctx) {
        return ctx.user().getAttribute("name");
    }

    @Override
    public Optional<String> extractEmail(OAuth2Context ctx) {
        String token = ctx.request().getAccessToken().getTokenValue();
        return fetchPrimaryEmail(token).map(GitHubEmailDTO::getEmail);
    }

    @Override
    public boolean isEmailVerified(OAuth2Context ctx) {
        return extractEmail(ctx).isPresent();
    }

    private Optional<GitHubEmailDTO> fetchPrimaryEmail(String accessToken) {
        RestTemplate rest = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        headers.setAccept(List.of(MediaType.APPLICATION_JSON));

        HttpEntity<Void> entity = new HttpEntity<>(headers);

        ResponseEntity<List<GitHubEmailDTO>> response =
                rest.exchange(
                        "https://api.github.com/user/emails",
                        HttpMethod.GET,
                        entity,
                        new ParameterizedTypeReference<>() {
                        }
                );

        assert response.getBody() != null;

        return response.getBody().stream()
                .filter(GitHubEmailDTO::isPrimary)
                .filter(GitHubEmailDTO::isVerified)
                .findFirst();
    }
}
