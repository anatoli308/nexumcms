package de.anatoli.nexumcms.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

  @Bean
  protected SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .csrf(csrf -> csrf.ignoringRequestMatchers("/api/backend/**"))
        .authorizeHttpRequests(authorize -> authorize.anyRequest().permitAll())
        .formLogin(login -> login.permitAll())
        .httpBasic(basic -> {});

    return http.build();
  }
}
