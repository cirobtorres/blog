package com.cirobtorres.blog.api.services;

import com.cirobtorres.blog.api.ApiApplicationProperties;
import com.cirobtorres.blog.api.dtos.LoginRequest;
import com.cirobtorres.blog.api.dtos.UserSignUpDTO;
import com.cirobtorres.blog.api.dtos.UserDTO;
import com.cirobtorres.blog.api.entities.User;
import com.cirobtorres.blog.api.exceptions.InvalidPasswordPolicyException;
import com.cirobtorres.blog.api.exceptions.UserAlreadyExistsException;
import com.cirobtorres.blog.api.exceptions.UserUnauthorizedException;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.BadRequestException;
import jakarta.ws.rs.ForbiddenException;
import jakarta.ws.rs.NotAuthorizedException;
import jakarta.ws.rs.core.Response;
import org.jspecify.annotations.NonNull;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.representations.AccessTokenResponse;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
public class AuthService {
    private final UserService userService;
    private final String frontendUrl;
    private final String keycloakUrl;
    private final String realm;
    private final String webClientId;
    private final String apiClientId;
    private final String apiClientSecret;
    private final boolean isProd;
    private static final Logger log = LoggerFactory.getLogger(AuthService.class);

    public AuthService(
            UserService userService,
            ApiApplicationProperties apiApplicationProperties
    ) {
        this.userService = userService;
        this.frontendUrl = apiApplicationProperties.getFrontend().getUrl();
        this.isProd = apiApplicationProperties.getApplication().isProduction();
        this.keycloakUrl = apiApplicationProperties.getKeycloak().getKeycloakUrl();
        this.realm = apiApplicationProperties.getKeycloak().getRealm();
        this.webClientId = apiApplicationProperties.getKeycloak().getWebClientId();
        this.apiClientId = apiApplicationProperties.getKeycloak().getApiClientId();
        this.apiClientSecret = apiApplicationProperties.getKeycloak().getApiClientSecret();
    }

    @Transactional
    public UserDTO saveLocalUser(UserSignUpDTO request) {
        validatePasswordPolicy(request);

        Keycloak keycloak = KeycloakBuilder.builder()
                .serverUrl(keycloakUrl)
                .realm(realm)
                .grantType("client_credentials")
                .clientId(apiClientId)
                .clientSecret(apiClientSecret)
                .build();

        UserRepresentation kcUser = getUserRepresentation(request);
        Response response = keycloak.realm(realm).users().create(kcUser);

        if (response.getStatus() == 409) {
            throw new UserAlreadyExistsException("Este e-mail já está em uso.");
        }

        if (response.getStatus() == 400) {
            throw new InvalidPasswordPolicyException("A senha não atende à política de segurança configurada.");
        }

        if (response.getStatus() != 201) {
            throw new RuntimeException("User creation failed.");
        }

        String locationHeader = response.getHeaderString("Location");
        String keycloakIdStr = locationHeader.substring(locationHeader.lastIndexOf("/") + 1);
        UUID keycloakId = UUID.fromString(keycloakIdStr);

        User savedUser = userService.createLocalUser(keycloakId, request.name(), request.email());
        keycloak.realm(realm).users().get(keycloakIdStr).executeActionsEmail(List.of("VERIFY_EMAIL"));

        return new UserDTO(
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail(),
                savedUser.isEmailVerified(),
                List.of(),
                savedUser.getCreatedAt(),
                savedUser.getUpdatedAt()
        );
    }

    @Transactional
    public AccessTokenResponse login(LoginRequest request) {
        try {
            Keycloak userClient = KeycloakBuilder.builder()
                    .serverUrl(keycloakUrl)
                    .realm(realm)
                    .grantType("password")
                    .clientId(webClientId)
                    .username(request.email())
                    .password(request.password())
                    .build();

            AccessTokenResponse tokenResponse = userClient.tokenManager().getAccessToken();
            userClient.close();

            return tokenResponse;
        } catch (NotAuthorizedException e) {
            throw new NotAuthorizedException("Email or password is incorrect");
        } catch (BadRequestException e) {
            throw new BadRequestException("Email or password is incorrect");
        } catch (ForbiddenException e) {
            throw new ForbiddenException("Email or password is incorrect");
        } catch (Exception e) {
            log.error("Unexpected error from Keycloak authentication:", e);
            throw new RuntimeException("Internal server error");
        }
    }

    @Transactional
    public UserDTO getUser(Authentication auth) {
        if (auth == null || !auth.isAuthenticated() || auth instanceof AnonymousAuthenticationToken) {
            throw new UserUnauthorizedException("Invalid authentication");
        }

        if (!(auth.getPrincipal() instanceof Jwt jwt)) {
            return null;
        }

        UUID keycloakId = UUID.fromString(jwt.getSubject());
        String email = jwt.getClaimAsString("email");
        String name = jwt.getClaimAsString("name");

        boolean verifiedInToken =
                jwt.getClaimAsBoolean("email_verified") != null
                && jwt.getClaimAsBoolean("email_verified");

        User user = userService.provisionOrUpdateUser(keycloakId, name, email, verifiedInToken);

        List<String> authorities = auth.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority).filter(Objects::nonNull)
                .map(role -> role.replace("ROLE_", ""))
                .toList();

        return new UserDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.isEmailVerified(),
                authorities,
                user.getCreatedAt(),
                user.getUpdatedAt()
        );
    }

    private static @NonNull UserRepresentation getUserRepresentation(UserSignUpDTO request) {
        UserRepresentation kcUser = new UserRepresentation();
        kcUser.setUsername(request.email());
        kcUser.setEmail(request.email());
        kcUser.setFirstName(request.name());
        kcUser.setEnabled(true);
        kcUser.setEmailVerified(false);
        kcUser.setRequiredActions(List.of("VERIFY_EMAIL"));

        CredentialRepresentation credential = new CredentialRepresentation();
        credential.setType(CredentialRepresentation.PASSWORD);
        credential.setValue(request.password());
        credential.setTemporary(false);
        kcUser.setCredentials(List.of(credential));
        return kcUser;
    }

    @Transactional
    public void sendPasswordResetEmail(String rawEmail) {
        String email = rawEmail.trim().toLowerCase();

        try (Keycloak keycloak = KeycloakBuilder.builder()
                .serverUrl(keycloakUrl)
                .realm(realm)
                .grantType("client_credentials")
                .clientId(apiClientId)
                .clientSecret(apiClientSecret)
                .build()) {
            List<UserRepresentation> users =
                    keycloak.realm(realm).users().searchByEmail(email, true);

            if (users == null || users.isEmpty()) {
                // Do not reveal to the user if that email in fact doesn't exist
                return;
            }

            UserRepresentation user = users.getFirst();

            String redirectUri = frontendUrl + "/users/sign-in";
            int lifespanSeconds = 60 * 60;

            keycloak.realm(realm)
                    .users()
                    .get(user.getId())
                    .executeActionsEmail(
                            webClientId,
                            redirectUri,
                            lifespanSeconds,
                            List.of("UPDATE_PASSWORD")
                    );
        }
    }

    private void validatePasswordPolicy(UserSignUpDTO request) {
        String email = request.email().trim().toLowerCase();
        String password = request.password();
        if (password.length() < 8) {
            throw new InvalidPasswordPolicyException("A senha deve ter pelo menos 8 caracteres.");
        }
        if (password.length() > 32) {
            throw new InvalidPasswordPolicyException("A senha deve ter no máximo 32 caracteres.");
        }
        if (password.equalsIgnoreCase(email)) {
            throw new InvalidPasswordPolicyException("A senha não pode ser igual ao e-mail.");
        }
    }
}
