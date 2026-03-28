package com.cirobtorres.blog.api.mediaFolder.repositories;

import com.cirobtorres.blog.api.mediaFolder.dtos.MediaFolderCountDTO;
import com.cirobtorres.blog.api.mediaFolder.entities.MediaFolder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface MediaFolderRepository extends JpaRepository<MediaFolder, UUID> {
    Optional<MediaFolder> findByPath(String path);
    boolean existsByPath(String path);
    void deleteByPath(String path);
    long countByNameNot(String name);

    @Query("""
        SELECT new com.cirobtorres.blog.api.mediaFolder.dtos.MediaFolderCountDTO(
            f.path, f.name, f.createdAt, COUNT(DISTINCT s), COUNT(DISTINCT m)
        )
        FROM MediaFolder f
        LEFT JOIN f.subfolders s
        LEFT JOIN f.files m
        WHERE f.parent.path = :parentPath
        GROUP BY f.createdAt, f.path, f.name, f.id
    """)
    List<MediaFolderCountDTO> findSubfoldersWithCounts(String parentPath);
}
