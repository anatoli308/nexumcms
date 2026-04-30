package de.anatoli.nexumcms.api;

import java.util.Map;

public record ApiErrorResponse(
    boolean success,
    String error,
    Map<String, String> details
) {
  public static ApiErrorResponse of(String error) {
    return new ApiErrorResponse(false, error, Map.of());
  }

  public static ApiErrorResponse of(String error, Map<String, String> details) {
    return new ApiErrorResponse(false, error, details == null ? Map.of() : Map.copyOf(details));
  }
}
