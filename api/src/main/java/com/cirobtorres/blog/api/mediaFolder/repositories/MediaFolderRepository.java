package com.cirobtorres.blog.api.mediaFolder.repositories;

import com.cirobtorres.blog.api.mediaFolder.entities.MediaFolder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface MediaFolderRepository extends JpaRepository<MediaFolder, UUID> {
    boolean existsByPath(String path);
    Optional<MediaFolder> findByPath(String path);
    List<MediaFolder> findByParentPath(String path);
    void deleteByPath(String path);
    long countByNameNot(String name);
}