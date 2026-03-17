package com.cirobtorres.blog.api.token.services;

import com.cirobtorres.blog.api.ApiApplicationProperties;
import com.cirobtorres.blog.api.token.dtos.TokensDTO;
import com.cirobtorres.blog.api.token.entities.RefreshToken;
import com.cirobtorres.blog.api.token.enums.RefreshTokenClaims;
import com.cirobtorres.blog.api.token.enums.TokenType;
import com.cirobtorres.blog.api.token.interfaces.AuthorityExtractorRepository;
import com.cirobtorres.blog.api.token.interfaces.RefreshTokenRepository;
import com.cirobtorres.blog.api.user.entities.User;
import com.cirobtorres.blog.api.user.repositories.UserRepository;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Service
public class JwtService {
    private final UserRepository userRepository;
    private final AuthorityExtractorRepository authorityExtractor;
    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtEncoder jwtEncoder;
    private final JwtDecoder jwtDecoder;
    private final String issuer;
    private final long expAccToken;
    private final long expRefToken;
    private final String accTokenPath;
    private final String refTokenPath;
    private final boolean isProd;
    private static final Logger log = LoggerFactory.getLogger(JwtService.class);

    public JwtService(
            UserRepository userRepository,
            AuthorityExtractorRepository authorityExtractor,
            RefreshTokenRepository refreshTokenRepository,
            JwtEncoder jwtEncoder,
            JwtDecoder jwtDecoder,
            ApiApplicationProperties apiApplicationProperties
    ) {
        this.userRepository = userRepository;
        this.authorityExtractor = authorityExtractor;
        this.refreshTokenRepository = refreshTokenRepository;
        this.jwtEncoder = jwtEncoder;
        this.jwtDecoder = jwtDecoder;
        this.issuer = apiApplicationProperties.getJwt().getIssuer();
        this.expAccToken = apiApplicationProperties.getJwt().getExpAccToken();
        this.expRefToken = apiApplicationProperties.getJwt().getExpRefToken();
        this.accTokenPath = apiApplicationProperties.getJwt().getAccTokenPath();
        this.refTokenPath = apiApplicationProperties.getJwt().getRefTokenPath();
        this.isProd = apiApplicationProperties.getApplication().isProduction();
    }

    public String createToken(String subject, List<String> authorities, String type, Instant issuedAt, Instant expiresAt, List<String> scopes) {
        List<String> finalAuthorities = new ArrayList<>(authorities);
        if (scopes != null) finalAuthorities.addAll(scopes);

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .subject(subject)
                .issuer(issuer)
                .issuedAt(issuedAt)
                .expiresAt(expiresAt)
                .claim("type", type.toUpperCase())
                .claim("authorities", finalAuthorities)
                .build();

        return jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }

    // public String createAccessToken(String subject, List<String> authorities, List<String> scopes) {
    public String createAccessToken(String subject, List<String> authorities, String provider) {
        List<String> finalAuthorities = new ArrayList<>(
                authorities != null ? authorities : List.of()
        );
        // if (scopes != null) finalAuthorities.addAll(scopes);
        Instant now = Instant.now();
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .subject(subject)
                .issuer(issuer)
                .issuedAt(now)
                .expiresAt(now.plusMillis(expAccToken))
                .claim("type", TokenType.ACCESS.getType().toUpperCase())
                .claim("authorities", finalAuthorities)
                .claim("provider", provider != null ? provider : "LOCAL")
                .build();

        return jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }

    public String createRefreshToken(String subject) {
        Instant now = Instant.now();

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .subject(subject)
                .issuer(issuer)
                .issuedAt(now)
                .expiresAt(now.plusMillis(expRefToken))
                .claim("type", TokenType.REFRESH.getType().toUpperCase())
                .build();

        return jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }

    @Transactional
    public TokensDTO createTokensForOAuth2User(UUID userId, String provider) throws NoSuchAlgorithmException {
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalStateException("User not found"));

        List<String> authorities = authorityExtractor.fromUser(user); // Lazy

        String tokenSubject = user.getId().toString();
        String accessToken = createAccessToken(tokenSubject, authorities, provider);
        String refreshToken = createRefreshToken(tokenSubject);

        RefreshToken refreshTokenEntity = new RefreshToken();
        refreshTokenEntity.setUserId(user.getId());
        refreshTokenEntity.setTokenHash(hashToken(refreshToken));
        refreshTokenEntity.setExpiresAt(Instant.now().plus(7, ChronoUnit.DAYS));
        refreshTokenEntity.setRevoked(false);
        refreshTokenRepository.save(refreshTokenEntity);

        return new TokensDTO(accessToken, refreshToken);
    }

    public Jwt decodeToken(String token) {
        return jwtDecoder.decode(token);
    }

    public Authentication parseToken(Jwt jwt) {
        try {
            String subject = jwt.getSubject();
            List<String> auths = jwt.getClaimAsStringList("authorities");
            if (auths == null) auths = new ArrayList<>();
            else auths = new ArrayList<>(auths);

            String type = jwt.getClaimAsString("type");
            if (type != null) {
                auths.add(type.toUpperCase());
            }

            if (!isProd && auths.isEmpty()) {
                log.warn("JwtService.parseToken: No authorities found for subject: {}", subject);
            }

            List<SimpleGrantedAuthority> authorities = auths.stream()
                    .map(SimpleGrantedAuthority::new)
                    .toList();

            return new UsernamePasswordAuthenticationToken(subject, null, authorities);
        } catch (Exception e) {
            log.error("JwtService.parseToken: error parsing token. {}", e.getMessage());
            return null;
        }
    }

    public String getTokenClaim(Jwt jwt, RefreshTokenClaims claim) {
        return jwt.getClaim(claim.getValue());
    }

    public String hashToken(String refreshToken) throws NoSuchAlgorithmException {
        try {
            // Java is designed to be extensible
            // Some instances of "MessageDigest" might be unexistence to some JVMs
            // So it's, by design, projected to throws an exception
            // But for modern JVMs, it's extremely unlikely to SHA-256 instance to not be included
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] encodedHash = digest.digest(refreshToken.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(encodedHash); // From bytes to Hex String
        } catch (NoSuchAlgorithmException e) {
            if (!isProd) log.error("JwtService.hashToken(): {}", e.getMessage());
            throw e;
        }
    }

    public void addTokensToCookies(HttpServletResponse response, TokensDTO tokens) {
        addToCookies(response, "access_token", tokens.accessToken(), accTokenPath, expAccToken);
        addToCookies(response, "refresh_token", tokens.refreshToken(), refTokenPath, expRefToken);
    }

    public void clearTokensFromCookies(HttpServletResponse response) {
        addToCookies(response, "access_token", "", accTokenPath, 0);
        addToCookies(response, "refresh_token", "", refTokenPath, 0);
    }

    public void addToCookies(HttpServletResponse response, String name, String value, String path, long maxAgeMillis) {
        long maxAgeToSeconds = maxAgeMillis / 1000;

        ResponseCookie cookie = ResponseCookie
                .from(name, value)
                .httpOnly(true)
                .secure(isProd)
                .sameSite(isProd ? "Strict" : "Lax")
                .path(path)
                .maxAge(maxAgeToSeconds)
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }

    public String base64Url(BigInteger value) {
        byte[] bytes = value.toByteArray();
        if (bytes[0] == 0) {
            bytes = Arrays.copyOfRange(bytes, 1, bytes.length);
        }
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }
}
