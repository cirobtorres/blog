package com.cirobtorres.blog.api.tag.controllers;

import com.cirobtorres.blog.api.tag.dtos.TagCreateDTO;
import com.cirobtorres.blog.api.tag.dtos.TagDTO;
import com.cirobtorres.blog.api.tag.services.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("tags")
public class TagController {
    private final TagService tagService;

    @Autowired
    public TagController(TagService tagService) {
        this.tagService = tagService;
    }

    @GetMapping("id/{id}")
    public ResponseEntity<TagDTO> getTagById(
            @PathVariable String id
    ) {
        TagDTO tagDTO = tagService.getTagById(id);
        return ResponseEntity.ok(tagDTO);
    }

    @GetMapping("slug/{slug}")
    public ResponseEntity<TagDTO> getTagBySlug(
            @PathVariable String slug
    ) {
        TagDTO tagDTO = tagService.getTagBySlug(slug);
        return ResponseEntity.ok(tagDTO);
    }

    @GetMapping
    public ResponseEntity<Page<TagDTO>> getAllTags(
            @PageableDefault(
                    sort = "name",
                    direction = Sort.Direction.ASC,
                    size = 100
            ) Pageable pageable
    ) {
        Page<TagDTO> tagDTOs = tagService.getAllTags(pageable);
        return ResponseEntity.ok(tagDTOs);
    }

    @PostMapping
    public ResponseEntity<TagDTO> postTag(
            @RequestBody TagCreateDTO tagCreateDTO
    ) {
        TagDTO tagDTO = tagService.postTag(tagCreateDTO);
        return ResponseEntity.ok(tagDTO);
    }

    @DeleteMapping("id/{id}")
    public ResponseEntity<Void> deleteTagById(
            @PathVariable String id
    ) {
        tagService.deleteTagById(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("slug/{slug}")
    public ResponseEntity<Void> deleteTagBySlug(
            @PathVariable String slug
    ) {
        tagService.deleteTagBySlug(slug);
        return ResponseEntity.noContent().build();
    }
}
