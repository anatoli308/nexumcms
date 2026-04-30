package de.anatoli.nexumcms.controllers;

import de.anatoli.nexumcms.api.ContentTypeCreateRequest;
import de.anatoli.nexumcms.api.ContentTypeResponse;
import de.anatoli.nexumcms.api.ContentTypeSummaryResponse;
import de.anatoli.nexumcms.api.ContentTypeUpdateRequest;
import de.anatoli.nexumcms.services.ContentTypeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.UUID;

@RestController
@RequestMapping("/api/backend/content/types")
@RequiredArgsConstructor
public class ContentTypeController {

  private final ContentTypeService contentTypeService;

  @PostMapping
  public ResponseEntity<ContentTypeResponse> createContentType(@Valid @RequestBody ContentTypeCreateRequest request) {
    ContentTypeResponse response = contentTypeService.createContentType(request);
    URI location = URI.create("/api/backend/content/types/" + response.id());
    return ResponseEntity.created(location).body(response);
  }

  @GetMapping
  public Page<ContentTypeSummaryResponse> listContentTypes(Pageable pageable) {
    return contentTypeService.listContentTypes(pageable);
  }

  @GetMapping("/{id}")
  public ContentTypeResponse getContentType(@PathVariable UUID id) {
    return contentTypeService.getContentType(id);
  }

  @PutMapping("/{id}")
  public ContentTypeResponse updateContentType(@PathVariable UUID id, @Valid @RequestBody ContentTypeUpdateRequest request) {
    return contentTypeService.updateContentType(id, request);
  }
}
