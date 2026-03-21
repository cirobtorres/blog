package com.cirobtorres.blog.api.authority;

import com.cirobtorres.blog.api.authority.entities.Authority;
import com.cirobtorres.blog.api.authority.enums.AuthorityType;
import com.cirobtorres.blog.api.authority.interfaces.AuthorityRepository;
import org.jspecify.annotations.NonNull;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class AuthorityInitializer implements ApplicationRunner {
    private final AuthorityRepository authorityRepository;

    public AuthorityInitializer(AuthorityRepository authorityRepository) {
        this.authorityRepository = authorityRepository;
    }

    @Override
    public void run(@NonNull ApplicationArguments args) {
        for (AuthorityType authorityEnum : AuthorityType.values()) {
            authorityRepository.findByName(authorityEnum)
                    .orElseGet(() -> {
                        Authority authority = Authority
                                .builder()
                                .authorityType(authorityEnum)
                                .build();
                        return authorityRepository.save(authority);
                    });
        }
    }
}