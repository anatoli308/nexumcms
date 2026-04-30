package de.anatoli.nexumcms.api;

import de.anatoli.nexumcms.models.ContentFieldType;

import java.util.List;
import java.util.Map;
import java.util.UUID;

public record ContentTypeFieldResponse(
    UUID id,
    String key,
    String label,
    ContentFieldType fieldType,
    boolean required,
    int sortOrder,
    Map<String, Object> fieldConfig,
    List<ValidationRuleResponse> validationRules
) {
  public ContentTypeFieldResponse {
    fieldConfig = fieldConfig == null ? Map.of() : Map.copyOf(fieldConfig);
    validationRules = validationRules == null ? List.of() : List.copyOf(validationRules);
  }
}
