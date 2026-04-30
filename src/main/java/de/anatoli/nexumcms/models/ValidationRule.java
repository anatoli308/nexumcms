package de.anatoli.nexumcms.models;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.HashMap;
import java.util.Map;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ValidationRule {

  @Column(name = "rule", nullable = false, length = 80)
  private String rule;

  @JdbcTypeCode(SqlTypes.JSON)
  @Column(name = "params")
  private Map<String, Object> params = new HashMap<>();
}
