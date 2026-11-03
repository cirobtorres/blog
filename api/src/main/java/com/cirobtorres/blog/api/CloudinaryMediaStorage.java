package com.cirobtorres.blog.api;

import com.cirobtorres.blog.api.dtos.ObjectRefDTO;
import com.cirobtorres.blog.api.dtos.StoredObjectDTO;
import com.cirobtorres.blog.api.enums.MediaType;
import com.cirobtorres.blog.api.exceptions.StorageException;
import com.cirobtorres.blog.api.repositories.MediaStorage;
import com.cloudinary.Cloudinary;
import com.cloudinary.api.ApiResponse;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Único ponto do sistema que conhece o SDK do Cloudinary.
 * Ativo por padrão; troque com {@code media.storage.provider=<outro>} quando houver outra implementação.
 */
@Component
@ConditionalOnProperty(name = "media.storage.provider", havingValue = "cloudinary", matchIfMissing = true)
public class CloudinaryMediaStorage implements MediaStorage {
    private static final int DELETE_BATCH_SIZE = 100;
    private static final int LIST_MAX_RESULTS = 500; // Sem paginação (comportamento original)
    private static final List<String> RESOURCE_TYPES = List.of("image", "video", "raw");
    private static final Set<String> AUDIO_EXTENSIONS = Set.of("mp3", "wav", "ogg", "m4a", "aac", "flac", "opus");

    private final Cloudinary cloudinary;

    public CloudinaryMediaStorage(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    @Override
    public List<StoredObjectDTO> list(String prefix) {
        List<StoredObjectDTO> objects = new ArrayList<>();

        // O Cloudinary lista por resource_type; sem informar, só retorna imagens
        for (String resourceType : RESOURCE_TYPES) {
            try {
                ApiResponse response = cloudinary.api().resources(
                        ObjectUtils.asMap(
                                "type", "upload",
                                "resource_type", resourceType,
                                "prefix", prefix,
                                "max_results", LIST_MAX_RESULTS
                        )
                );

                if (response.get("resources") instanceof List<?> resources) {
                    for (Object resource : resources) {
                        if (resource instanceof Map<?, ?> map) {
                            objects.add(toStoredObject(map, resourceType));
                        }
                    }
                }
            } catch (Exception e) {
                throw new StorageException("Cloudinary: list fail. prefix={" + prefix + "}", e);
            }
        }

        return objects;
    }

    @Override
    public void delete(ObjectRefDTO ref) {
        try {
            Map<?, ?> response = cloudinary
                    .uploader()
                    .destroy(ref.key(), ObjectUtils.asMap("resource_type", resourceType(ref.type())));

            Object result = response.get("result");
            if (!"ok".equals(result) && !"not found".equals(result)) {
                throw new StorageException("Cloudinary delete fail: " + result + " public_id={" + ref.key() + "}");
            }
        } catch (StorageException e) {
            throw e;
        } catch (Exception e) {
            throw new StorageException("Cloudinary: delete fail. public_id={" + ref.key() + "}", e);
        }
    }

    @Override
    public void deleteAll(Collection<ObjectRefDTO> refs) {
        // O Cloudinary exige um resource_type por chamada; agrupa antes de enviar em lotes
        Map<String, List<String>> keysByResourceType = new LinkedHashMap<>();
        for (ObjectRefDTO ref : refs) {
            keysByResourceType
                    .computeIfAbsent(resourceType(ref.type()), k -> new ArrayList<>())
                    .add(ref.key());
        }

        try {
            for (Map.Entry<String, List<String>> entry : keysByResourceType.entrySet()) {
                List<String> keys = entry.getValue();
                for (int i = 0; i < keys.size(); i += DELETE_BATCH_SIZE) {
                    List<String> batch = keys.subList(i, Math.min(i + DELETE_BATCH_SIZE, keys.size()));
                    cloudinary.api().deleteResources(batch, ObjectUtils.asMap("resource_type", entry.getKey()));
                }
            }
        } catch (Exception e) {
            throw new StorageException("Cloudinary: batch delete fail.", e);
        }
    }

    // Cloudinary classifica áudio como "video"
    private static String resourceType(MediaType type) {
        if (type == null) return "image";
        return switch (type) {
            case IMAGE -> "image";
            case VIDEO, AUDIO -> "video";
            case RAW -> "raw";
        };
    }

    private static StoredObjectDTO toStoredObject(Map<?, ?> resource, String resourceType) {
        String extension = resource.get("format") != null ? resource.get("format").toString() : null;

        MediaType type = switch (resourceType) {
            case "video" -> extension != null && AUDIO_EXTENSIONS.contains(extension.toLowerCase())
                    ? MediaType.AUDIO
                    : MediaType.VIDEO;
            case "raw" -> MediaType.RAW;
            default -> MediaType.IMAGE;
        };

        return new StoredObjectDTO(
                String.valueOf(resource.get("public_id")),
                resource.get("secure_url") != null ? resource.get("secure_url").toString() : null,
                resource.get("bytes") instanceof Number n ? n.longValue() : null,
                extension,
                type,
                resource.get("width") instanceof Number n ? n.intValue() : null,
                resource.get("height") instanceof Number n ? n.intValue() : null,
                resource.get("duration") instanceof Number n ? n.doubleValue() : null
        );
    }
}
