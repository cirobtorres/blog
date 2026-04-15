package com.cirobtorres.blog.api.tag.services;

import com.cirobtorres.blog.api.tag.dtos.TagCreateDTO;
import com.cirobtorres.blog.api.tag.dtos.TagDTO;
import com.cirobtorres.blog.api.tag.entities.Tag;
import com.cirobtorres.blog.api.tag.repositories.TagRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class TagService {
    private final TagRepository tagRepository;

    public TagService(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    @Transactional
    public TagDTO getTagById(String id) {
        UUID uuid = UUID.fromString(id);

        Tag tag = tagRepository
                .findById(uuid)
                .orElseThrow(
                        () -> new EntityNotFoundException(
                                "Tag of uuid=" + uuid + " not found"
                        )
                );

        return new TagDTO(tag);
    }

    @Transactional
    public TagDTO getTagBySlug(String slug) {
        Tag tag = tagRepository
                .findBySlug(slug)
                .orElseThrow(
                        () -> new EntityNotFoundException(
                                "Tag of slug=" + slug + " not found"
                        )
                );

        return new TagDTO(tag);
    }

    @Transactional
    public TagDTO postTag(TagCreateDTO tagCreateDTO) {
        String name = tagCreateDTO.name();
        String slug = tagCreateDTO.slug();

        Tag tagEntity = Tag
                .builder()
                .name(name)
                .slug(slug)
                .build();

        Tag tag = tagRepository.save(tagEntity);

        return new TagDTO(tag);
    }

    public Page<TagDTO> getAllTags(Pageable pageable) {
        return tagRepository.findAll(pageable).map(TagDTO::new);
    }

    public void deleteTagById(String id) {
        UUID uuid = UUID.fromString(id);

        Tag tag = tagRepository.findById(uuid)
                .orElseThrow(() -> new EntityNotFoundException(
                                "Tag of uuid=" + uuid + " not found"
                        )
                );


        tagRepository.delete(tag);
    }

    public void deleteTagBySlug(String slug) {
        Tag tag = tagRepository.findBySlug(slug)
                .orElseThrow(() -> new EntityNotFoundException(
                                "Tag of slug=" + slug + " not found"
                        )
                );

        tagRepository.delete(tag);
    }
}
