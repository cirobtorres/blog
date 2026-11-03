package com.cirobtorres.blog.api.services;

import com.cirobtorres.blog.api.dtos.*;
import com.cirobtorres.blog.api.entities.Media;
import com.cirobtorres.blog.api.enums.FilterQueryParams;
import com.cirobtorres.blog.api.exceptions.MediaNameAlreadyExistsException;
import com.cirobtorres.blog.api.repositories.MediaRepository;
import com.cirobtorres.blog.api.entities.MediaFolder;
import com.cirobtorres.blog.api.repositories.MediaFolderRepository;
import com.cirobtorres.blog.api.repositories.MediaStorage;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.jspecify.annotations.NonNull;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

@Service
public class MediaService {
    // Storage keys are minted by whoever uploads as "media/<uuid>"; used to list what is in the storage
    private static final String MEDIA_KEY_PREFIX = "media/";

    private final MediaStorage mediaStorage;
    private final MediaRepository mediaRepository;
    private final MediaFolderRepository mediaFolderRepository;

    public MediaService(
            MediaStorage mediaStorage,
            MediaRepository mediaRepository,
            MediaFolderRepository mediaFolderRepository
    ) {
        this.mediaStorage = mediaStorage;
        this.mediaRepository = mediaRepository;
        this.mediaFolderRepository = mediaFolderRepository;
    }

    public long countFilesByFolder(String folderPath) {
        return mediaRepository.countByFolderPath(folderPath);
    }

    @Transactional
    public Page<MediaDTO> listAllPaged(String q, String folderPath, Map<String, String> allParams, Pageable pageable) {
        Specification<Media> spec = (root, query, cb) -> cb.conjunction();

        if (q != null && !q.trim().isEmpty()) {
            spec = spec.and((root, query, cb) ->
                    cb.like(cb.lower(root.get("name")), "%" + q.toLowerCase() + "%"));
        } else {
            String targetPath = (folderPath == null || folderPath.isEmpty()) ? "Home" : folderPath;
            spec = spec.and((root, query, cb) ->
                    cb.equal(root.join("folder").get("path"), targetPath));
        }

        List<String> filterableFields = List.of("createdAt", "updatedAt", "type");
        for (String field : filterableFields) {
            String paramValue = allParams.get(field);
            if (paramValue != null && !paramValue.isBlank()) {
                spec = spec.and(MediaSpecification.filterBy(field, paramValue));
            }
        }

        return mediaRepository.findAll(spec, pageable).map(this::convertToDTO);
    }

    @Transactional
    public void moveFiles(@Valid @NonNull MediaFilesMoveToDTO mediaFilesMoveToDTO) {
        MediaFolder destination = mediaFilesMoveToDTO.targetFolderId() == null
                ? mediaFolderRepository.findByPath("/")
                .orElseThrow(() -> new EntityNotFoundException("Home folder not found"))
                : mediaFolderRepository.findById(mediaFilesMoveToDTO.targetFolderId())
                .orElseThrow(
                        () -> new EntityNotFoundException("Destination folder not found: " + mediaFilesMoveToDTO.targetFolderId())
                );

        // QUERY ALL
        List<Media> sources = mediaRepository.findAllById(mediaFilesMoveToDTO.filesId().values());

        // UPDATE EACH
        for (Media source : sources) {
            source.setFolder(destination);
        }

        mediaRepository.saveAll(sources);
    }

    @Transactional
    public List<StoredObjectDTO> findOrphanFiles() {
        // Lists all keys already registered on the database
        Set<String> localKeys = new HashSet<>(mediaRepository.findAllPublicIds());

        // Filters all objects from the storage that are not registered on the database
        return mediaStorage
                .list(MEDIA_KEY_PREFIX)
                .stream()
                .filter(object -> !localKeys.contains(object.key()))
                .toList();
    }

    /**
     * Returns the given names that cannot be used: already taken (ignoring case) or repeated within the list.
     */
    @Transactional
    public List<String> findNameConflicts(@NonNull Collection<String> names) {
        Set<String> seen = new HashSet<>();
        Set<String> candidates = new HashSet<>();
        List<String> conflicts = new ArrayList<>();

        for (String name : names) {
            String lower = normalize(name);
            if (!seen.add(lower)) {
                conflicts.add(name); // Repeated inside the same request
            } else {
                candidates.add(lower);
            }
        }

        if (!candidates.isEmpty()) {
            Set<String> taken = new HashSet<>(mediaRepository.findExistingLowerNames(candidates));
            for (String name : names) {
                if (taken.contains(normalize(name)) && !conflicts.contains(name)) {
                    conflicts.add(name);
                }
            }
        }

        return conflicts;
    }

    @Transactional
    public void saveAll(@NonNull List<MediaDTO> mediaList) {
        Set<String> existingKeys = new HashSet<>(mediaRepository.findAllPublicIds());

        // Keys already registered are skipped (idempotent import)
        List<MediaDTO> newMedia = mediaList
                .stream()
                .filter(dto -> !existingKeys.contains(dto.publicId()))
                .toList();

        if (newMedia.isEmpty()) return;

        List<String> conflicts = findNameConflicts(newMedia.stream().map(MediaDTO::name).toList());
        if (!conflicts.isEmpty()) {
            throw new MediaNameAlreadyExistsException(
                    "A file with name \"" + conflicts.getFirst() + "\" already exists."
            );
        }

        try {
            mediaRepository.saveAllAndFlush(newMedia.stream().map(this::convertToEntity).toList());
        } catch (DataIntegrityViolationException e) {
            // Race: another request took the name after the check above (unique index on lower(name))
            throw new MediaNameAlreadyExistsException("A file with one of these names already exists.");
        }
    }

    @Transactional
    public void putMedia(@NonNull UUID id, @NonNull MediaPutDTO mediaPutDTO) {
        // Find entity
        Media media = mediaRepository.findById(id)
                .orElseThrow(
                        () -> new EntityNotFoundException(
                                "Media not found or doesn't exist. id={" + id + "}"
                        )
                );

        // MediaFolder
        MediaFolder targetFolder = mediaPutDTO.folder().id() == null
                ? mediaFolderRepository.findByPath("/")
                .orElseThrow(() -> new EntityNotFoundException("Home folder not found"))
                : mediaFolderRepository.findById(mediaPutDTO.folder().id())
                .orElseThrow(
                        () -> new EntityNotFoundException(
                                "MediaFolder not found or doesn't exist. id={" + id + "}"
                        )
                );

        // Rename: database only. The storage key is immutable, so the file URL never changes
        String newName = mediaPutDTO.name().trim();

        if (!newName.equals(media.getName())) {
            // Ignores the media itself, so "yokohama" -> "Yokohama" is allowed
            if (mediaRepository.existsByNameIgnoreCaseAndIdNot(newName, id)) {
                throw new MediaNameAlreadyExistsException(
                        "A file with name \"" + newName + "\" already exists."
                );
            }
            media.setName(newName);
        }

        // Update entity
        media.setFolder(targetFolder);
        media.setAlt(mediaPutDTO.alt());
        media.setCaption(mediaPutDTO.caption());

        // Update database
        try {
            mediaRepository.saveAndFlush(media);
        } catch (DataIntegrityViolationException e) {
            // Race: another request took the name after the check above (unique index on lower(name))
            throw new MediaNameAlreadyExistsException("A file with name \"" + newName + "\" already exists.");
        }
    }

    @Transactional
    public void deleteMedia(UUID id) {
        Media media = mediaRepository.findById(id)
                .orElseThrow(
                        () -> new EntityNotFoundException("Media id={" + id + "} does not exist.")
                );

        mediaStorage.delete(new ObjectRefDTO(media.getPublicId(), media.getType()));

        mediaRepository.delete(media);
    }

    @Transactional
    public void deleteMediaAll(MediaDeleteAllDTO fileIdsDTO) {
        List<UUID> ids = fileIdsDTO.fileIds();

        List<Media> mediaList = mediaRepository.findAllById(ids);

        if (mediaList.isEmpty()) {
            return;
        }

        // Because we are inside a @Transactional, a StorageException (RuntimeException) triggers a rollback
        mediaStorage.deleteAll(
                mediaList.stream()
                        .map(media -> new ObjectRefDTO(media.getPublicId(), media.getType()))
                        .toList()
        );

        List<UUID> mediaIds = mediaList.stream().map(Media::getId).toList();

        mediaRepository.deleteAllById(mediaIds);
    }

    public static class MediaSpecification {
        public static Specification<Media> filterBy(String field, String rawValue) {
            return (root, query, cb) -> {
                String[] parts = rawValue.split("=");
                if (parts.length < 2) return null;

                FilterQueryParams condition = FilterQueryParams.fromString(parts[0]);
                String valueStr = parts[1];

                if (field.equals("createdAt") || field.equals("updatedAt")) {
                    Instant startOfDay = Instant.parse(valueStr);
                    Instant endOfDay = startOfDay.plus(Duration.ofDays(1)).minus(Duration.ofMillis(1));

                    return switch (condition) {
                        case isGreaterThan -> cb.greaterThan(root.get(field), startOfDay);
                        case isGreaterThanOrEqualTo -> cb.greaterThanOrEqualTo(root.get(field), startOfDay);
                        case isLowerThan -> cb.lessThan(root.get(field), startOfDay);
                        case isLowerThanOrEqualTo -> cb.lessThanOrEqualTo(root.get(field), endOfDay);
                        case isNot -> cb.or(
                                cb.lessThan(root.get(field), startOfDay),
                                cb.greaterThan(root.get(field), endOfDay)
                        );
                        default -> cb.between(root.get(field), startOfDay, endOfDay);
                    };
                }
                return condition == FilterQueryParams.isNot
                        ? cb.notEqual(root.get(field), valueStr)
                        : cb.equal(root.get(field), valueStr);
            };
        }
    }

    private Media convertToEntity(@NonNull MediaDTO dto) {
        MediaFolder folder = dto.folder().id() == null
                ? mediaFolderRepository.findByPath("/")
                .orElseThrow(() -> new EntityNotFoundException("Home folder not found"))
                : mediaFolderRepository.findById(dto.folder().id())
                .orElseThrow(() -> new EntityNotFoundException("MediaFolder not found"));

        return Media.builder()
                .folder(folder)
                .name(dto.name().trim())
                .publicId(dto.publicId())
                .url(dto.url())
                .extension(dto.extension())
                .type(dto.type())
                .size(dto.size())
                .width(dto.width())
                .height(dto.height())
                .duration(dto.duration())
                .alt(dto.alt())
                .caption(dto.caption())
                .build();
    }

    private MediaDTO convertToDTO(@NonNull Media entity) {
        String folderPath =
                (entity.getFolder() != null) ?
                        entity.getFolder().getPath() :
                        "Home";

        return new MediaDTO(
                entity.getId(),
                entity.getName(),
                new MediaFolderDTO(entity.getFolder() != null ? entity.getFolder().getId() : null, folderPath),
                entity.getPublicId(),
                entity.getUrl(),
                entity.getExtension(),
                entity.getType(),
                entity.getSize(),
                entity.getWidth(),
                entity.getHeight(),
                entity.getDuration(),
                entity.getAlt(),
                entity.getCaption()
        );
    }

    private static String normalize(String name) {
        return name.trim().toLowerCase(Locale.ROOT);
    }
}
