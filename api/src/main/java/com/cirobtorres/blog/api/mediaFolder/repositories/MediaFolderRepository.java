package com.cirobtorres.blog.api.mediaFolder.repositories;

import com.cirobtorres.blog.api.mediaFolder.dtos.MediaFolderCountDTO;
import com.cirobtorres.blog.api.mediaFolder.entities.MediaFolder;
import com.cirobtorres.blog.api.mediaFolder.interfaces.MediaFolderPathOnly;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface MediaFolderRepository extends JpaRepository<MediaFolder, UUID> {
    boolean existsByPath(String path);
    Optional<MediaFolder> findByPath(String path);
    List<MediaFolder> findByParentPath(String path);
    void deleteByPath(String path);
    long countByNameNot(String name);
    List<MediaFolderPathOnly> findAllProjectedBy();

    @Query("""
        SELECT new com.cirobtorres.blog.api.mediaFolder.dtos.MediaFolderCountDTO(
            f.path, f.name, COUNT(DISTINCT s), COUNT(DISTINCT m)
        )
        FROM MediaFolder f
        LEFT JOIN f.subfolders s
        LEFT JOIN f.files m
        WHERE f.parent.path = :parentPath
        GROUP BY f.id, f.path, f.name
    """)
    List<MediaFolderCountDTO> findSubfoldersWithCounts(String parentPath);

    @Query("""
        SELECT new com.cirobtorres.blog.api.mediaFolder.dtos.MediaFolderCountDTO(
            f.path, f.name, COUNT(DISTINCT s), COUNT(DISTINCT m)
        )
        FROM MediaFolder f
        LEFT JOIN f.subfolders s
        LEFT JOIN f.files m
        WHERE f.parent IS NULL AND f.name != 'Home'
        GROUP BY f.id, f.path, f.name
    """)
    List<MediaFolderCountDTO> listRootFoldersWithCounts();
}
