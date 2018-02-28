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

import org.sharpshoes.radish.util.Constants;

@WebFilter(filterName="authFilter", urlPatterns = {"/rest/*","/portal/*"})
public class AuthFilter implements Filter {

	@Override
	public void destroy() {
		
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain arg2)
			throws IOException, ServletException {
		HttpServletRequest httpRequest = (HttpServletRequest)request;
		if (httpRequest.getSession().getAttribute(Constants.SESSION_LOGON_USER) == null) {
			((HttpServletResponse)response).sendRedirect("/index/logon");
		} else {
			arg2.doFilter(httpRequest, response);
		}
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {

	}

}
