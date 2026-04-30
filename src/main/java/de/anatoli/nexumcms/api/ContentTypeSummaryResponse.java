package de.anatoli.nexumcms.api;

import java.time.Instant;
import java.util.UUID;

public record ContentTypeSummaryResponse(
    UUID id,
    String key,
    String name,
    int fieldCount,
    Instant updatedAt
) {
}
