package com.cirobtorres.blog.api.mediaFolder.services;

import com.cirobtorres.blog.api.media.repositories.MediaRepository;
import com.cirobtorres.blog.api.mediaFolder.dtos.MediaFolderCountDTO;
import com.cirobtorres.blog.api.mediaFolder.dtos.MediaFolderDTO;
import com.cirobtorres.blog.api.mediaFolder.dtos.MediaFolderPutDTO;
import com.cirobtorres.blog.api.mediaFolder.dtos.MediaFoldersDTO;
import com.cirobtorres.blog.api.mediaFolder.entities.MediaFolder;
import com.cirobtorres.blog.api.mediaFolder.repositories.MediaFolderRepository;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.jspecify.annotations.NonNull;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

@Service
public class MediaFolderService {
    private final Cloudinary cloudinary;
    private final MediaFolderRepository mediaFolderRepository;
    private final MediaRepository mediaRepository;

    public MediaFolderService(
            Cloudinary cloudinary,
            MediaFolderRepository mediaFolderRepository,
            MediaRepository mediaRepository
    ) {
        this.cloudinary = cloudinary;
        this.mediaFolderRepository = mediaFolderRepository;
        this.mediaRepository = mediaRepository;
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

        boolean nameExistsInDestination = destinationFolder.getSubfolders().stream()
                .anyMatch(f -> f.getName().equalsIgnoreCase(dto.newName()) && !f.getId().equals(currentFolder.getId()));

        if (nameExistsInDestination) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "A folder with the same name already exists on the destination folder.");
        }

        String oldPath = currentFolder.getPath();
        String newPath = destinationFolder.getPath().equals("/")
                ? "/" + dto.newName()
                : destinationFolder.getPath() + "/" + dto.newName();

        currentFolder.setName(dto.newName());
        currentFolder.setParent(destinationFolder);
        currentFolder.setPath(newPath);

        mediaFolderRepository.save(currentFolder);
        updateDescendantsPath(currentFolder, oldPath);
    }

    @Transactional
    public Boolean existsByPath(@NonNull MediaFolderCountDTO mediaFolderCountDTO) {
        String path = mediaFolderCountDTO.path();
        return mediaFolderRepository.existsByPath(path);
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

    private void updateDescendantsPath(@NonNull MediaFolder parent, String oldPathPrefix) {
        for (MediaFolder child : parent.getSubfolders()) {
            String newChildPath = child.getPath().replaceFirst("^" + Pattern.quote(oldPathPrefix), parent.getPath());
            child.setPath(newChildPath);
            mediaFolderRepository.save(child);
            updateDescendantsPath(child, oldPathPrefix);
        }
    }
}
