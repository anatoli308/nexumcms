package de.anatoli.nexumcms.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Entity
@Table(
    name = "content_type_fields",
    uniqueConstraints = {
      @UniqueConstraint(
          name = "uk_content_type_fields_content_type_id_field_key",
          columnNames = {"content_type_id", "field_key"})
    })
@Getter
@Setter
@NoArgsConstructor
public class ContentTypeField {

  @Id
  @Column(name = "id", nullable = false, updatable = false)
  private UUID id;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "content_type_id", nullable = false)
  private ContentType contentType;

  @Column(name = "field_key", nullable = false, length = 100)
  private String fieldKey;

  @Column(name = "label", nullable = false, length = 140)
  private String label;

  @Enumerated(EnumType.STRING)
  @Column(name = "field_type", nullable = false, length = 40)
  private ContentFieldType fieldType;

  @Column(name = "required_flag", nullable = false)
  private boolean required;

  @Column(name = "sort_order", nullable = false)
  private int sortOrder;

  @JdbcTypeCode(SqlTypes.JSON)
  @Column(name = "field_config")
  private Map<String, Object> fieldConfig = new HashMap<>();

  @JdbcTypeCode(SqlTypes.JSON)
  @Column(name = "validation_rules")
  private List<ValidationRule> validationRules = new ArrayList<>();

  @PrePersist
  void onCreate() {
    if (id == null) {
      id = UUID.randomUUID();
    }
  }
}
