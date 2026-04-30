package de.anatoli.nexumcms.api;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;
import java.util.Map;

public record ContentTypeUpdateRequest(
    @NotBlank @Size(max = 120) String name,
    @Size(max = 600) String description,
    Map<String, Object> validationFlowConfig,
    @NotNull @Valid List<ContentTypeFieldRequest> fields
) {
  public ContentTypeUpdateRequest {
    validationFlowConfig = validationFlowConfig == null ? Map.of() : Map.copyOf(validationFlowConfig);
    fields = List.copyOf(fields);
  }
}
