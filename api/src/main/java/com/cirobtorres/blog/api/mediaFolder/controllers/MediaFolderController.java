package com.cirobtorres.blog.api.mediaFolder.controllers;

import com.cirobtorres.blog.api.mediaFolder.dtos.*;
import com.cirobtorres.blog.api.mediaFolder.entities.MediaFolder;
import com.cirobtorres.blog.api.mediaFolder.services.MediaFolderService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/media/folders")
public class MediaFolderController {
    private final MediaFolderService mediaFolderService;
    private static final Logger log = LoggerFactory.getLogger(MediaFolderController.class);

    public MediaFolderController(
            MediaFolderService mediaFolderService
    ) {
        this.mediaFolderService = mediaFolderService;
    }

    @GetMapping
    public ResponseEntity<List<MediaFolderCountDTO>> listSubfoldersWithCounts(
            @RequestParam String folder
    ) {
        List<MediaFolderCountDTO> mediaFolderCountDTOS =
                mediaFolderService.listSubfoldersWithCounts(folder);
        return ResponseEntity.ok(mediaFolderCountDTOS);
    }

    @PostMapping
    public ResponseEntity<String> createFolder(
            @RequestBody @Valid MediaFolderCreateDTO mediaFolderDTO
    ) {
        MediaFolder newFolder = mediaFolderService.createFolder(mediaFolderDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(newFolder.getPath());
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> delete(
            @PathVariable UUID id
    ) {
        mediaFolderService.deleteFolder(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteAll(
            @RequestBody @Valid MediaFoldersDeleteDTO foldersIdDTO
    ) {
        mediaFolderService.deleteAllFolders(foldersIdDTO);
        return ResponseEntity.noContent().build();
    }

    @PutMapping
    public ResponseEntity<String> updateFolder(
            @RequestBody @Valid MediaFolderPutDTO mediaFolderPutDTO
    ) {
        mediaFolderService.updateFolder(mediaFolderPutDTO);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("move/all")
    public ResponseEntity<String> updateFolders(
            @RequestBody @Valid MediaFoldersMoveToDTO moveFoldersToDTO
    ) {
        mediaFolderService.moveFolders(moveFoldersToDTO);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("all")
    public ResponseEntity<List<MediaFoldersDTO>> listAllFolders() {
        return ResponseEntity.ok(
                mediaFolderService.listAllFolders()
        );
    }

    @PostMapping("exists")
    public ResponseEntity<Boolean> existsByPath(
            @RequestBody @Valid MediaFolderExistsDTO mediaFolderCountDTO
    ) {
        return ResponseEntity.ok(mediaFolderService.existsByPath(mediaFolderCountDTO));
    }

    @GetMapping("count")
    public ResponseEntity<Long> countFolders(
            @RequestParam(defaultValue = "/") String folder
    ) {
        return ResponseEntity.ok(mediaFolderService.countSubfoldersByPath(folder));
    }
}
