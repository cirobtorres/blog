package com.cirobtorres.blog.api.authority.services;

import com.cirobtorres.blog.api.authority.entities.Authority;
import com.cirobtorres.blog.api.authority.enums.AuthorityType;
import com.cirobtorres.blog.api.authority.interfaces.AuthorityRepository;
import com.cirobtorres.blog.api.user.entities.User;
import org.jspecify.annotations.NonNull;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class AuthorityService {
    private final AuthorityRepository authorityRepository;

    public AuthorityService(AuthorityRepository authorityRepository) {
        this.authorityRepository = authorityRepository;
    }

    public @NonNull Authority getDefaultUserAuthority() {
        return authorityRepository.findByName(AuthorityType.USER)
                .orElseThrow(
                        () -> new IllegalStateException("Authority USER not found")
                );
    }

    public @NonNull Set<Authority> setUserAuthority(@NonNull User user, AuthorityType... types) {
        Set<Authority> authorities = new HashSet<>();
        for (AuthorityType type : types) {
            authorities.add(authorityRepository.findByName(type)
                    .orElseThrow(
                            () -> new IllegalStateException("Authority " + type + " not found")
                    )
            );
        }
        return authorities;
    }

    public @NonNull Set<Authority> addUserAuthority(@NonNull User user, AuthorityType... types) {
        for (AuthorityType type : types) {
            Authority authority = authorityRepository.findByName(type)
                    .orElseThrow(() -> new IllegalStateException("Authority " + type + " not found"));

            user.getAuthorities().add(authority);
        }
        return user.getAuthorities();
    }

    public @NonNull Set<Authority> removeUserAuthority(@NonNull User user, AuthorityType... types) {
        for (AuthorityType type : types) {
            authorityRepository.findByName(type).ifPresent(authority -> {
                user.getAuthorities().remove(authority);
            });
        }
        return user.getAuthorities();
    }
}
