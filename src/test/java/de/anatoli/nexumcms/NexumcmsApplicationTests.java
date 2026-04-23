package de.anatoli.nexumcms;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.io.ClassPathResource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

import java.nio.charset.StandardCharsets;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

@SpringBootTest
class NexumcmsApplicationTests {

	@Autowired
	private WebApplicationContext webApplicationContext;

	private MockMvc mockMvc;

	@BeforeEach
	void setUpMockMvc() {
		mockMvc = webAppContextSetup(webApplicationContext)
			.apply(springSecurity())
			.build();
	}

	@Test
	void contextLoads() {
	}

	@Test
	void indexTemplateReferencesBundleFromStaticRoot() throws Exception {
		ClassPathResource template = new ClassPathResource("templates/index.html");
		String templateContent = new String(template.getInputStream().readAllBytes(), StandardCharsets.UTF_8);

		assertThat(templateContent).contains("src=\"/built/bundle.js\"");
		assertThat(templateContent).doesNotContain("src=\"/static/built/bundle.js\"");
	}

	@Test
	void bundleIsAvailableOnClasspathUnderStaticBuilt() {
		ClassPathResource bundle = new ClassPathResource("static/built/bundle.js");

		assertThat(bundle.exists()).isTrue();
	}

	@Test
	void rootPageIsReachableWithoutAuthentication() throws Exception {
		mockMvc.perform(get("/"))
			.andExpect(status().isOk())
			.andExpect(content().string(org.hamcrest.Matchers.containsString("<div id=\"react\"></div>")))
			.andExpect(content().string(org.hamcrest.Matchers.containsString("src=\"/built/bundle.js\"")));
	}

	@Test
	void bundleIsServedWithoutAuthentication() throws Exception {
		mockMvc.perform(get("/built/bundle.js"))
			.andExpect(status().isOk())
			.andExpect(content().string(org.hamcrest.Matchers.not(org.hamcrest.Matchers.isEmptyOrNullString())));
	}

}
