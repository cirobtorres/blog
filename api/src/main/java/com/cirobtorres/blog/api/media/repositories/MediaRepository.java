package com.cirobtorres.blog.api.media.repositories;

import com.cirobtorres.blog.api.media.entities.Media;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface MediaRepository extends JpaRepository<Media, UUID> {
    @Query("SELECT m.publicId FROM Media m WHERE m.folder = :folder")
    List<String> findAllPublicIdsByFolder(@Param("folder") String folder); // Folder x

    @Query("SELECT m.publicId FROM Media m")
    List<String> findAllPublicIds(); // All folders

    List<Media> findByFolderOrderByCreatedAtDesc(String folder);
}
