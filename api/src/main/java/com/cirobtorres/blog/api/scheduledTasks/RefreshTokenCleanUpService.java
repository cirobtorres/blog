package com.cirobtorres.blog.api.scheduledTasks;

import com.cirobtorres.blog.api.jwt.interfaces.RefreshTokenRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

@Service
public class RefreshTokenCleanUpService {
    private final RefreshTokenRepository refreshTokenRepository;
    private static final Logger log = LoggerFactory.getLogger(RefreshTokenCleanUpService.class);

    public RefreshTokenCleanUpService(
            RefreshTokenRepository repository
    ) {
        this.refreshTokenRepository = repository;
    }

    @Scheduled(cron = "0 0 3 * * *")
    @Transactional
    public void deleteExpiredTokens() {
        Instant now = Instant.now();
        long deletedCount = refreshTokenRepository.deleteInvalidTokens(now);
        if (deletedCount > 0) {
            log.info("RefreshTokens deleted: {}", deletedCount);
        }
    }
}
