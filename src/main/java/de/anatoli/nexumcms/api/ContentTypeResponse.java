package de.anatoli.nexumcms.api;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.UUID;

public record ContentTypeResponse(
    UUID id,
    String key,
    String name,
    String description,
    Map<String, Object> validationFlowConfig,
    List<ContentTypeFieldResponse> fields,
    Long version,
    Instant createdAt,
    Instant updatedAt
) {
  public ContentTypeResponse {
    validationFlowConfig = validationFlowConfig == null ? Map.of() : Map.copyOf(validationFlowConfig);
    fields = fields == null ? List.of() : List.copyOf(fields);
  }
}
