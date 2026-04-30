package de.anatoli.nexumcms.exceptions;

import de.anatoli.nexumcms.api.ApiErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(ContentTypeNotFoundException.class)
  public ResponseEntity<ApiErrorResponse> handleNotFound(ContentTypeNotFoundException exception) {
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ApiErrorResponse.of(exception.getMessage()));
  }

  @ExceptionHandler(ContentTypeValidationException.class)
  public ResponseEntity<ApiErrorResponse> handleValidation(ContentTypeValidationException exception) {
    return ResponseEntity.badRequest().body(ApiErrorResponse.of(exception.getMessage()));
  }

  @ExceptionHandler(ContentTypeConflictException.class)
  public ResponseEntity<ApiErrorResponse> handleConflict(ContentTypeConflictException exception) {
    return ResponseEntity.status(HttpStatus.CONFLICT).body(ApiErrorResponse.of(exception.getMessage()));
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ApiErrorResponse> handleMethodArgumentNotValid(MethodArgumentNotValidException exception) {
    Map<String, String> fieldErrors = exception.getBindingResult().getFieldErrors().stream()
        .collect(Collectors.toMap(
            fieldError -> fieldError.getField(),
            fieldError -> fieldError.getDefaultMessage() == null ? "Invalid value" : fieldError.getDefaultMessage(),
            (first, second) -> first));

    return ResponseEntity.badRequest().body(ApiErrorResponse.of("Request validation failed", fieldErrors));
  }
}
