package com.cirobtorres.blog.api.media.controllers;

import com.cirobtorres.blog.api.media.dtos.MediaDeleteAllDTO;
import com.cirobtorres.blog.api.media.dtos.MediaDTO;
import com.cirobtorres.blog.api.media.dtos.MediaFilesMoveToDTO;
import com.cirobtorres.blog.api.media.dtos.MediaPutDTO;
import com.cirobtorres.blog.api.media.services.MediaService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("media")
public class MediaController {
    private final MediaService mediaService;

    public MediaController(
            MediaService mediaService
    ) {
        this.mediaService = mediaService;
    }

    @GetMapping
    public ResponseEntity<Page<MediaDTO>> listPaged(
            @RequestParam(name = "folder", defaultValue = "Home") String folder,
            @RequestParam(name = "q", defaultValue = "") String q,
            @RequestParam Map<String, String> allParams,
            Pageable pageable
    ) {
        return ResponseEntity.ok(mediaService.listAllPaged(q, folder, allParams, pageable));
    }

    @GetMapping("count")
    public ResponseEntity<Long> countFilesByFolder(
            @RequestParam(defaultValue = "") String folder
    ) {
        return ResponseEntity.ok(mediaService.countFilesByFolder(folder));
    }

    @PutMapping("{id}")
    public ResponseEntity<Void> put(
            @PathVariable UUID id,
            @RequestBody MediaPutDTO mediaPutDTO
            ) {
        mediaService.putMedia(id, mediaPutDTO);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> delete(
            @PathVariable UUID id
    ) throws Exception {
        mediaService.deleteMedia(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteAll(
            @RequestBody MediaDeleteAllDTO fileIdsDTO
            ) {
        mediaService.deleteMediaAll(fileIdsDTO);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("move/all")
    public ResponseEntity<String> updateFolders(
            @RequestBody @Valid MediaFilesMoveToDTO mediaFilesMoveToDTO
    ) {
        mediaService.moveFiles(mediaFilesMoveToDTO);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("sync/check")
    public ResponseEntity<List<Map<String, Object>>> checkSync(
            @RequestParam String folder
    ) throws Exception {
        return ResponseEntity.ok(mediaService.findOrphanFiles(folder));
    }

    @PostMapping("sync/import")
    public ResponseEntity<Void> importMedia(
            @RequestBody List<MediaDTO> mediaList
    ) {
        mediaService.saveAll(mediaList);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
