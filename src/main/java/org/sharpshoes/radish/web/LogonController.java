package org.sharpshoes.radish.web;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.sharpshoes.radish.service.UserService;
import org.sharpshoes.radish.util.Constants;
import org.sharpshoes.radish.util.AuthUtil.LogonUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/direct-sale")
public class LogonController {

	@Autowired
	private UserService userService;
	
	@RequestMapping("/logon")
	public ModelAndView logon(HttpServletRequest request) {
		String method = request.getMethod();
		if ("post".equals(method.toLowerCase())){
			Map<String, String> errorMessage = new HashMap<String, String>();
			
			String logon_name = request.getParameter("logonName");
			String password = request.getParameter("password");
			
			
			if (logon_name == null || logon_name.trim().equals("")) {
				errorMessage.put("e_logon_name", "登录名不能为空！");
				return new ModelAndView("logon", errorMessage);
			}
			if (password == null || password.trim().equals("")) {
				errorMessage.put("e_password", "密码不能为空！");
				return new ModelAndView("logon", errorMessage);
			}
			
			LogonUser logonUser = this.userService.logon(logon_name, password);
			if (logonUser == null) {
				errorMessage.put("e_logon", "登录名或密码错误！");
				return new ModelAndView("logon", errorMessage);
			} else {
				request.getSession().setAttribute(Constants.SESSION_LOGON_USER, logonUser);
				return new ModelAndView("redirect:index");
			}
		} else {
			return new ModelAndView("logon");
		}
		
	}
	
	@RequestMapping("/logout")
	public ModelAndView logout(HttpServletRequest request) {
		request.getSession().setAttribute(Constants.SESSION_LOGON_USER, null);
		return new ModelAndView("redirect:logon");
	}
	
	@RequestMapping("/index")
	public ModelAndView index() {
		return new ModelAndView("index");
	}
}
