package com.cirobtorres.blog.api.auth;

import com.cirobtorres.blog.api.ApiApplicationProperties;
import com.cirobtorres.blog.api.auditToken.dtos.AuditTokenDTO;
import com.cirobtorres.blog.api.auditToken.entities.AuditToken;
import com.cirobtorres.blog.api.auditToken.enums.AuditTokenType;
import com.cirobtorres.blog.api.auditToken.repositories.AuditTokenRepository;
import com.cirobtorres.blog.api.auditToken.services.AuditTokenService;
import com.cirobtorres.blog.api.exceptions.*;
import com.cirobtorres.blog.api.mailer.MailService;
import com.cirobtorres.blog.api.token.dtos.PassResTokenDTO;
import com.cirobtorres.blog.api.token.dtos.TokensDTO;
import com.cirobtorres.blog.api.token.entities.RefreshToken;
import com.cirobtorres.blog.api.token.enums.RefreshTokenClaims;
import com.cirobtorres.blog.api.token.enums.TokenType;
import com.cirobtorres.blog.api.token.interfaces.AuthorityExtractorRepository;
import com.cirobtorres.blog.api.token.interfaces.RefreshTokenRepository;
import com.cirobtorres.blog.api.token.services.JwtService;
import com.cirobtorres.blog.api.user.dtos.UserEmailDTO;
import com.cirobtorres.blog.api.user.dtos.UserPasswordDTO;
import com.cirobtorres.blog.api.user.dtos.UserRegisterDTO;
import com.cirobtorres.blog.api.user.entities.User;
import com.cirobtorres.blog.api.user.dtos.UserLoginDTO;
import com.cirobtorres.blog.api.user.repositories.UserRepository;
import com.cirobtorres.blog.api.userIdentity.entities.UserIdentity;
import com.cirobtorres.blog.api.userIdentity.enums.UserIdentityProvider;
import com.cirobtorres.blog.api.userIdentity.repositories.UserIdentityRepository;
import com.cirobtorres.blog.api.userIdentity.services.UserIdentityService;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
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
    private final UserRepository userRepository;
    private final UserIdentityRepository userIdentityRepository;
    private final PasswordEncoder passwordEncoder;
    private final MailService mailService;
    private final JwtService jwtService;
    private final AuditTokenService auditTokenService;
    private final AuditTokenRepository auditTokenRepository;
    private final UserIdentityService userIdentityService;
    private final RefreshTokenRepository refreshTokenRepository;
    private final AuthorityExtractorRepository authorityExtractor;
    private final boolean isProd;
    private static final Logger log = LoggerFactory.getLogger(AuthService.class);

    public AuthService(
            ApiApplicationProperties apiApplicationProperties,
            UserRepository userRepository,
            UserIdentityRepository userIdentityRepository,
            PasswordEncoder passwordEncoder,
            MailService mailService,
            JwtService jwtService,
            AuditTokenService auditTokenService,
            AuditTokenRepository auditTokenRepository,
            UserIdentityService userIdentityService,
            RefreshTokenRepository refreshTokenRepository,
            AuthorityExtractorRepository authorityExtractor
    ) {
        this.userRepository = userRepository;
        this.userIdentityRepository = userIdentityRepository;
        this.passwordEncoder = passwordEncoder;
        this.mailService = mailService;
        this.jwtService = jwtService;
        this.auditTokenService = auditTokenService;
        this.auditTokenRepository = auditTokenRepository;
        this.userIdentityService = userIdentityService;
        this.refreshTokenRepository = refreshTokenRepository;
        this.authorityExtractor = authorityExtractor;
        this.isProd = apiApplicationProperties.getApplication().isProduction();
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
                () -> new UserUnauthorizedException("E-mail ou senha incorretos")
        );

        // Validation
        boolean passwordsMatch = passwordEncoder.matches(
                userLoginDTO.password(),
                userIdentity.getPasswordHash()
        );

        if (!passwordsMatch) {
            throw new UserUnauthorizedException("E-mail ou senha incorretos");
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
                .getIdentities().stream()
                .filter(i -> i.getProvider() == UserIdentityProvider.LOCAL)
                .findFirst().orElseThrow();

        // Email code
        String token = auditTokenService.createEmailCode(userIdentity, AuditTokenType.EMAIL_VALIDATION);
        mailService.sendValidationEmail(userIdentity.getProviderEmail(), userIdentity.getName(), token);

        // Login
        return loginTokens(user);
    }

    @Transactional
    public void renewCode(UUID userId) throws MessagingException, NoSuchAlgorithmException {
        if (!isProd) log.info("AuthService.renewCode()");
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

        // Delete old code (if exists)
        // if (existingToken.isPresent()) {
        //     LocalDateTime lastGenerated = existingToken.get().getExpiryDate().minusHours(1);
        //     if (lastGenerated.isAfter(LocalDateTime.now().minusSeconds(60))) {
        //         log.warn("User {} is requesting too many codes.", userId);
        //         throw new TooManyRequestsException("Aguarde um minuto antes de solicitar um novo código.");
        //     }
        // }

        // Create code
        String token = auditTokenService.createEmailCode(
                userIdentity,
                AuditTokenType.EMAIL_VALIDATION
        );
        if (!isProd) log.info("AuthService.renewCode(): code {} generated for user {}", token, userIdentity.getId());

        // Send email
        mailService.sendValidationEmail(
                userIdentity.getProviderEmail(),
                userIdentity.getName(),
                token
        );
        if (!isProd) log.info("AuthService.renewCode(): sending audit token to email");
    }

    @Transactional
    public TokensDTO refresh(String oldRefreshToken) throws NoSuchAlgorithmException {
        // Validation
        if (!isProd) log.error("AuthService.refresh(): oldRefreshToken = {}", oldRefreshToken);

        Jwt jwt = jwtService.decodeToken(oldRefreshToken);
        String type = jwtService.getTokenClaim(jwt, RefreshTokenClaims.TYPE);

        if (!TokenType.REFRESH.getType().equals(type)) {
            if (!isProd) log.error("AuthService.refresh(): token type is invalid. token type = {}", type);
            throw new RuntimeException("Invalid token.");
        }

        String renewRefreshTokenHash = jwtService.hashToken(oldRefreshToken);
        Optional<RefreshToken> storedRefreshToken = refreshTokenRepository.findByTokenHash(renewRefreshTokenHash);

        if (storedRefreshToken.isEmpty()) {
            if (!isProd) log.error("AuthService.refresh(): Token NOT FOUND.");
            throw new RuntimeException("Token NOT FOUND.");
        }

        UUID userId = storedRefreshToken.get().getUserId();

        if (storedRefreshToken.get().isRevoked()) {
            if (!isProd) log.error("AuthService.refresh(): Token is REVOKED. storedRefreshToken.get() = {}", storedRefreshToken.get());
            refreshTokenRepository.revokeAllByUserId(storedRefreshToken.get().getUserId(), Instant.now());
            throw new RuntimeException("Token is REVOKED.");
        }

        if (storedRefreshToken.get().getExpiresAt().isBefore(Instant.now())) {
            if (!isProd) log.error("AuthService.refresh(): Token is EXPIRED. storedRefreshToken.get().getExpiresAt() = {}", storedRefreshToken.get().getExpiresAt());
            throw new RuntimeException("Token is EXPIRED.");
        }

        // Make sure token is new by TRYING to revoke true UPDATE match.
        int updated = refreshTokenRepository.revokeIfNotRevoked(
                renewRefreshTokenHash,
                Instant.now()
        );

        if (updated == 0) {
            if (!isProd) log.error("AuthService.refresh(): old token. This token is already revoked/expired.");
            throw new RuntimeException("Invalid token.");
        }

        // Locate user
        User user = userRepository.findById(userId).orElseThrow(
                () -> {
                    if (!isProd) log.error("AuthService.refresh(): user not found.");
                    return new RuntimeException("User not found.");
                }
        );

        // Login
        return loginTokens(user);
    }

    @Transactional
    public TokensDTO validateEmail(String vToken, UUID userId) throws NoSuchAlgorithmException {
        // Validation
        String hashedTokenValue = jwtService.hashToken(vToken);

        AuditToken auditToken = auditTokenRepository
                .findByTokenHash(hashedTokenValue)
                .orElseThrow(
                () -> {
                    if (!isProd) log.error("AuthService.validateEmail(): token not found.");
                    return new TokenNotFoundException("Invalid token.");
                }
        );

        if (auditToken.getTokenType() != AuditTokenType.EMAIL_VALIDATION) {
            log.error("AuthService.validateEmail(): attempt to validate email token with invalid token. TokenType = {}", auditToken.getTokenType());
            // TODO: send security email
            throw new UserUnauthorizedException("Invalid token.");
        }

        UserIdentity userIdentity = auditToken.getUserIdentity();

        if (!userIdentity.getUser().getId().equals(userId)) {
            log.error(
                    "Cross validation attempt: User1={} tried to authenticate User2={}",
                    userId, userIdentity.getUser().getId()
            );
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
        if (!isProd) log.info("AuthService.passwordResetEmailCodeRequest(): userEmail={}", userEmailDTO.email());
        List<UserIdentity> identities = userIdentityRepository.findAllByProviderEmail(userEmailDTO.email());

        if (identities.isEmpty()) {
            // Return true to frontend, instead revealing that this email does not exist
            return;
        }

        Optional<UserIdentity> localIdentity = identities.stream()
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

            List<String> providerNames = identities.stream()
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
        if (!isProd) log.info("AuthService.passwordResetCodeConfirmation(): auditTokenDTO={}", auditTokenDTO.token());
        // Query
        String hash = jwtService.hashToken(auditTokenDTO.token());

        AuditToken auditToken = auditTokenRepository.findByTokenHash(hash)
                .orElseThrow(() -> {
                    if (!isProd) log.warn("Token is invalid. No token_hash matched");
                    return new RuntimeException("Token is invalid.");
                });

        // Validations
        if (!auditToken.isValid()) {
            if (!isProd) log.warn("Token is invalid. revoked={}, expired_at={}", auditToken.isRevoked(), auditToken.getExpiresAt());
            throw new RuntimeException("Token is invalid.");
        }

        if (auditToken.getTokenType() != AuditTokenType.PASSWORD_RESET) {
            if (!isProd) log.warn("Token is invalid. token_type={}", auditToken.getTokenType());
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
        if (!isProd) log.info("AuthService.passwordReset(): passwordDTO={}", passwordDTO.password());
        // Get userId from JWT subject
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userIdString = authentication.getName();
        UUID userId = UUID.fromString(userIdString);

        if (!isProd) log.info("AuthService.passwordReset(): userId={}", userId);

        // Locate user
        User user = userRepository.findById(userId)
                .orElseThrow(() -> {
                    if (!isProd) log.info("AuthService.passwordReset(): user not found");
                    return new RuntimeException("User not found.");
                });

        UserIdentity userIdentity = user.getIdentities().stream()
                .filter(id -> id.getProvider() == UserIdentityProvider.LOCAL)
                .findFirst()
                .orElseThrow(() -> {
                    if (!isProd) log.info("AuthService.passwordReset(): userIdentity not found");
                    return new RuntimeException("This user is not a LOCAL user.");
                });

        // New passwordHash
        String newPasswordHash = passwordEncoder.encode(passwordDTO.password());
        userIdentity.setPasswordHash(newPasswordHash);
        // userIdentity.setLastAuthenticatedAt(LocalDateTime.now());
        userIdentityRepository.save(userIdentity); // User CASCADE is enough to save userIdentity.passwordHash

        if (!isProd) log.info("AuthService.passwordReset(): password updated.");
    }

    // Helpers----------------------------------------------------------------------------------------------------
    public static @NonNull User getTrusedUser(@NonNull UserIdentity userIdentity) {
        User user = userIdentity.getUser();

        if (!Boolean.TRUE.equals(userIdentity.isProviderEmailVerified())) {
            throw new SecurityException("Email não verificado.");
        }

        return user;
    }

    public static @NonNull User isUserEnabled(@NonNull UserIdentity userIdentity) {
        User user = userIdentity.getUser();

        if (!userIdentity.isEnabled()) {
            throw new DisabledException("Usuário trancado.");
        }

        if (user.isBanned()) {
            throw new LockedException("Usuário banido.");
        }

        return user;
    }

    private TokensDTO loginTokens(User user) throws NoSuchAlgorithmException {
        List<String> authorities = authorityExtractor.fromUser(user);
        String subject = user.getId().toString();
        String accessToken = jwtService.createAccessToken(subject, authorities, "LOCAL");
        String refreshToken = jwtService.createRefreshToken(subject);
        RefreshToken refreshTokenEntity = new RefreshToken();
        refreshTokenEntity.setUserId(user.getId());

        String refreshTokenHash = jwtService.hashToken(refreshToken);
        refreshTokenEntity.setTokenHash(refreshTokenHash);
        refreshTokenEntity.setExpiresAt(Instant.now().plus(7, ChronoUnit.DAYS));
        refreshTokenEntity.setRevoked(false);

        refreshTokenRepository.save(refreshTokenEntity);

        if (!isProd) log.info("AuthService.loginTokens(): accessToken={} refreshToken={}", accessToken, refreshToken);
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
        return new PassResTokenDTO(passResetToken);
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
}
