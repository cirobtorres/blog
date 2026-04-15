package com.cirobtorres.blog.api.auth.services;

import com.cirobtorres.blog.api.ApiApplicationProperties;
import com.cirobtorres.blog.api.auditToken.dtos.AuditTokenDTO;
import com.cirobtorres.blog.api.auditToken.entities.AuditToken;
import com.cirobtorres.blog.api.auditToken.enums.AuditTokenType;
import com.cirobtorres.blog.api.auditToken.repositories.AuditTokenRepository;
import com.cirobtorres.blog.api.auditToken.services.AuditTokenService;
import com.cirobtorres.blog.api.exceptions.*;
import com.cirobtorres.blog.api.mailer.MailService;
import com.cirobtorres.blog.api.jwt.dtos.PassResTokenDTO;
import com.cirobtorres.blog.api.jwt.dtos.TokensDTO;
import com.cirobtorres.blog.api.jwt.entities.RefreshToken;
import com.cirobtorres.blog.api.jwt.enums.RefreshTokenClaims;
import com.cirobtorres.blog.api.jwt.enums.TokenType;
import com.cirobtorres.blog.api.jwt.interfaces.AuthorityExtractorRepository;
import com.cirobtorres.blog.api.jwt.interfaces.RefreshTokenRepository;
import com.cirobtorres.blog.api.jwt.services.JwtService;
import com.cirobtorres.blog.api.user.dtos.*;
import com.cirobtorres.blog.api.user.entities.User;
import com.cirobtorres.blog.api.user.repositories.UserRepository;
import com.cirobtorres.blog.api.user.services.UserService;
import com.cirobtorres.blog.api.userIdentity.entities.UserIdentity;
import com.cirobtorres.blog.api.userIdentity.enums.UserIdentityProvider;
import com.cirobtorres.blog.api.userIdentity.repositories.UserIdentityRepository;
import com.cirobtorres.blog.api.userIdentity.services.UserIdentityService;
import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import org.jboss.logging.MDC;
import org.jspecify.annotations.NonNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.security.NoSuchAlgorithmException;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService {
    private final MeterRegistry meterRegistry;
    private final UserRepository userRepository;
    private final UserIdentityRepository userIdentityRepository;
    private final PasswordEncoder passwordEncoder;
    private final MailService mailService;
    private final JwtService jwtService;
    private final AuditTokenService auditTokenService;
    private final AuditTokenRepository auditTokenRepository;
    private final UserService userService;
    private final UserIdentityService userIdentityService;
    private final RefreshTokenRepository refreshTokenRepository;
    private final AuthorityExtractorRepository authorityExtractor;
    private final String testerUUID;
    private final boolean isProd;
    private static final Logger log = LoggerFactory.getLogger(AuthService.class);

    public AuthService(
            MeterRegistry meterRegistry,
            ApiApplicationProperties apiApplicationProperties,
            UserRepository userRepository,
            UserIdentityRepository userIdentityRepository,
            PasswordEncoder passwordEncoder,
            MailService mailService,
            JwtService jwtService,
            AuditTokenService auditTokenService,
            AuditTokenRepository auditTokenRepository,
            UserService userService,
            UserIdentityService userIdentityService,
            RefreshTokenRepository refreshTokenRepository,
            AuthorityExtractorRepository authorityExtractor
    ) {
        this.meterRegistry = meterRegistry;
        this.userRepository = userRepository;
        this.userIdentityRepository = userIdentityRepository;
        this.passwordEncoder = passwordEncoder;
        this.mailService = mailService;
        this.jwtService = jwtService;
        this.auditTokenService = auditTokenService;
        this.auditTokenRepository = auditTokenRepository;
        this.userService = userService;
        this.userIdentityService = userIdentityService;
        this.refreshTokenRepository = refreshTokenRepository;
        this.authorityExtractor = authorityExtractor;
        this.isProd = apiApplicationProperties.getApplication().isProduction();
        this.testerUUID = apiApplicationProperties.getDebug().getTrackUserId();
    }

    @Transactional
    public void logout(String rawRefreshToken) throws NoSuchAlgorithmException {
        String hash = jwtService.hashToken(rawRefreshToken);
        refreshTokenRepository.findByTokenHash(hash)
                .ifPresent(token -> {
                    token.setRevoked(true);
                    token.setRevokedAt(Instant.now());
                    refreshTokenRepository.save(token);
                });
    }

    @Transactional
    public TokensDTO login(@NonNull UserLoginDTO userLoginDTO) throws NoSuchAlgorithmException {
        // Locate
        UserIdentity userIdentity = userIdentityRepository.findByProviderAndProviderUserId(
                UserIdentityProvider.LOCAL,
                userLoginDTO.email()
        ).orElseThrow(
                () -> new UserUnauthorizedException("Email or password incorrect.")
        );

        // Validation
        boolean passwordsMatch = passwordEncoder.matches(
                userLoginDTO.password(),
                userIdentity.getPasswordHash()
        );

        if (!passwordsMatch) {
            throw new UserUnauthorizedException("Email or password incorrect.");
        }

        // User
        User user = isUserEnabled(userIdentity);

        // Login
        return loginTokens(user);
    }

    @Transactional
    public TokensDTO register(UserRegisterDTO userRegisterDTO) throws NoSuchAlgorithmException, MessagingException {
        // Validation
        userExistsLocally(userRegisterDTO.email());

        // User
        User user = userIdentityService.createLocalUser(
                userRegisterDTO.name(),
                userRegisterDTO.email(),
                null,
                userRegisterDTO.password()
        );

        UserIdentity userIdentity = user
                .getIdentities()
                .stream()
                .filter(i -> i.getProvider() == UserIdentityProvider.LOCAL)
                .findFirst()
                .orElseThrow();

        // Email code
        String token = auditTokenService.createEmailCode(userIdentity, AuditTokenType.EMAIL_VALIDATION);
        mailService.sendValidationEmail(userIdentity.getProviderEmail(), userIdentity.getName(), token);

        // Login
        return loginTokens(user);
    }

    @Transactional
    public UserDTO getUser(Authentication auth) {
        return userService.getAuthenticatedUserDTO(auth);
    }

    @Transactional
    public void renewCode(UUID userId) throws MessagingException, NoSuchAlgorithmException {
        // Locate user
        UserIdentity userIdentity = userIdentityRepository
                .findLocalIdentityByUserId(userId)
                .orElseThrow(
                        () -> new UserUnauthorizedException("User not found.")
                );

        // TODO: feedback user that his email is verified already
        // User is verified. Does nothing (prevent sending more emails)
        if (Boolean.TRUE.equals(userIdentity.isProviderEmailVerified())) return;

        // Locate old code (if exists)
        Optional<AuditToken> existingToken = auditTokenRepository.findByUserIdentityAndTokenType(
                userIdentity,
                AuditTokenType.EMAIL_VALIDATION
        );

        // Create code
        String token = auditTokenService.createEmailCode(
                userIdentity,
                AuditTokenType.EMAIL_VALIDATION
        );

        // Send email
        mailService.sendValidationEmail(
                userIdentity.getProviderEmail(),
                userIdentity.getName(),
                token
        );
    }

    @Transactional
    public TokensDTO refresh(String oldRefreshToken) throws NoSuchAlgorithmException {
        Jwt jwt = jwtService.decodeToken(oldRefreshToken);
        MDC.put("user_id", jwt.getSubject());
        trackRefresh(jwt.getSubject());

        String type = jwtService.getTokenClaim(jwt, RefreshTokenClaims.TYPE);

        if (!TokenType.REFRESH.getType().toUpperCase().equals(type)) {
            throw new RuntimeException("Invalid token.");
        }

        String oldHash = jwtService.hashToken(oldRefreshToken);
        Instant now = Instant.now();

        Optional<RefreshToken> storedOpt = refreshTokenRepository.findByTokenHashForRefresh(oldHash);
        if (storedOpt.isEmpty()) {
            throw new RuntimeException("Token NOT FOUND.");
        }

        RefreshToken stored = storedOpt.get();
        UUID userId = stored.getUserId();

        if (stored.isRevoked()) {
            return consumeViaRotationChainOrReject(stored, now, 0);
        }

        if (stored.getExpiresAt().isBefore(now)) {
            throw new RuntimeException("Token is EXPIRED.");
        }

        int updated = refreshTokenRepository.revokeIfNotRevoked(oldHash, now);
        if (updated == 0) {
            Optional<RefreshToken> rowAgain = refreshTokenRepository.findByTokenHash(oldHash);
            if (rowAgain.isPresent() && rowAgain.get().isRevoked()) {
                return consumeViaRotationChainOrReject(rowAgain.get(), now, 0);
            }
            throw new RuntimeException("Invalid token.");
        }

        return issueRotatedTokens(userId, oldHash);
    }

    // Issues new tokens after {@code consumedRefreshHash} was revoked, and links that row to the new refresh hash ({@code replacedByTokenHash}).
    private TokensDTO issueRotatedTokens(UUID userId, String consumedRefreshHash) throws NoSuchAlgorithmException {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new RuntimeException("User not found.")
        );
        TokensDTO tokens = loginTokens(user);
        int linked = refreshTokenRepository.setReplacedByTokenHash(
                consumedRefreshHash,
                jwtService.hashToken(tokens.refreshToken())
        );
        if (linked == 0) {
            log.warn("issueRotatedTokens: setReplacedByTokenHash matched no row (consumedHash may be stale)");
        }
        return tokens;
    }

    // Revoked row: follow {@code replacedByTokenHash} to the current valid child, consume it, and rotate; or detect reuse.
    private TokensDTO consumeViaRotationChainOrReject(RefreshToken stored, Instant now, int depth) throws NoSuchAlgorithmException {
        if (depth > 10) {
            throw new RefreshTokenAlreadyRotatedException("Refresh token already rotated.");
        }

        String replacedBy = stored.getReplacedByTokenHash();
        if (replacedBy != null) {
            Optional<RefreshToken> childOpt = refreshTokenRepository.findByTokenHashForRefresh(replacedBy);
            if (childOpt.isPresent()) {
                RefreshToken child = childOpt.get();
                if (!child.isRevoked() && !child.getExpiresAt().isBefore(now)) {
                    int u = refreshTokenRepository.revokeIfNotRevoked(replacedBy, now);
                    if (u == 0) {
                        Optional<RefreshToken> peer = refreshTokenRepository.findByTokenHash(replacedBy);
                        if (peer.isPresent() && peer.get().isRevoked()) {
                            return consumeViaRotationChainOrReject(peer.get(), now, depth + 1);
                        }
                        throw new RefreshTokenAlreadyRotatedException("Refresh token already rotated.");
                    }
                    return issueRotatedTokens(child.getUserId(), replacedBy);
                }
            }
        }

        Instant revokedAt = stored.getRevokedAt();
        boolean recentRace = revokedAt != null && ChronoUnit.SECONDS.between(revokedAt, now) < 30;
        if (recentRace) {
            throw new RefreshTokenAlreadyRotatedException("Refresh token already rotated.");
        }

        refreshTokenRepository.revokeAllByUserId(stored.getUserId(), now);
        throw new UserUnauthorizedException("Token is REVOKED.");
    }

    @Transactional
    public TokensDTO validateEmail(String vToken, UUID userId) throws NoSuchAlgorithmException {
        // Validation
        String hashedTokenValue = jwtService.hashToken(vToken);

        AuditToken auditToken = auditTokenRepository
                .findByTokenHash(hashedTokenValue)
                .orElseThrow(
                () -> new TokenNotFoundException("Invalid token.")
        );

        if (auditToken.getTokenType() != AuditTokenType.EMAIL_VALIDATION) {
            throw new UserUnauthorizedException("Invalid token.");
        }

        UserIdentity userIdentity = auditToken.getUserIdentity();

        if (!userIdentity.getUser().getId().equals(userId)) {
            throw new UserUnauthorizedException("Invalid token.");
        }

        if (auditToken.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new TokenExpiredException("Invalid token.");
        }

        auditToken.setRevoked(true);
        auditToken.setRevokedAt(LocalDateTime.now());
        // auditTokenRepository.save(auditToken); @Transational saves automatically at the end of the method

        userIdentity.setIsProviderEmailVerified(true);
        userIdentity.setLastAuthenticatedAt(LocalDateTime.now());
        userIdentity.setIsProviderEmailVerifiedAt(LocalDateTime.now());

        User user = isUserEnabled(userIdentity);

        // Login
        return loginTokens(user);
    }

    @Transactional
    public void passwordResetEmailCodeRequest(UserEmailDTO userEmailDTO) throws NoSuchAlgorithmException, MessagingException {
        List<UserIdentity> identities = userIdentityRepository.findAllByProviderEmail(userEmailDTO.email());

        if (identities.isEmpty()) {
            // Return true to frontend, instead revealing that this email does not exist
            return;
        }

        Optional<UserIdentity> localIdentity = identities
                .stream()
                .filter(i -> i.getProvider() == UserIdentityProvider.LOCAL)
                .findFirst();

        if (localIdentity.isPresent()) {
            // Local user exists: send code
            UserIdentity userIdentity = localIdentity.get();
            String token = auditTokenService.createEmailCode(
                    userIdentity,
                    AuditTokenType.PASSWORD_RESET
            );
            mailService.sendResetPasswordEmail(
                    userIdentity.getProviderEmail(),
                    userIdentity.getName(),
                    token
            );
        } else {
            // No LOCAL account. Instead, user might have one or more provider identities
            String userName = identities.getFirst().getName();

            List<String> providerNames = identities
                    .stream()
                    .map(UserIdentity::getProvider)
                    .map(this::formatProviderName)
                    .toList();

            mailService.sendResetPasswordInfoForProviderUsers(
                    userEmailDTO.email(),
                    userName,
                    providerNames
            );
        }
    }

    @Transactional
    public PassResTokenDTO passwordResetCodeConfirmation(AuditTokenDTO auditTokenDTO) throws NoSuchAlgorithmException {
        // Query
        String hash = jwtService.hashToken(auditTokenDTO.token());

        AuditToken auditToken = auditTokenRepository.findByTokenHash(hash)
                .orElseThrow(() -> new RuntimeException("Token is invalid."));

        // Validations
        if (!auditToken.isValid()) {
            throw new RuntimeException("Token is invalid.");
        }

        if (auditToken.getTokenType() != AuditTokenType.PASSWORD_RESET) {
            throw new RuntimeException("Token is invalid.");
        }

        // Revokes the token
        auditToken.setRevoked(true);
        auditToken.setRevokedAt(LocalDateTime.now());

        // Verify user email, since he seems to own that email where the code was sent
        UserIdentity userIdentity = auditToken.getUserIdentity();
        if (!Boolean.TRUE.equals(userIdentity.isProviderEmailVerified())) {
            userIdentity.setIsProviderEmailVerified(true);
            userIdentity.setIsProviderEmailVerifiedAt(LocalDateTime.now());
        }

        auditTokenRepository.save(auditToken);

        return passResetToken(userIdentity.getUser());
    }

    @Transactional
    public void passwordReset(UserPasswordDTO passwordDTO) {
        // Get userId from JWT subject
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userIdString = authentication.getName();
        UUID userId = UUID.fromString(userIdString);

        // Locate user
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found."));

        UserIdentity userIdentity = user.getIdentities().stream()
                .filter(id -> id.getProvider() == UserIdentityProvider.LOCAL)
                .findFirst()
                .orElseThrow(() -> new RuntimeException("This user is not a LOCAL user."));

        // New passwordHash
        String newPasswordHash = passwordEncoder.encode(passwordDTO.password());
        userIdentity.setPasswordHash(newPasswordHash);
        // userIdentity.setLastAuthenticatedAt(LocalDateTime.now());
        userIdentityRepository.save(userIdentity); // User CASCADE is enough to save userIdentity.passwordHash
    }

    // Helpers----------------------------------------------------------------------------------------------------
    public static @NonNull User getTrusedUser(@NonNull UserIdentity userIdentity) {
        User user = userIdentity.getUser();

        if (!Boolean.TRUE.equals(userIdentity.isProviderEmailVerified())) {
            throw new SecurityException("User identity email is unvalidated or was not verified.");
        }

        return user;
    }

    public static @NonNull User isUserEnabled(@NonNull UserIdentity userIdentity) {
        User user = userIdentity.getUser();

        if (!userIdentity.isEnabled()) {
            throw new DisabledException("User enabled = false.");
        }

        if (user.isBanned()) {
            throw new LockedException("User banned = true.");
        }

        return user;
    }

    private TokensDTO loginTokens(User user) throws NoSuchAlgorithmException {
        List<String> authorities = authorityExtractor.fromUser(user);
        String subject = user.getId().toString();

        String accessToken = jwtService.createAccessToken(subject, authorities, "LOCAL");
        String refreshToken = jwtService.createRefreshToken(subject);

        RefreshToken refreshTokenEntity = RefreshToken
                .builder()
                .userId(user.getId())
                .tokenHash(jwtService.hashToken(refreshToken))
                .expiresAt(Instant.now().plus(7, ChronoUnit.DAYS))
                .revoked(false)
                .build();

        refreshTokenRepository.save(refreshTokenEntity);

        return new TokensDTO(accessToken, refreshToken);
    }

    private PassResTokenDTO passResetToken(User user) {
        List<String> authorities = authorityExtractor.fromUser(user);
        String subject = user.getId().toString();
        Instant issuedAt = Instant.now();
        Instant expiresAt = issuedAt.plus(15, ChronoUnit.MINUTES);

        String passResetToken = jwtService.createToken(
                subject,
                authorities,
                AuditTokenType.PASSWORD_RESET.name(),
                issuedAt,
                expiresAt,
                null
        );

        PassResTokenDTO passResTokenDTO = new PassResTokenDTO(passResetToken);

        return passResTokenDTO;
    }

    private void userExistsLocally(String email) {
        userRepository.findByEmail(email).ifPresent(user -> {
            boolean hasLocalIdentity = user
                    .getIdentities()
                    .stream()
                    .anyMatch(i ->
                            i.getProvider() == UserIdentityProvider.LOCAL
                    );
            if (hasLocalIdentity) {
                throw new UserAlreadyExistsException("Este e-mail já está em uso.");
            }
        });
    }

    private String formatProviderName(UserIdentityProvider provider) {
        return switch (provider) {
            case GOOGLE -> "ao Google";
            case GITHUB -> "ao GitHub";
            case MICROSOFT -> "à Microsoft";
            case LINKEDIN -> "ao LinkedIn";
            case APPLE -> "à Apple";
            case LOCAL -> "diretamente com nosso sistema";
        };
    }

    // Actuator----------------------------------------------------------------------------------------------------
    private void trackRefresh(String userId) {
        String userTag = "ignore";

        if (userId.equals(testerUUID)) {
            userTag = userId;
        }

        Counter.builder("auth.refresh.requests")
                .tag("user", userTag)
                .description("Refresh requests tracked by specific user or group")
                .register(meterRegistry)
                .increment();
    }
}
