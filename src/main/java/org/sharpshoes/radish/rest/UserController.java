package org.sharpshoes.radish.rest;

import org.sharpshoes.radish.entity.UserEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController extends BaseController<UserEntity>{

	@RequestMapping("/create")
	public void create() {
		
	}
}
