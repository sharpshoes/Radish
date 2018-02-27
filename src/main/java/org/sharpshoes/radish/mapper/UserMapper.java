package org.sharpshoes.radish.mapper;

import org.apache.ibatis.annotations.InsertProvider;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.sharpshoes.radish.entity.UserEntity;

public interface UserMapper extends BaseMapper<UserEntity> {

	@InsertProvider(type=UserMapper.class, method = "insertSql")
	@Options(useGeneratedKeys = true)
	public void save(UserEntity t);
	@InsertProvider(type=UserMapper.class, method = "deleteSql")
	public void delete(Long id);
	@InsertProvider(type=UserMapper.class, method = "updateSql")
	public void update(UserEntity t);
	@InsertProvider(type=UserMapper.class, method = "selectSql")
	public void getAll();
	@InsertProvider(type=UserMapper.class, method = "selectOneSql")
	public UserEntity getOne(Long id);
	@Select("select * from t_user where logon_name = #{logon_name}")
	public UserEntity getByLogonName(String logon_name);
	default Class<UserEntity> getEntityType() {
		return UserEntity.class;
	}
	
}
