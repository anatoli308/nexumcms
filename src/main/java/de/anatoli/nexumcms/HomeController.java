package de.anatoli.nexumcms;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

	@GetMapping(value = { "/", "/dashboard" })
	public String index() {
		return "index";
	}
}