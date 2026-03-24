package com.cirobtorres.blog.api.media.services;

import com.cirobtorres.blog.api.media.dtos.MediaDTO;
import com.cirobtorres.blog.api.media.entities.Media;
import com.cirobtorres.blog.api.media.enums.MediaType;
import com.cirobtorres.blog.api.media.repositories.MediaRepository;
import com.cirobtorres.blog.api.mediaFolder.entities.MediaFolder;
import com.cirobtorres.blog.api.mediaFolder.repositories.MediaFolderRepository;
import com.cloudinary.Cloudinary;
import com.cloudinary.api.ApiResponse;
import com.cloudinary.utils.ObjectUtils;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class MediaService {
    private final Cloudinary cloudinary;
    private final MediaRepository mediaRepository;
    private final MediaFolderRepository mediaFolderRepository;
    private final ObjectMapper objectMapper;
    private static final Logger log = LoggerFactory.getLogger(MediaService.class);

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

    public List<MediaDTO> listAllMediaDTO() {
        return mediaRepository.findAll().stream().map(this::convertToDTO).toList();
    }

    public long countFilesByFolder(String folderPath) {
        return mediaRepository.countByFolderPath(folderPath);
    }

    @Transactional
    public Page<MediaDTO> listAllPaged(String folderPath, Pageable pageable) {
        String targetPath = (folderPath == null || folderPath.isEmpty()) ? "Home" : folderPath;
        Page<Media> entityPage = mediaRepository.findByFolderPath(targetPath, pageable);
        return entityPage.map(this::convertToDTO);
    }

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

    public List<Media> listAllInFolder(String folderPath) {
        return mediaRepository.findByFolderPathOrderByCreatedAtDesc(folderPath);
    }

    @Transactional
    public void saveAll(List<MediaDTO> mediaList) {
        List<String> incomingIds = mediaList.stream().map(MediaDTO::publicId).toList();
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

    public void putMedia(UUID id) {
        // TODO
    }

    @Transactional
    public void deleteMedia(UUID id) throws Exception {
        Media media = mediaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Media id={" + id + "} does not exist."));

        String resourceType = "image";
        if (media.getType() == MediaType.VIDEO) resourceType = "video";
        if (media.getType() == MediaType.RAW) resourceType = "raw";

        Map destroyParams = ObjectUtils.asMap("resource_type", resourceType);
        Map response = cloudinary.uploader().destroy(media.getPublicId(), destroyParams);

        if (!"ok".equals(response.get("result")) && !"not_found".equals(response.get("result"))) {
            throw new RuntimeException("Cloudinary delete fail: " + response.get("result"));
        }

        mediaRepository.delete(media);
    }

    private Media convertToEntity(MediaDTO dto) {
        MediaFolder folder = mediaFolderRepository.findByPath(dto.folder())
                .orElseThrow(() -> new RuntimeException("Folder not found: " + dto.folder()));

        return Media.builder()
                .name(dto.name())
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

    private MediaDTO convertToDTO(Media entity) {
        return new MediaDTO(
                entity.getId(),
                entity.getName(),
                entity.getFolder() != null ? entity.getFolder().getPath() : "Home",
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
}
