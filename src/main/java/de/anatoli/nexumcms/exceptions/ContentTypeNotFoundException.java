package de.anatoli.nexumcms.exceptions;

import java.util.UUID;

public class ContentTypeNotFoundException extends RuntimeException {

  public ContentTypeNotFoundException(UUID id) {
    super("Content type not found: id=" + id);
  }
}
