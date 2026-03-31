package com.cirobtorres.blog.api.mediaFolder.services;

import com.cirobtorres.blog.api.media.repositories.MediaRepository;
import com.cirobtorres.blog.api.mediaFolder.dtos.*;
import com.cirobtorres.blog.api.mediaFolder.entities.MediaFolder;
import com.cirobtorres.blog.api.mediaFolder.repositories.MediaFolderRepository;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.jspecify.annotations.NonNull;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class MediaFolderService {
    private final Cloudinary cloudinary;
    private final MediaFolderRepository mediaFolderRepository;

    public MediaFolderService(
            Cloudinary cloudinary,
            MediaFolderRepository mediaFolderRepository
    ) {
        this.cloudinary = cloudinary;
        this.mediaFolderRepository = mediaFolderRepository;
    }

    public List<MediaFolderCountDTO> listSubfoldersWithCounts(String parentPath) {
        return mediaFolderRepository.findSubfoldersWithCounts(parentPath);
    }

    @Transactional
    public Long countSubfoldersByPath(String folder) {
        MediaFolder parent = mediaFolderRepository.findByPath(folder)
                .orElseThrow(() -> new EntityNotFoundException("Folder: {" + folder + "} not found."));

        return (long) parent.getSubfolders().size();
    }

    @Transactional
    public MediaFolder createFolder(@NonNull MediaFolderDTO mediaFolderDTO) {
        String fullPath = mediaFolderDTO.path();

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

    @Transactional
    public void deleteFolder(@NonNull MediaFolderDTO mediaFolderDTO) {
        MediaFolder folderToDelete = mediaFolderRepository.findByPath(mediaFolderDTO.path())
                .orElseThrow(() -> new EntityNotFoundException(
                        "Folder not found: " + mediaFolderDTO.path()
                        )
                );

        List<String> publicIds = new ArrayList<>();
        findAllPublicIdsRecursive(folderToDelete, publicIds);

        if (!publicIds.isEmpty()) {
            try {
                for (int i = 0; i < publicIds.size(); i += 100) {
                    List<String> batch = publicIds.subList(i, Math.min(i + 100, publicIds.size()));
                    cloudinary.api().deleteResources(batch, ObjectUtils.emptyMap());
                }
            } catch (Exception e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error deleting files from Cloudinary");
            }
        }

        mediaFolderRepository.delete(folderToDelete);
    }

    @Transactional
    public void updateFolder(@Valid @NonNull MediaFolderPutDTO dto) {
        MediaFolder currentFolder = mediaFolderRepository.findByPath(dto.currentPath())
                .orElseThrow(() -> new EntityNotFoundException("Current folder not found: ."));

        MediaFolder destinationFolder = mediaFolderRepository.findByPath(dto.newDestinationPath())
                .orElseThrow(() -> new EntityNotFoundException("Destination folder not found."));

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
    public Boolean existsByPath(@NonNull MediaFolderCountDTO mediaFolderCountDTO) {
        String path = mediaFolderCountDTO.path();
        return mediaFolderRepository.existsByPath(path);
    }

    @Transactional
    public void moveFolders(@Valid MediaFoldersMoveToDTO dto) {
        MediaFolder destination = mediaFolderRepository.findByPath(dto.folderDestination())
                .orElseThrow(
                        () -> new EntityNotFoundException("Destination folder not found: " + dto.folderDestination())
                );

        // QUERY ALL
        List<MediaFolder> sources = mediaFolderRepository.findAllById(dto.foldersId().values());

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

    private void findAllPublicIdsRecursive(MediaFolder folder, List<String> publicIds) {
        folder.getFiles().forEach(media -> publicIds.add(media.getPublicId()));
        for (MediaFolder subfolder : folder.getSubfolders()) {
            findAllPublicIdsRecursive(subfolder, publicIds);
        }
    }
}
