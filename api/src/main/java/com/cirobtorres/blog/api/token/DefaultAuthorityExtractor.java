package com.cirobtorres.blog.api.token;

import com.cirobtorres.blog.api.role.Role;
import com.cirobtorres.blog.api.user.User;
import io.jsonwebtoken.Claims;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.List;

@Component
public class DefaultAuthorityExtractor implements AuthorityExtractor {
    @Override
    public List<String> fromUser(User user) {
        return fromRoles(user.getRoles());
    }

    @Override
    public List<String> fromRoles(Collection<Role> roles) {
        return roles.stream()
                .map(Role::getName)
                .toList();
    }

    @Override
    public List<String> fromClaims(Claims claims) {
        Object raw = claims.get("authorities");
        if (!(raw instanceof Collection<?> collection)) {
            return List.of();
        }

        return collection.stream()
                .map(Object::toString)
                .toList();
    }
}
