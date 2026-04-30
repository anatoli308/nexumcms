package de.anatoli.nexumcms.repositories;

import de.anatoli.nexumcms.models.ContentType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ContentTypeRepository extends JpaRepository<ContentType, UUID> {
  boolean existsByKeyIgnoreCase(String key);
}
