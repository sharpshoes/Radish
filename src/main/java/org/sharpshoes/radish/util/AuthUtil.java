package org.sharpshoes.radish.util;

import java.util.Date;

import org.sharpshoes.radish.entity.UserEntity;

public class AuthUtil {

	public static ThreadLocal<LogonUser> currentUserCache = new ThreadLocal<LogonUser>();
	
	public static LogonUser currentUser() {
		return currentUserCache.get();
	}
	
	public static void setCurrentUser(LogonUser currentUser) {
		currentUserCache.set(currentUser);
	}
	
	public static class LogonUser {
		
		public LogonUser(UserEntity user) {
			this.user_id = user.getId();
			this.logon_name = user.getLogon_name();
			this.nick_name = user.getNick_name();
			this.logon_time = new Date();
		}
		private Long user_id;
		private String logon_name;
		private String nick_name;
		private Date logon_time;
		
		public String getLogon_name() {
			return logon_name;
		}
		public void setLogon_name(String logon_name) {
			this.logon_name = logon_name;
		}
		public Long getUser_id() {
			return user_id;
		}
		public void setUser_id(Long user_id) {
			this.user_id = user_id;
		}
		public String getNick_name() {
			return nick_name;
		}
		public void setNick_name(String nick_name) {
			this.nick_name = nick_name;
		}
		public Date getLogon_time() {
			return logon_time;
		}
		public void setLogon_time(Date logon_time) {
			this.logon_time = logon_time;
		}
	}
}
