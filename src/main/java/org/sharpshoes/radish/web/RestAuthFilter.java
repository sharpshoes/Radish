package org.sharpshoes.radish.web;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.sharpshoes.radish.rest.RestResponse;
import org.sharpshoes.radish.util.BusinessException;
import org.sharpshoes.radish.util.Constants;

import com.alibaba.fastjson.JSON;

@WebFilter(filterName="authFilter", urlPatterns = {"/api/*"})
public class RestAuthFilter implements Filter {

	@Override
	public void destroy() {
		
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain arg2)
			throws IOException, ServletException {
		HttpServletRequest httpRequest = (HttpServletRequest)request;
		if (httpRequest.getSession().getAttribute(Constants.SESSION_LOGON_USER) == null) {
			HttpServletResponse httpResponse = (HttpServletResponse)response;
			httpResponse.setContentType("application/json");
			
			RestResponse rest = new RestResponse();
			rest.setCode(BusinessException.ERROR_NOT_AUTH);
			rest.setMessage("用户未登录！");
			
			String objJson = JSON.toJSONString(rest);
			response.getWriter().print(objJson);
			
		} else {
			arg2.doFilter(httpRequest, response);
		}
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {

	}

}
