package com.cirobtorres.blog.api.tag.services;

import com.cirobtorres.blog.api.tag.repositories.TagRepository;
import org.springframework.stereotype.Service;

@Service
public class TagService {
    private final TagRepository tagRepository;

    public TagService(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }
}
