package com.cirobtorres.blog.api.jwt;

import com.cirobtorres.blog.api.jwt.interfaces.AuthorityExtractorRepository;
import com.cirobtorres.blog.api.user.entities.User;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@Component
public class AuthorityExtractor implements AuthorityExtractorRepository {
    @Override
    public List<String> fromJwt(Jwt jwt) {
        List<String> authorities = jwt.getClaimAsStringList("authorities");
        return authorities != null ? authorities : List.of();
    }

    @Override
    public List<String> fromUser(User user) {
        if (user.getAuthorities() == null) {
            return List.of();
        }
        return user.getAuthorities().stream().map(authority -> authority.getName().name()).toList();
    }

    @Override
    public List<String> fromUserId(UUID userId) {
        return List.of();
    }
}
