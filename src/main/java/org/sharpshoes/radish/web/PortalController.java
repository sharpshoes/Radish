package org.sharpshoes.radish.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/portal")
public class PortalController {

	@RequestMapping("/index")
	public ModelAndView index() {
		return new ModelAndView("portal/index");
	}
}
