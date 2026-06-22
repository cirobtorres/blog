package com.cirobtorres.blog.api.repositories;

import com.cirobtorres.blog.api.entities.Revisions;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface RevisionsRepository extends JpaRepository<Revisions, UUID> {
}
