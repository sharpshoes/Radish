package org.sharpshoes.radish.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/admin")
public class AdminController {

	@RequestMapping("/index")
	public ModelAndView index() {
		return new ModelAndView("admin/index");
	}
	
	@RequestMapping("/f_bonus")
	public ModelAndView f_bonus() {
		return new ModelAndView("admin/f_bonus");
	}
	
	@RequestMapping("/f_pay_list")
	public ModelAndView f_pay_list() {
		return new ModelAndView("admin/f_pay_list");
	}
	
	@RequestMapping("/f_withdraw_list")
	public ModelAndView f_withdraw_list() {
		return new ModelAndView("admin/f_withdraw_list");
	}
	
	@RequestMapping("/i_indent_detail")
	public ModelAndView i_indent_detail() {
		return new ModelAndView("admin/i_indent_detail");
	}
	
	@RequestMapping("/i_indent_list")
	public ModelAndView i_indent_list() {
		return new ModelAndView("admin/i_indent_list");
	}
	
	@RequestMapping("/m_member_add")
	public ModelAndView m_member_add() {
		return new ModelAndView("admin/m_member_add");
	}
	
	@RequestMapping("/m_member_list")
	public ModelAndView m_member_list() {
		return new ModelAndView("admin/m_member_list");
	}
	
	@RequestMapping("/m_member_relation")
	public ModelAndView m_member_relation() {
		return new ModelAndView("admin/m_member_relation");
	}
	
	@RequestMapping("/m_role_list")
	public ModelAndView m_role_list() {
		return new ModelAndView("admin/m_role_list");
	}
	
	@RequestMapping("/my_changepwd")
	public ModelAndView my_changepwd() {
		return new ModelAndView("admin/my_changepwd");
	}
	
	@RequestMapping("/my_loginfo")
	public ModelAndView my_loginfo() {
		return new ModelAndView("admin/my_loginfo");
	}
	
	@RequestMapping("/may_main")
	public ModelAndView may_main() {
		return new ModelAndView("admin/may_main");
	}
	
	@RequestMapping("/my_personInfo")
	public ModelAndView my_personInfo() {
		return new ModelAndView("admin/my_personInfo");
	}
	
	@RequestMapping("/p_product_add")
	public ModelAndView p_product_add() {
		return new ModelAndView("admin/p_product_add");
	}
	
	@RequestMapping("/p_product_channel")
	public ModelAndView p_product_channel() {
		return new ModelAndView("admin/p_product_channel");
	}
	
	@RequestMapping("/p_product_list")
	public ModelAndView p_product_list() {
		return new ModelAndView("admin/p_product_list");
	}
	
	@RequestMapping("/s_system_log")
	public ModelAndView s_system_log() {
		return new ModelAndView("admin/s_system_log");
	}
	
	@RequestMapping("/s_system_set")
	public ModelAndView s_system_set() {
		return new ModelAndView("admin/s_system_set");
	}
}
