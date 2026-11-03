package com.cirobtorres.blog.api.services;

import com.cirobtorres.blog.api.dtos.*;
import com.cirobtorres.blog.api.entities.Media;
import com.cirobtorres.blog.api.exceptions.StorageException;
import com.cirobtorres.blog.api.repositories.MediaRepository;
import com.cirobtorres.blog.api.entities.MediaFolder;
import com.cirobtorres.blog.api.repositories.MediaFolderRepository;
import com.cirobtorres.blog.api.repositories.MediaStorage;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.jspecify.annotations.NonNull;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class MediaFolderService {
    private final MediaStorage mediaStorage;
    private final MediaRepository mediaRepository;
    private final MediaFolderRepository mediaFolderRepository;

    public MediaFolderService(
            MediaStorage mediaStorage,
            MediaRepository mediaRepository,
            MediaFolderRepository mediaFolderRepository
    ) {
        this.mediaStorage = mediaStorage;
        this.mediaRepository = mediaRepository;
        this.mediaFolderRepository = mediaFolderRepository;
    }

    public List<MediaFolderCountDTO> listSubfoldersWithCounts(String parentPath) {
        return mediaFolderRepository.findSubfoldersWithCounts(parentPath);
    }

    @Transactional
    public Long countSubfoldersByPath(String folder) {
        MediaFolder parent = mediaFolderRepository.findByPath(folder)
                .orElseThrow(
                        () -> new EntityNotFoundException("Folder: {" + folder + "} not found.")
                );

        return (long) parent.getSubfolders().size();
    }

    @Transactional
    public MediaFolder createFolder(@NonNull MediaFolderCreateDTO mediaFolderDTO) {
        MediaFolder parent = mediaFolderDTO.parentFolderId() == null
                ? mediaFolderRepository.findByPath("/").orElseThrow(() -> new EntityNotFoundException("Home folder not found"))
                : mediaFolderRepository.findById(mediaFolderDTO.parentFolderId()).orElseThrow(() -> new EntityNotFoundException("Parent folder not found"));
        String fullPath = parent.getPath().equals("/")
                ? "/" + mediaFolderDTO.folderName()
                : parent.getPath() + "/" + mediaFolderDTO.folderName();

        // Validation
        if (mediaFolderRepository.existsByPath(fullPath)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Folder already exists.");
        }

        // Building
        MediaFolder folder = MediaFolder
                .builder()
                .name(mediaFolderDTO.folderName())
                .path(fullPath)
                .parent(parent)
                .build();

        return mediaFolderRepository.save(folder);
    }

    @Transactional
    public void deleteFolder(@NonNull UUID id) {
        MediaFolder folderToDelete = mediaFolderRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(
                                "Folder not found: " + id
                        )
                );

        List<Media> allMedia = new ArrayList<>();
        findAllMediaRecursive(folderToDelete, allMedia);

        if (!allMedia.isEmpty()) {
            try {
                mediaStorage.deleteAll(toRefs(allMedia));
            } catch (StorageException e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error deleting files from storage", e);
            }
        }

        mediaFolderRepository.delete(folderToDelete);
    }

    @Transactional
    public void deleteAllFolders(@Valid MediaFoldersDeleteDTO foldersIdDTO) {
        List<UUID> ids = foldersIdDTO.foldersId();

        List<MediaFolder> folderList = mediaFolderRepository.findAllById(ids);

        if (folderList.isEmpty()) {
            return;
        }

        List<Media> allMediaEntities = new ArrayList<>();
        for (MediaFolder folder : folderList) {
            findAllMediaRecursive(folder, allMediaEntities);
        }

        // Because we are inside a @Transactional, a StorageException (RuntimeException) triggers a rollback
        if (!allMediaEntities.isEmpty()) {
            mediaStorage.deleteAll(toRefs(allMediaEntities));
        }

        if (!allMediaEntities.isEmpty()) {
            mediaRepository.deleteAllInBatch(allMediaEntities);
        }

        mediaFolderRepository.deleteAllInBatch(folderList);
    }

    @Transactional
    public void updateFolder(@Valid @NonNull MediaFolderPutDTO dto) {
        MediaFolder currentFolder = mediaFolderRepository.findById(dto.currentFolderId())
                .orElseThrow(
                        () -> new EntityNotFoundException("Current folder not found: .")
                );

        MediaFolder destinationFolder = dto.parentFolderId() == null
                ? mediaFolderRepository.findByPath("/").orElseThrow(() -> new EntityNotFoundException("Home folder not found"))
                : mediaFolderRepository.findById(dto.parentFolderId())
                .orElseThrow(
                        () -> new EntityNotFoundException("Destination folder not found.")
                );

        if (destinationFolder.getPath().startsWith(currentFolder.getPath() + "/")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You can't move a folder to inside any of its own children folders.");
        }

        if (destinationFolder.getPath().equals(currentFolder.getPath())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A folder cannot be descendant of itself.");
        }

        boolean nameExistsInDestination = destinationFolder.getSubfolders().stream()
                .anyMatch(f -> f.getName().equalsIgnoreCase(dto.newName()) && !f.getId().equals(currentFolder.getId()));

        if (nameExistsInDestination) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "A folder with the same name already exists on the destination folder.");
        }

        String oldPath = currentFolder.getPath();
        String newPath = destinationFolder.getPath().equals("/")
                ? "/" + dto.newName()
                : destinationFolder.getPath() + "/" + dto.newName();
        newPath = newPath.replaceAll("//+", "/");

        currentFolder.setName(dto.newName());
        currentFolder.setParent(destinationFolder);
        currentFolder.setPath(newPath);

        mediaFolderRepository.updateDescendantsPaths(oldPath, newPath);
    }

    @Transactional
    public Boolean existsByPath(@NonNull MediaFolderExistsDTO mediaFolderExistsDTO) {
        MediaFolder parent = mediaFolderExistsDTO.parentFolderId() == null
                ? mediaFolderRepository.findByPath("/").orElseThrow(() -> new EntityNotFoundException("Home folder not found"))
                : mediaFolderRepository.findById(mediaFolderExistsDTO.parentFolderId()).orElseThrow(() -> new EntityNotFoundException("Parent folder not found"));
        String path = parent.getPath().equals("/")
                ? "/" + mediaFolderExistsDTO.folderName()
                : parent.getPath() + "/" + mediaFolderExistsDTO.folderName();
        return mediaFolderRepository.existsByPath(path);
    }

    @Transactional
    public void moveFolders(@Valid MediaFoldersMoveToDTO mediaFoldersMoveToDTO) {
        MediaFolder destination = mediaFoldersMoveToDTO.parentFolderId() == null
                ? mediaFolderRepository.findByPath("/").orElseThrow(() -> new EntityNotFoundException("Home folder not found"))
                : mediaFolderRepository.findById(mediaFoldersMoveToDTO.parentFolderId())
                .orElseThrow(
                        () -> new EntityNotFoundException("Destination folder not found: " + mediaFoldersMoveToDTO.parentFolderId())
                );

        // QUERY ALL
        List<MediaFolder> sources = mediaFolderRepository.findAllById(mediaFoldersMoveToDTO.foldersId().values());

        // UPDATE EACH
        for (MediaFolder source : sources) {
            // VALIDATIONS
            if (source.getId().equals(destination.getId())) {
                throw new IllegalArgumentException(
                        "A folder cannot be descendant of itself: " + source.getName()
                );
            }

            if (destination.getPath().startsWith(source.getPath() + "/")) {
                throw new IllegalArgumentException(
                        "You can't move a folder to inside any of its own children folders: " + source.getName()
                );
            }

            // UPDATE
            String oldPath = source.getPath();
            String newPath = destination.getPath().equals("/")
                    ? "/" + source.getName()
                    : destination.getPath() + "/" + source.getName();
            newPath = newPath.replaceAll("//+", "/");

            source.setParent(destination);
            source.setPath(newPath);

            mediaFolderRepository.updatePathAndDescendants(oldPath, newPath);
        }

        mediaFolderRepository.saveAll(sources);
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

    private List<ObjectRefDTO> toRefs(List<Media> mediaList) {
        return mediaList.stream()
                .map(media -> new ObjectRefDTO(media.getPublicId(), media.getType()))
                .toList();
    }

    private void findAllMediaRecursive(MediaFolder folder, List<Media> mediaCollector) {
        if (folder.getFiles() != null) {
            mediaCollector.addAll(folder.getFiles());
        }
        for (MediaFolder subfolder : folder.getSubfolders()) {
            findAllMediaRecursive(subfolder, mediaCollector);
        }
    }
}
