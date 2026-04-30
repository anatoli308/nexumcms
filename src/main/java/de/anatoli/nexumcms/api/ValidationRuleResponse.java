package de.anatoli.nexumcms.api;

import java.util.Map;

public record ValidationRuleResponse(
    String rule,
    Map<String, Object> params
) {
  public ValidationRuleResponse {
    params = params == null ? Map.of() : Map.copyOf(params);
  }
}
