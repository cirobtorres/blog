package com.cirobtorres.blog.api.dtos;

import com.cirobtorres.blog.api.enums.MediaType;

/**
 * Descrição neutra (independente de provedor) de um objeto armazenado.
 * Campos opcionais são null quando o provedor não os informa.
 */
public record StoredObjectDTO(
        String key,
        String url,
        Long size,
        String extension,
        MediaType type,
        Integer width,
        Integer height,
        Double duration
) {
}
