package com.cirobtorres.blog.api.mediaFolder.controllers;

import com.cirobtorres.blog.api.mediaFolder.dtos.MediaFolderCountDTO;
import com.cirobtorres.blog.api.mediaFolder.dtos.MediaFolderDTO;
import com.cirobtorres.blog.api.mediaFolder.dtos.MediaFoldersDTO;
import com.cirobtorres.blog.api.mediaFolder.entities.MediaFolder;
import com.cirobtorres.blog.api.mediaFolder.services.MediaFolderService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity<List<MediaFolderCountDTO>> listChildFolders(
            @RequestParam(defaultValue = "Home") String folder
    ) {
        return ResponseEntity.ok(mediaFolderService.listSubfolders(folder));
    }

    @PostMapping
    public ResponseEntity<String> createFolder(
            @RequestBody @Valid MediaFolderDTO mediaFolderDTO
    ) {
        MediaFolder newFolder = mediaFolderService.createFolder(mediaFolderDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(newFolder.getPath());
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteFolder(
            @RequestBody @Valid MediaFolderDTO mediaFolderDTO
    ) {
        mediaFolderService.deleteFolder(mediaFolderDTO);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/all")
    public ResponseEntity<List<MediaFoldersDTO>> listFolders() {
        return ResponseEntity.ok(mediaFolderService.listAllFolders());
    }

    @PostMapping("/exists")
    public ResponseEntity<Boolean> existsByPath(
            @RequestBody @Valid MediaFolderCountDTO mediaFolderCountDTO
    ) {
        return ResponseEntity.ok(mediaFolderService.existsByPath(mediaFolderCountDTO));
    }

    @GetMapping("/count")
    public ResponseEntity<Long> countAllFolders() {
        return ResponseEntity.ok(mediaFolderService.countAllFolders());
    }
}
