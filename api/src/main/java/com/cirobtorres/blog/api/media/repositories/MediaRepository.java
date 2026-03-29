package com.cirobtorres.blog.api.media.repositories;

import com.cirobtorres.blog.api.media.entities.Media;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface MediaRepository extends JpaRepository<Media, UUID> {
    @Query(value = "SELECT m FROM Media m WHERE m.folder.path = :path", countQuery = "SELECT COUNT(m) FROM Media m WHERE m.folder.path = :path")
    Page<Media> findByFolderPath(@Param("path") String path, Pageable pageable);

    @Query("SELECT m.publicId FROM Media m WHERE m.folder.path = :path")
    List<String> findAllPublicIdsByFolderPath(@Param("path") String path);

    @Query("SELECT COUNT(m) FROM Media m WHERE m.folder.path = :path")
    long countByFolderPath(@Param("path") String path);

    @Query("SELECT m.publicId FROM Media m")
    List<String> findAllPublicIds();
}
