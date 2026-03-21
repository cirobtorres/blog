package com.cirobtorres.blog.api.media.controllers;

import com.cirobtorres.blog.api.media.dtos.MediaDTO;
import com.cirobtorres.blog.api.media.entities.Media;
import com.cirobtorres.blog.api.media.services.MediaService;
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

    @GetMapping
    public ResponseEntity<List<Media>> listByFolder(
            @RequestParam String folder
    ) {
        List<Media> mediaList = mediaService.listAllInFolder(folder);
        return ResponseEntity.ok(mediaList);
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
