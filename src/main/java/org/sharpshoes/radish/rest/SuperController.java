package org.sharpshoes.radish.rest;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/super")
public class SuperController {
	
	@RequestMapping("/query/{api_code}")
	public RestResponse query(@RequestParam String api_code) {
		return null;
	}
	
	@RequestMapping("/page_query/{api_code}")
	public RestResponse page_query(@RequestParam String api_code) {
		return null;
	}
	
	@RequestMapping("/count/{api_code}")
	public RestResponse count(@RequestParam String api_code) {
		return null;
	}
}
