package com.cirobtorres.blog.api.repositories;

import com.cirobtorres.blog.api.dtos.ObjectRefDTO;
import com.cirobtorres.blog.api.dtos.StoredObjectDTO;
import com.cirobtorres.blog.api.exceptions.StorageException;

import java.util.Collection;
import java.util.List;

/**
 * Porta de saída para o armazenamento de arquivos de mídia (Cloudinary hoje, Cloudflare R2 amanhã).
 * Nada fora do pacote storage deve conhecer o SDK de um provedor.
 * Chaves são imutáveis: renomear um arquivo é só trocar o nome no banco, nunca mexe no storage.
 */
public interface MediaStorage {

    /**
     * Lista os objetos cujo key começa com o prefixo informado.
     */
    List<StoredObjectDTO> list(String prefix);

    /**
     * Remove um objeto. Idempotente: objeto inexistente não é erro.
     *
     * @throws StorageException em qualquer outra falha do provedor
     */
    void delete(ObjectRefDTO ref);

    /**
     * Remove vários objetos (em lotes, se o provedor exigir). Idempotente como {@link #delete}.
     */
    void deleteAll(Collection<ObjectRefDTO> refs);
}
