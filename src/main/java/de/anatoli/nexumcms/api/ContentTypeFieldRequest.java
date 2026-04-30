package de.anatoli.nexumcms.api;

import de.anatoli.nexumcms.models.ContentFieldType;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.util.List;
import java.util.Map;

public record ContentTypeFieldRequest(
    @NotBlank
    @Pattern(regexp = "^[a-z0-9]+(?:-[a-z0-9]+)*$", message = "field key must be kebab-case")
    @Size(max = 100)
    String key,
    @NotBlank @Size(max = 140) String label,
    @NotNull ContentFieldType fieldType,
    boolean required,
    @NotNull @Min(0) Integer sortOrder,
    Map<String, Object> fieldConfig,
    @NotNull @Valid List<ValidationRuleRequest> validationRules
) {
  public ContentTypeFieldRequest {
    fieldConfig = fieldConfig == null ? Map.of() : Map.copyOf(fieldConfig);
    validationRules = List.copyOf(validationRules);
  }
}
