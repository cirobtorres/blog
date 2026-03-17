package com.cirobtorres.blog.api.auditToken;

import com.cirobtorres.blog.api.auditToken.repositories.AuditTokenRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class AuditTokenCleanUpService {
    private final AuditTokenRepository auditTokenRepository;
    private static final Logger log = LoggerFactory.getLogger(AuditTokenCleanUpService.class);

    public AuditTokenCleanUpService(
            AuditTokenRepository auditTokenRepository
    ) {
        this.auditTokenRepository = auditTokenRepository;
    }

    @Scheduled(cron = "0 0 3 * * *")
    @Transactional
    public void deleteExpiredTokens() {
        LocalDateTime now = LocalDateTime.now();
        long deletedCount = auditTokenRepository.deleteInvalidTokens(now);
        if (deletedCount > 0) {
            log.info("AuditTokens deleted: {}", deletedCount);
        }
    }
}
