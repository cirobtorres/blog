package com.cirobtorres.blog.api.auth;

import com.cirobtorres.blog.api.ApiApplicationProperties;
import com.cirobtorres.blog.api.emailToken.services.VerificationTokenService;
import com.cirobtorres.blog.api.exceptions.*;
import com.cirobtorres.blog.api.mailer.MailService;
import com.cirobtorres.blog.api.token.dtos.TokensDTO;
import com.cirobtorres.blog.api.token.entities.RefreshToken;
import com.cirobtorres.blog.api.token.enums.RefreshTokenClaims;
import com.cirobtorres.blog.api.token.enums.TokenType;
import com.cirobtorres.blog.api.token.interfaces.AuthorityExtractorRepository;
import com.cirobtorres.blog.api.token.interfaces.RefreshTokenRepository;
import com.cirobtorres.blog.api.token.services.JwtService;
import com.cirobtorres.blog.api.user.dtos.UserRegisterDTO;
import com.cirobtorres.blog.api.user.entities.User;
import com.cirobtorres.blog.api.user.dtos.UserLoginDTO;
import com.cirobtorres.blog.api.user.repositories.UserRepository;
import com.cirobtorres.blog.api.userIdentity.entities.UserIdentity;
import com.cirobtorres.blog.api.emailToken.entities.VerificationToken;
import com.cirobtorres.blog.api.userIdentity.enums.UserIdentityProvider;
import com.cirobtorres.blog.api.userIdentity.repositories.UserIdentityRepository;
import com.cirobtorres.blog.api.emailToken.repositories.VerificationTokenRepository;
import com.cirobtorres.blog.api.userIdentity.services.UserIdentityService;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import org.jspecify.annotations.NonNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
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
    private final VerificationTokenService verificationTokenService;
    private final VerificationTokenRepository verificationTokenRepository;
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
            VerificationTokenService verificationTokenService,
            VerificationTokenRepository verificationTokenRepository,
            UserIdentityService userIdentityService,
            RefreshTokenRepository refreshTokenRepository,
            AuthorityExtractorRepository authorityExtractor
    ) {
        this.userRepository = userRepository;
        this.userIdentityRepository = userIdentityRepository;
        this.passwordEncoder = passwordEncoder;
        this.mailService = mailService;
        this.jwtService = jwtService;
        this.verificationTokenService = verificationTokenService;
        this.verificationTokenRepository = verificationTokenRepository;
        this.userIdentityService = userIdentityService;
        this.refreshTokenRepository = refreshTokenRepository;
        this.authorityExtractor = authorityExtractor;
        this.isProd = apiApplicationProperties.getApplication().isProduction();
    }

    public void logout(String rawRefreshToken) {
        try {
            // Java is designed to be extensible
            // Some instances of "MessageDigest" might be unexistence to some JVMs
            // So it's, by design, projected to throws an exception
            // But for modern JVMs, it's extremely unlikely to not support SHA-256
            String hash = jwtService.hashToken(rawRefreshToken);
            refreshTokenRepository.findByTokenHash(hash)
                    .ifPresent(token -> {
                        token.setRevoked(true);
                        token.setRevokedAt(Instant.now());
                        refreshTokenRepository.save(token);
                    });
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException("SHA-256 not found", e);
        }
    }

    @Transactional
    public TokensDTO login(@NonNull UserLoginDTO userLoginDTO) {
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
        User user = getTrustedUser(userIdentity);

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
                userRegisterDTO.password()
        );

        UserIdentity userIdentity = user
                .getIdentities().stream()
                .filter(i -> i.getProvider() == UserIdentityProvider.LOCAL)
                .findFirst().orElseThrow();

        // Email code
        String vCode = verificationTokenService.createEmailCode(userIdentity);
        mailService.sendValidationEmail(user.getEmail(), user.getName(), vCode);

        // Login
        return loginTokens(user);
    }

    @Transactional
    public void renewCode(UUID userId) throws MessagingException, NoSuchAlgorithmException {
        if (!isProd) log.info("AuthService.renewCode()");
        UserIdentity userIdentity = userIdentityRepository
                .findLocalIdentityByUserId(userId)
                .orElseThrow(
                        () -> new UserUnauthorizedException("User not found.")
                );

        User user = userIdentity.getUser();

        Optional<VerificationToken> existingToken = verificationTokenRepository.findByUserIdentity(userIdentity);

        if (existingToken.isPresent()) {
            LocalDateTime lastGenerated = existingToken.get().getExpiryDate().minusHours(1);
            if (lastGenerated.isAfter(LocalDateTime.now().minusSeconds(60))) {
                log.warn("User {} is requesting too many codes.", userId);
                throw new TooManyRequestsException("Too many requests.");
            }
        }

        if (Boolean.TRUE.equals(userIdentity.isProviderEmailVerified())) return;
        // verificationTokenRepository.deleteByUserIdentity(userIdentity); // Moved into createEmailCode
        String vCode = verificationTokenService.createEmailCode(userIdentity);
        if (!isProd) log.info("AuthService.renewCode(): sending verification token to email");
        mailService.sendValidationEmail(user.getEmail(), user.getName(), vCode);
        if (!isProd) log.info("AuthService.renewCode(): New code generated for user {}", userId);
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

        VerificationToken verificationToken = verificationTokenRepository
                .findByTokenHash(hashedTokenValue)
                .orElseThrow(
                () -> {
                    if (!isProd) log.error("AuthService.validateEmail(): token not found.");
                    return new TokenNotFoundException("Invalid token.");
                }
        );

        UserIdentity userIdentity = verificationToken.getUserIdentity();

        if (!userIdentity.getUser().getId().equals(userId)) {
            log.error(
                    "Cross validation attempt: User1={} tried to authenticate User2={}",
                    userId, userIdentity.getUser().getId()
            );
            throw new UserUnauthorizedException("Invalid token.");
        }

        if (verificationToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new TokenExpiredException("Invalid token.");
        }

        userIdentity.setIsProviderEmailVerified(true);
        userIdentity.setLastAuthenticatedAt(LocalDateTime.now());
        userIdentity.setIsProviderEmailVerifiedAt(LocalDateTime.now());

        User user = getTrustedUser(userIdentity);

        // Login
        return loginTokens(user);
    }

    private TokensDTO loginTokens(User user) {
        List<String> authorities = authorityExtractor.fromUser(user);
        String subject = user.getId().toString();
        String accessToken = jwtService.createAccessToken(subject, authorities, null);
        String refreshToken = jwtService.createRefreshToken(subject);
        RefreshToken refreshTokenEntity = new RefreshToken();
        refreshTokenEntity.setUserId(user.getId());

        try {
            // Java is designed to be extensible
            // Some instances of "MessageDigest" might be unexistence to some JVMs
            // So it's, by design, projected to throws an exception
            // But for modern JVMs, it's extremely unlikely to not support SHA-256
            String refreshTokenHash = jwtService.hashToken(refreshToken);
            refreshTokenEntity.setTokenHash(refreshTokenHash);
            refreshTokenEntity.setExpiresAt(Instant.now().plus(7, ChronoUnit.DAYS));
            refreshTokenEntity.setRevoked(false);

            refreshTokenRepository.save(refreshTokenEntity);
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException("SHA-256 not found", e);
        }
        if (!isProd) log.info("AuthService.loginTokens(): accessToken={} refreshToken={}", accessToken, refreshToken);
        return new TokensDTO(accessToken, refreshToken);
    }

    private static @NonNull User getTrustedUser(@NonNull UserIdentity userIdentity) {
        User user = userIdentity.getUser();

        // if (!Boolean.TRUE.equals(userIdentity.isProviderEmailVerified())) {
        //     throw new SecurityException("Email não verificado.");
        // }

        if (!userIdentity.isEnabled()) {
            throw new DisabledException("Usuário trancado.");
        }

        if (user.isBanned()) {
            throw new LockedException("Usuário banido.");
        }

        return user;
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
}
