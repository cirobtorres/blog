package com.cirobtorres.blog.api.emailToken.services;

import com.cirobtorres.blog.api.ApiApplicationProperties;
import com.cirobtorres.blog.api.emailToken.entities.VerificationToken;
import com.cirobtorres.blog.api.emailToken.repositories.VerificationTokenRepository;
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
public class VerificationTokenService {
    private final VerificationTokenRepository verificationTokenRepository;
    private final JwtService jwtService;
    private final boolean isProd;
    private static final Logger log = LoggerFactory.getLogger(VerificationTokenService.class);

    public VerificationTokenService(
            ApiApplicationProperties apiApplicationProperties,
            VerificationTokenRepository verificationTokenRepository,
            JwtService jwtService
    ) {
        this.verificationTokenRepository = verificationTokenRepository;
        this.isProd = apiApplicationProperties.getApplication().isProduction();
        this.jwtService = jwtService;
    }

    @Transactional
    public String createEmailCode(UserIdentity localIdentity) throws NoSuchAlgorithmException {
        if (!isProd) log.info("VerificationTokenService.createEmailCode");
        verificationTokenRepository.deleteByUserIdentity(localIdentity);
        String verificationCode = generateRandomCode(6);
        VerificationToken vToken = new VerificationToken();
        String hashedVToken = jwtService.hashToken(verificationCode);
        vToken.setTokenHash(hashedVToken);
        vToken.setUserIdentity(localIdentity);
        vToken.setExpiryDate(LocalDateTime.now().plusHours(1));
        verificationTokenRepository.save(vToken);
        return verificationCode;
    }

    public String generateRandomCode(int length) {
        if (!isProd) log.info("VerificationTokenService.generateRandomCode");
        String chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            sb.append(chars.charAt(random.nextInt(chars.length())));
        }
        return sb.toString();
    }
}
