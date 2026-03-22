package com.cirobtorres.blog.api.media.controllers;

import com.cirobtorres.blog.api.media.dtos.MediaDTO;
import com.cirobtorres.blog.api.media.entities.Media;
import com.cirobtorres.blog.api.media.services.MediaService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/media")
public class MediaController {
    private final MediaService mediaService;

    public MediaController(
            MediaService mediaService
    ) {
        this.mediaService = mediaService;
    }

    @GetMapping("/count")
    public ResponseEntity<Long> countByFolder(@RequestParam(defaultValue = "") String folder) {
        return ResponseEntity.ok(mediaService.countFilesByFolder(folder));
    }

    // @GetMapping
    // public ResponseEntity<List<MediaDTO>> listAll() {
    //     return ResponseEntity.ok(mediaService.listAllMediaDTO());
    // }

    @GetMapping
    public ResponseEntity<Page<MediaDTO>> listPaged(
            @RequestParam(defaultValue = "Home") String folder,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return ResponseEntity.ok(mediaService.listAllPaged(folder, pageable));
    }

    @GetMapping(params = "folder")
    public ResponseEntity<List<Media>> listByFolder(
            @RequestParam String folder
    ) {
        List<Media> mediaList = mediaService.listAllInFolder(folder);
        return ResponseEntity.ok(mediaList);
    }

    @PostMapping("/{id}")
    public ResponseEntity<Void> put(
            @PathVariable UUID id
    ) throws Exception {
        mediaService.putMedia(id);
        return ResponseEntity.noContent().build();
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable UUID id
    ) throws Exception {
        mediaService.deleteMedia(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/sync/check")
    public ResponseEntity<List<Map<String, Object>>> checkSync(
            @RequestParam String folder
    ) throws Exception {
        return ResponseEntity.ok(mediaService.findOrphanFiles(folder));
    }

    @PostMapping("/sync/import")
    public ResponseEntity<Void> importMedia(
            @RequestBody List<MediaDTO> mediaList,
            Authentication auth
    ) {
        mediaService.saveAll(mediaList);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
