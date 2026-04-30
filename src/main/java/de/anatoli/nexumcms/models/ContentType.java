package de.anatoli.nexumcms.models;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.persistence.Version;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.Instant;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Entity
@Table(name = "content_types")
@Getter
@Setter
@NoArgsConstructor
public class ContentType {

  @Id
  @Column(name = "id", nullable = false, updatable = false)
  private UUID id;

  @Column(name = "type_key", nullable = false, unique = true, length = 100)
  private String key;

  @Column(name = "name", nullable = false, length = 120)
  private String name;

  @Column(name = "description", length = 600)
  private String description;

  @JdbcTypeCode(SqlTypes.JSON)
  @Column(name = "validation_flow_config")
  private Map<String, Object> validationFlowConfig = new HashMap<>();

  @Version
  @Setter(AccessLevel.NONE)
  @Column(name = "version", nullable = false)
  private Long version;

  @Setter(AccessLevel.NONE)
  @Column(name = "created_at", nullable = false, updatable = false)
  private Instant createdAt;

  @Setter(AccessLevel.NONE)
  @Column(name = "updated_at", nullable = false)
  private Instant updatedAt;

  @OneToMany(mappedBy = "contentType", cascade = CascadeType.ALL, orphanRemoval = true)
  @OrderBy("sortOrder ASC")
  @Setter(AccessLevel.NONE)
  private final List<ContentTypeField> fields = new ArrayList<>();

  public void replaceFields(List<ContentTypeField> newFields) {
    this.fields.clear();
    if (newFields == null) {
      return;
    }
    newFields.forEach(this::addField);
  }

  public void addField(ContentTypeField field) {
    field.setContentType(this);
    this.fields.add(field);
  }

  @PrePersist
  void onCreate() {
    if (id == null) {
      id = UUID.randomUUID();
    }
    Instant now = Instant.now();
    createdAt = now;
    updatedAt = now;
  }

  @PreUpdate
  void onUpdate() {
    updatedAt = Instant.now();
  }
}
