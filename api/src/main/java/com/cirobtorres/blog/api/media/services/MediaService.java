package com.cirobtorres.blog.api.media.services;

import com.cirobtorres.blog.api.media.dtos.MediaDeleteAllDTO;
import com.cirobtorres.blog.api.media.dtos.MediaDTO;
import com.cirobtorres.blog.api.media.dtos.MediaFilesMoveToDTO;
import com.cirobtorres.blog.api.media.dtos.MediaPutDTO;
import com.cirobtorres.blog.api.media.entities.Media;
import com.cirobtorres.blog.api.media.enums.FilterQueryParams;
import com.cirobtorres.blog.api.media.enums.MediaType;
import com.cirobtorres.blog.api.media.repositories.MediaRepository;
import com.cirobtorres.blog.api.mediaFolder.dtos.MediaFolderDTO;
import com.cirobtorres.blog.api.mediaFolder.entities.MediaFolder;
import com.cirobtorres.blog.api.mediaFolder.repositories.MediaFolderRepository;
import com.cloudinary.Cloudinary;
import com.cloudinary.api.ApiResponse;
import com.cloudinary.utils.ObjectUtils;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.jspecify.annotations.NonNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;

import java.time.Duration;
import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class MediaService {
    private final Cloudinary cloudinary;
    private final MediaRepository mediaRepository;
    private final MediaFolderRepository mediaFolderRepository;
    private final ObjectMapper objectMapper;

    public MediaService(
            Cloudinary cloudinary,
            MediaRepository mediaRepository,
            MediaFolderRepository mediaFolderRepository,
            ObjectMapper objectMapper
    ) {
        this.cloudinary = cloudinary;
        this.mediaRepository = mediaRepository;
        this.mediaFolderRepository = mediaFolderRepository;
        this.objectMapper = objectMapper;
    }

    public long countFilesByFolder(String folderPath) {
        return mediaRepository.countByFolderPath(folderPath);
    }

    @Transactional
    public Page<MediaDTO> listAllPaged(String q, String folderPath, Map<String, String> allParams, Pageable pageable) {
        Specification<Media> spec = (root, query, cb) -> cb.conjunction();

        if (q != null && !q.trim().isEmpty()) {
            spec = spec.and((root, query, cb) ->
                    cb.like(cb.lower(root.get("publicId")), "%" + q.toLowerCase() + "%"));
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
    public List<Map<String, Object>> findOrphanFiles(String folderPath) throws Exception {
        ApiResponse response = cloudinary
                .api()
                .resources(
                        ObjectUtils.asMap(
                                "type", "upload",
                                "prefix", folderPath,
                                "max_results", 500
                        )
                );

        List<Map<String, Object>> cloudinaryResources = objectMapper.convertValue(
                response.get("resources"),
                new TypeReference<List<Map<String, Object>>>() {}
        );

        // Lists all public_ids from ArticlesMediaService
        List<String> localPublicIds = mediaRepository.findAllPublicIdsByFolderPath(folderPath);

        // Filters all public_ids from Cloudinary that do not exist on ArticlesMediaService
        return cloudinaryResources
                .stream()
                .filter(
                        res -> !localPublicIds.contains(
                                res.get("public_id").toString()
                        )
                )
                .toList();
    }

    @Transactional
    public void saveAll(@NonNull List<MediaDTO> mediaList) {
        List<String> existingIds = mediaRepository.findAllPublicIds();

        List<Media> entitiesToSave = mediaList
                .stream()
                .filter(dto -> !existingIds.contains(dto.publicId()))
                .map(this::convertToEntity)
                .toList();

        if (!entitiesToSave.isEmpty()) {
            mediaRepository.saveAll(entitiesToSave);
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

        // Sanitize
        String newPublicId = mediaPutDTO.name();

        // Update Cloudinary
        Map<?, ?> response;

        String oldPublicId = media.getPublicId();
        boolean hasPathChanged = !oldPublicId.equals(newPublicId);

        if (hasPathChanged) {
            try {
                response = cloudinary
                        .uploader()
                        .rename(
                                oldPublicId,
                                newPublicId,
                                ObjectUtils.emptyMap()
                );
                if (response == null || !response.containsKey("public_id")) {
                    throw new RuntimeException(
                            "Cloudinary update fail: Response was empty or invalid."
                    );
                }
            } catch (Exception e) {
                throw new RuntimeException(
                        "Cloudinary update fail: make sure file with public_id={" + oldPublicId + "} exists."
                );
            }
        } else {
            response = Map.of("result", "ok", "public_id", oldPublicId);
        }

        // Update entity
        Object responsePublicId = response.get("public_id");
        media.setPublicId(responsePublicId != null ? responsePublicId.toString() : newPublicId);
        media.setFolder(targetFolder);
        media.setAlt(mediaPutDTO.alt());
        media.setCaption(mediaPutDTO.caption());
        if (response.containsKey("secure_url")) {
            media.setUrl((String) response.get("secure_url"));
        }

        // Update database
        mediaRepository.save(media);
    }

    @Transactional
    public void deleteMedia(UUID id) throws Exception {
        Media media = mediaRepository.findById(id)
                .orElseThrow(
                        () -> new EntityNotFoundException("Media id={" + id + "} does not exist.")
                );

        String resourceType = "image";
        if (media.getType() == MediaType.VIDEO) resourceType = "video";
        if (media.getType() == MediaType.RAW) resourceType = "raw";

        Map<?, ?> destroyParams = ObjectUtils.asMap("resource_type", resourceType);
        Map<?, ?> response = cloudinary.uploader().destroy(media.getPublicId(), destroyParams);

        if (!"ok".equals(response.get("result")) && !"not_found".equals(response.get("result"))) {
            throw new RuntimeException("Cloudinary delete fail: " + response.get("result"));
        }

        mediaRepository.delete(media);
    }

    @Transactional
    public void deleteMediaAll(MediaDeleteAllDTO fileIdsDTO) {
        List<UUID> ids = fileIdsDTO.fileIds();

        List<Media> mediaList = mediaRepository.findAllById(ids);

        if (mediaList.isEmpty()) {
            return;
        }

        for (Media media : mediaList) {
            try {
                Map<?, ?> result = cloudinary.uploader().destroy(media.getPublicId(), ObjectUtils.emptyMap());

                if (!"ok".equals(result.get("result")) && !"not found".equals(result.get("result"))) {
                    throw new RuntimeException("Cloudinary delete fail while deleting media of public_id=" + media.getPublicId());
                }
            } catch (Exception e) {
                // Because we are inside a @Transactional, the RuntimeException must be thrown here in order to trigger a rollback
                throw new RuntimeException("Cloudinary fail: ", e);
            }
        }

        List<UUID> mediaIds = mediaList.stream().map(Media::getId).toList();

        mediaRepository.deleteAllById(mediaIds);
    }

    private Media convertToEntity(@NonNull MediaDTO dto) {
        MediaFolder folder = dto.folder().id() == null
                ? mediaFolderRepository.findByPath("/")
                    .orElseThrow(() -> new EntityNotFoundException("Home folder not found"))
                : mediaFolderRepository.findById(dto.folder().id())
                    .orElseThrow(() -> new EntityNotFoundException("MediaFolder not found"));

        return Media.builder()
                .folder(folder)
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
                extractNameFromPublicId(entity.getPublicId()),
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

    private String extractNameFromPublicId(String path) {
        if (path == null || path.isBlank()) return "file";
        String[] parts = path.split("/");
        return parts[parts.length - 1];
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
}
