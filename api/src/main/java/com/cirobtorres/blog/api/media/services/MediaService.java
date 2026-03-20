package com.cirobtorres.blog.api.media.services;

import com.cirobtorres.blog.api.media.dtos.MediaDTO;
import com.cirobtorres.blog.api.media.entities.Media;
import com.cirobtorres.blog.api.media.repositories.MediaRepository;
import com.cloudinary.Cloudinary;
import com.cloudinary.api.ApiResponse;
import com.cloudinary.utils.ObjectUtils;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
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
    private final ObjectMapper objectMapper;

    public MediaService(
            Cloudinary cloudinary,
            MediaRepository mediaRepository,
            ObjectMapper objectMapper
    ) {
        this.cloudinary = cloudinary;
        this.mediaRepository = mediaRepository;
        this.objectMapper = objectMapper;
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
        List<String> localPublicIds = mediaRepository.findAllPublicIdsByFolder(folderPath);

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

    public List<Media> listAllInFolder(String folder) {
        return mediaRepository.findByFolderOrderByCreatedAtDesc(folder);
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

    @Transactional
    public void deleteMedia(UUID id) throws Exception {
        Media media = mediaRepository
                .findById(id)
                .orElseThrow(
                        () -> new EntityNotFoundException("Media id={" + id + "} does not exist.")
                );

        // Cloudinary first
        cloudinary
                .uploader()
                .destroy(
                        media.getPublicId(),
                        ObjectUtils.emptyMap()
                );

        mediaRepository.delete(media);
    }

    private Media convertToEntity(MediaDTO dto) {
        return new Media
                .Builder()
                .name(dto.name())
                .folder(dto.folder())
                .publicId(dto.publicId())
                .url(dto.url())
                .extension(dto.extension())
                .type(dto.type())
                .size(dto.size())
                .width(dto.width())
                .height(dto.height())
                .duration(dto.duration())
                .alt(dto.alt())
                .build();
    }
}
