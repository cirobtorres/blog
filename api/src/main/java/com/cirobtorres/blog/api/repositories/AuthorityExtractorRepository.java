package com.cirobtorres.blog.api.repositories;

import com.cirobtorres.blog.api.entities.User;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.List;
import java.util.UUID;

public interface AuthorityExtractorRepository {
    List<String> fromJwt(Jwt jwt);
    List<String> fromUserId(UUID userId);
    List<String> fromUser(User user);
}
