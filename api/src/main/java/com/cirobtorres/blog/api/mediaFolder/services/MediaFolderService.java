package com.cirobtorres.blog.api.mediaFolder.services;

import com.cirobtorres.blog.api.mediaFolder.dtos.MediaFolderCountDTO;
import com.cirobtorres.blog.api.mediaFolder.dtos.MediaFolderDTO;
import com.cirobtorres.blog.api.mediaFolder.dtos.MediaFoldersDTO;
import com.cirobtorres.blog.api.mediaFolder.entities.MediaFolder;
import com.cirobtorres.blog.api.mediaFolder.repositories.MediaFolderRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class MediaFolderService {
    private final MediaFolderRepository mediaFolderRepository;

    public MediaFolderService(
            MediaFolderRepository mediaFolderRepository
    ) {
        this.mediaFolderRepository = mediaFolderRepository;
    }

    public List<MediaFolderCountDTO> listSubfolders(String parentPath) {
        return mediaFolderRepository.findSubfoldersWithCounts(parentPath);
    }

    @Transactional
    public MediaFolder createFolder(MediaFolderDTO mediaFolderDTO) {
        String fullPath = mediaFolderDTO.path();
        System.out.println(fullPath);

        // Validation
        if (mediaFolderRepository.existsByPath(fullPath)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Folder already exists.");
        }

        // Name
        String name = fullPath.contains("/") ?
                fullPath.substring(fullPath.lastIndexOf("/") + 1) :
                fullPath;

        // Parent
        MediaFolder parent = null;
        String parentPath;
        int lastSlashIndex = fullPath.lastIndexOf("/");
        if (lastSlashIndex <= 0) {
            parentPath = "/";
        } else {
            parentPath = fullPath.substring(0, lastSlashIndex);
        }

        parent = mediaFolderRepository.findByPath(parentPath)
                .orElseThrow(
                        () -> new EntityNotFoundException("Parent folder not found: " + parentPath)
                );

        // Building
        MediaFolder folder = MediaFolder
                .builder()
                .name(name)
                .path(fullPath)
                .parent(parent)
                .build();

        return mediaFolderRepository.save(folder);
    }

    @Modifying
    @Transactional
    public void deleteFolder(MediaFolderDTO mediaFolderDTO) {
        String path = mediaFolderDTO.path();
        mediaFolderRepository.deleteByPath(path);
    }

    @Transactional
    public Boolean existsByPath(MediaFolderCountDTO mediaFolderCountDTO) {
        String path = mediaFolderCountDTO.path();
        return mediaFolderRepository.existsByPath(path);
    }

    @Transactional
    public Long countAllFolders() {
        String homeFolder = "Home";
        return mediaFolderRepository.countByNameNot(homeFolder);
    }

    @Transactional
    public List<MediaFoldersDTO> listAllFolders() {
         return mediaFolderRepository.findAll().stream()
                 .map(mediaFolder ->
                         new MediaFoldersDTO(
                                 mediaFolder.getId(),
                                 mediaFolder.getParent() != null ?
                                         mediaFolder.getParent().getId() :
                                         null,
                                 mediaFolder.getName(),
                                 mediaFolder.getPath()
                         )
                 )
                 .toList();
    }
}
