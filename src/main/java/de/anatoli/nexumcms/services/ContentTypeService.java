package de.anatoli.nexumcms.services;

import de.anatoli.nexumcms.api.ContentTypeCreateRequest;
import de.anatoli.nexumcms.api.ContentTypeFieldRequest;
import de.anatoli.nexumcms.api.ContentTypeFieldResponse;
import de.anatoli.nexumcms.api.ContentTypeResponse;
import de.anatoli.nexumcms.api.ContentTypeSummaryResponse;
import de.anatoli.nexumcms.api.ContentTypeUpdateRequest;
import de.anatoli.nexumcms.api.ValidationRuleRequest;
import de.anatoli.nexumcms.api.ValidationRuleResponse;
import de.anatoli.nexumcms.exceptions.ContentTypeConflictException;
import de.anatoli.nexumcms.exceptions.ContentTypeNotFoundException;
import de.anatoli.nexumcms.exceptions.ContentTypeValidationException;
import de.anatoli.nexumcms.models.ContentType;
import de.anatoli.nexumcms.models.ContentTypeField;
import de.anatoli.nexumcms.models.ValidationRule;
import de.anatoli.nexumcms.repositories.ContentTypeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class ContentTypeService {

  private final ContentTypeRepository contentTypeRepository;

  @Transactional
  public ContentTypeResponse createContentType(ContentTypeCreateRequest request) {
    String normalizedKey = normalizeTypeKey(request.key());

    if (contentTypeRepository.existsByKeyIgnoreCase(normalizedKey)) {
      throw new ContentTypeConflictException("Content type key already exists: key=" + normalizedKey);
    }

    validateFieldDefinitions(request.fields());

    ContentType contentType = new ContentType();
    contentType.setKey(normalizedKey);
    applyMutableValues(contentType, request.name(), request.description(), request.validationFlowConfig(), request.fields());

    ContentType saved = contentTypeRepository.save(contentType);
    return toContentTypeResponse(saved);
  }

  @Transactional(readOnly = true)
  public Page<ContentTypeSummaryResponse> listContentTypes(Pageable pageable) {
    Pageable sortedPageable = pageable.getSort().isSorted()
        ? pageable
        : PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by(Sort.Direction.DESC, "updatedAt"));

    return contentTypeRepository.findAll(sortedPageable).map(this::toContentTypeSummaryResponse);
  }

  @Transactional(readOnly = true)
  public ContentTypeResponse getContentType(UUID id) {
    return toContentTypeResponse(findByIdOrThrow(id));
  }

  @Transactional
  public ContentTypeResponse updateContentType(UUID id, ContentTypeUpdateRequest request) {
    ContentType contentType = findByIdOrThrow(id);

    validateFieldDefinitions(request.fields());
    applyMutableValues(contentType, request.name(), request.description(), request.validationFlowConfig(), request.fields());

    ContentType saved = contentTypeRepository.save(contentType);
    return toContentTypeResponse(saved);
  }

  private ContentType findByIdOrThrow(UUID id) {
    return contentTypeRepository.findById(id).orElseThrow(() -> new ContentTypeNotFoundException(id));
  }

  private void applyMutableValues(
      ContentType contentType,
      String name,
      String description,
      Map<String, Object> validationFlowConfig,
      List<ContentTypeFieldRequest> fieldRequests
  ) {
    contentType.setName(name.trim());
    contentType.setDescription(description == null ? null : description.trim());
    contentType.setValidationFlowConfig(new HashMap<>(validationFlowConfig));
    contentType.replaceFields(toFieldEntities(fieldRequests));
  }

  private List<ContentTypeField> toFieldEntities(List<ContentTypeFieldRequest> fieldRequests) {
    return fieldRequests.stream()
        .sorted(Comparator.comparing(ContentTypeFieldRequest::sortOrder))
        .map(this::toFieldEntity)
        .toList();
  }

  private ContentTypeField toFieldEntity(ContentTypeFieldRequest fieldRequest) {
    ContentTypeField field = new ContentTypeField();
    field.setFieldKey(normalizeFieldKey(fieldRequest.key()));
    field.setLabel(fieldRequest.label().trim());
    field.setFieldType(fieldRequest.fieldType());
    field.setRequired(fieldRequest.required());
    field.setSortOrder(fieldRequest.sortOrder());
    field.setFieldConfig(new HashMap<>(fieldRequest.fieldConfig()));
    field.setValidationRules(toValidationRuleEntities(fieldRequest.validationRules()));
    return field;
  }

  private List<ValidationRule> toValidationRuleEntities(List<ValidationRuleRequest> requests) {
    return requests.stream()
        .map(rule -> new ValidationRule(rule.rule(), new HashMap<>(rule.params())))
        .toList();
  }

  private ContentTypeSummaryResponse toContentTypeSummaryResponse(ContentType contentType) {
    return new ContentTypeSummaryResponse(
        contentType.getId(),
        contentType.getKey(),
        contentType.getName(),
        contentType.getFields().size(),
        contentType.getUpdatedAt());
  }

  private ContentTypeResponse toContentTypeResponse(ContentType contentType) {
    return new ContentTypeResponse(
        contentType.getId(),
        contentType.getKey(),
        contentType.getName(),
        contentType.getDescription(),
        contentType.getValidationFlowConfig(),
        contentType.getFields().stream().map(this::toContentTypeFieldResponse).toList(),
        contentType.getVersion(),
        contentType.getCreatedAt(),
        contentType.getUpdatedAt());
  }

  private ContentTypeFieldResponse toContentTypeFieldResponse(ContentTypeField field) {
    return new ContentTypeFieldResponse(
        field.getId(),
        field.getFieldKey(),
        field.getLabel(),
        field.getFieldType(),
        field.isRequired(),
        field.getSortOrder(),
        field.getFieldConfig(),
        field.getValidationRules().stream()
            .map(rule -> new ValidationRuleResponse(rule.getRule(), rule.getParams()))
            .toList());
  }

  private void validateFieldDefinitions(List<ContentTypeFieldRequest> fieldRequests) {
    Set<String> uniqueFieldKeys = new HashSet<>();
    Set<Integer> uniqueSortOrders = new HashSet<>();

    for (ContentTypeFieldRequest fieldRequest : fieldRequests) {
      String normalizedFieldKey = normalizeFieldKey(fieldRequest.key());
      if (!uniqueFieldKeys.add(normalizedFieldKey)) {
        throw new ContentTypeValidationException("Field key must be unique: key=" + normalizedFieldKey);
      }
      if (!uniqueSortOrders.add(fieldRequest.sortOrder())) {
        throw new ContentTypeValidationException("Field sortOrder must be unique: sortOrder=" + fieldRequest.sortOrder());
      }
    }
  }

  private String normalizeTypeKey(String key) {
    return key.trim().toLowerCase(Locale.ROOT);
  }

  private String normalizeFieldKey(String key) {
    return key.trim().toLowerCase(Locale.ROOT);
  }
}
