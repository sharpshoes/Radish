package org.sharpshoes.radish.mapper;

import org.apache.ibatis.annotations.DeleteProvider;
import org.apache.ibatis.annotations.InsertProvider;
import org.apache.ibatis.annotations.SelectProvider;
import org.apache.ibatis.annotations.UpdateProvider;
import org.sharpshoes.radish.entity.ApiEntity;

public interface ApiMapper extends BaseMapper<ApiEntity>{
	
	@InsertProvider(type=ApiMapper.class, method="insertSql")
	public void save(ApiEntity t);
	@DeleteProvider(type=ApiMapper.class, method="deleteSql")
	public void delete(Long id);
	@UpdateProvider(type=ApiMapper.class, method="udpateSql")
	public void update(ApiEntity t);
	@SelectProvider(type=ApiMapper.class, method="selectSql")
	public void getAll();
	@SelectProvider(type=ApiMapper.class, method="selectOneSql")
	public ApiEntity getOne(Long id);
	
	default Class<ApiEntity> getEntityType() {
		return ApiEntity.class;
	}
	
	public static class TestMapper implements ApiMapper {

		public static void main(String args[]) {
			TestMapper t = new TestMapper();
			t.insertSql();
		}
		
		@Override
		public void save(ApiEntity t) {
			// TODO Auto-generated method stub
			
		}

		@Override
		public void delete(Long id) {
			// TODO Auto-generated method stub
			
		}

		@Override
		public void update(ApiEntity t) {
			// TODO Auto-generated method stub
			
		}

		@Override
		public void getAll() {
			// TODO Auto-generated method stub
			
		}

		@Override
		public ApiEntity getOne(Long id) {
			// TODO Auto-generated method stub
			return null;
		}
		
	}
}


