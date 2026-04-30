package de.anatoli.nexumcms.api;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.Map;

public record ValidationRuleRequest(
    @NotBlank @Size(max = 80) String rule,
    Map<String, Object> params
) {
  public ValidationRuleRequest {
    params = params == null ? Map.of() : Map.copyOf(params);
  }
}
