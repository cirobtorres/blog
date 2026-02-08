package com.cirobtorres.blog.api.token;

import com.cirobtorres.blog.api.ApiApplicationProperties;
import com.cirobtorres.blog.api.role.Role;
import com.cirobtorres.blog.api.user.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class JwtService {
    private final SecretKey key;
    private final ApiApplicationProperties apiApplicationProperties;
    private final AuthorityExtractor authorityExtractor;

    public JwtService(
            @Value("${JWT_SECRET}") String secret,
            ApiApplicationProperties properties,
            AuthorityExtractor authorityExtractor
    ) {
        this.key = Keys.hmacShaKeyFor(Base64.getDecoder().decode(secret));
        this.apiApplicationProperties = properties;
        this.authorityExtractor = authorityExtractor;
    }

    public String generateToken(
            String subject,
            String type,
            List<String> authorities,
            List<String> scopes
    ) {
        List<String> finalAuthorities = new ArrayList<>(authorities);
        if (scopes != null) finalAuthorities.addAll(scopes);

        return Jwts.builder()
                .setSubject(subject)
                .claim("type", type)
                .claim("authorities", finalAuthorities)
                .setIssuedAt(new Date())
                .setExpiration(new Date(
                        System.currentTimeMillis() +
                                apiApplicationProperties.getJwt().getExpiration()
                        )
                )
                .signWith(key)
                .compact();
    }

    public Authentication parse(String token) {
        try {
            Jws<Claims> jws = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);

            Claims claims = jws.getBody();
            String subject = claims.getSubject();

            List<String> auths = authorityExtractor.fromClaims(claims);

            Collection<SimpleGrantedAuthority> authorities = auths.stream()
                    .map(SimpleGrantedAuthority::new)
                    .collect(Collectors.toList());

            return new UsernamePasswordAuthenticationToken(subject, null, authorities);

        } catch (Exception e) {
            return null;
        }
    }
}
