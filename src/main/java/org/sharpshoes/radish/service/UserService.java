package org.sharpshoes.radish.service;

import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.util.Date;

import org.sharpshoes.radish.entity.UserEntity;
import org.sharpshoes.radish.mapper.BaseMapper;
import org.sharpshoes.radish.mapper.UserMapper;
import org.sharpshoes.radish.util.AuthUtil.LogonUser;
import org.sharpshoes.radish.util.MD5Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("UserService")
public class UserService extends BaseService<UserEntity> {

	@Autowired
	UserMapper userMapper;
	
	@Override
	public BaseMapper<UserEntity> getMapper() {
		return userMapper;
	}

	
	public LogonUser logon(String logon_name, String password) {
		
		UserEntity user = this.userMapper.getByLogonName(logon_name);
		if (user == null) {
			return null;
		}
		
		boolean valid = false;
		try {
			valid = MD5Util.validPassword(password, user.getPassword());
			if (valid) {
				return new LogonUser(user);
			}
		} catch (NoSuchAlgorithmException | UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	
	public void createUser(String logon_name, String password, String nick_name) {
		UserEntity user = new UserEntity();
		
		user.setCreate_time(new Date());
		user.setLogon_name(logon_name);
		user.setNick_name(nick_name);
		
		try {
			user.setPassword(MD5Util.getEncryptedPwd(password));
		} catch (NoSuchAlgorithmException | UnsupportedEncodingException e) {
			e.printStackTrace();
		}
	}
	
	public UserEntity getOne(Long id) {
		UserEntity userEntity = this.getOne(id);
		userEntity.setPassword("");
		return userEntity;
	}
	
}
