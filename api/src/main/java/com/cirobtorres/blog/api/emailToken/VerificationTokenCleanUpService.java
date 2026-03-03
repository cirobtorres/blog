package com.cirobtorres.blog.api.emailToken;

import com.cirobtorres.blog.api.emailToken.repositories.VerificationTokenRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class VerificationTokenCleanUpService {
    private final VerificationTokenRepository verificationTokenRepository;
    private final long EMAIL_TOKEN_CLEAN_UP_SCHEDULE_TIME = 24 * 60 * 60 * 1000;
    private static final Logger log = LoggerFactory.getLogger(VerificationTokenCleanUpService.class);

    public VerificationTokenCleanUpService(
            VerificationTokenRepository verificationTokenRepository
    ) {
        this.verificationTokenRepository = verificationTokenRepository;
    }

    @Scheduled(fixedRate = EMAIL_TOKEN_CLEAN_UP_SCHEDULE_TIME)
    @Transactional
    public void deleteExpiredTokens() {
        LocalDateTime now = LocalDateTime.now();
        long deletedCount = verificationTokenRepository.deleteByExpiryDateBefore(now);
        if (deletedCount > 0) {
            log.info("Unused (expired) email validation tokens deleted: {}", deletedCount);
        }
    }
}
