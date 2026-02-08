package com.cirobtorres.blog.api.token;

import com.cirobtorres.blog.api.role.Role;
import com.cirobtorres.blog.api.user.User;
import io.jsonwebtoken.Claims;

import java.util.Collection;
import java.util.List;

public interface AuthorityExtractor {
    List<String> fromUser(User user);

    List<String> fromRoles(Collection<Role> roles);

    List<String> fromClaims(Claims claims);
}
