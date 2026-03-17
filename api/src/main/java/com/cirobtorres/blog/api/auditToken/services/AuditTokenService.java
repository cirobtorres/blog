package com.cirobtorres.blog.api.auditToken.services;

import com.cirobtorres.blog.api.ApiApplicationProperties;
import com.cirobtorres.blog.api.auditToken.entities.AuditToken;
import com.cirobtorres.blog.api.auditToken.enums.AuditTokenType;
import com.cirobtorres.blog.api.auditToken.repositories.AuditTokenRepository;
import com.cirobtorres.blog.api.token.services.JwtService;
import com.cirobtorres.blog.api.userIdentity.entities.UserIdentity;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.LocalDateTime;

@Service
public class AuditTokenService {
    private final AuditTokenRepository verificationTokenRepository;
    private final JwtService jwtService;
    private final boolean isProd;
    private static final Logger log = LoggerFactory.getLogger(AuditTokenService.class);

    public AuditTokenService(
            ApiApplicationProperties apiApplicationProperties,
            AuditTokenRepository verificationTokenRepository,
            JwtService jwtService
    ) {
        this.verificationTokenRepository = verificationTokenRepository;
        this.isProd = apiApplicationProperties.getApplication().isProduction();
        this.jwtService = jwtService;
    }

    @Transactional
    public String createEmailCode(
            UserIdentity localIdentity,
            AuditTokenType tokenType
    ) throws NoSuchAlgorithmException {
        if (!isProd) log.info("VerificationTokenService.createEmailCode()");
        verificationTokenRepository.deleteByUserIdentityAndTokenType(localIdentity, tokenType);
        verificationTokenRepository.flush(); // Await DELETE before next INSERT
        String verificationCode = generateRandomCode();
        String hashedToken = jwtService.hashToken(verificationCode);
        AuditToken token = AuditToken
                .builder()
                .tokenHash(hashedToken)
                .tokenType(tokenType)
                .userIdentity(localIdentity)
                .expiresAt(LocalDateTime.now().plusHours(1))
                .revoked(false)
                .build();
        verificationTokenRepository.save(token);
        return verificationCode;
    }

    private String generateRandomCode() {
        if (!isProd) log.info("VerificationTokenService.generateRandomCode() BEGIN");
        int length = 6;
        String chars = "0123456789";
        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            sb.append(chars.charAt(random.nextInt(chars.length())));
        }
        if (!isProd) log.info("VerificationTokenService.generateRandomCode() END");
        return sb.toString();
    }
}
