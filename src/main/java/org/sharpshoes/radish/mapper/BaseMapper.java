package org.sharpshoes.radish.mapper;

import java.lang.reflect.Field;

import org.sharpshoes.radish.entity.BaseEntity;
import org.sharpshoes.radish.entity.Table;

public interface BaseMapper<T extends BaseEntity>{

	public void save(T t);
	public void delete(Long id);
	public void update(T t);
	public void getAll();
	public T getOne(Long id);
	
	abstract Class<T> getEntityType();
	
	default String insertSql() {
		
		Class<T> tType = this.getEntityType();
		String tableName = getTableName(tType);
		
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("insert into " + tableName + "(");
    	
		Field[] fields = tType.getDeclaredFields();
		for (Field field : fields) {
			sqlBuffer.append(field.getName()).append(",");
		}
		sqlBuffer.deleteCharAt(sqlBuffer.length() - 1);
		sqlBuffer.append(") values (");
		for (Field field : fields) {
			sqlBuffer.append("#{").append(field.getName()).append("},");
		}
		sqlBuffer.deleteCharAt(sqlBuffer.length() - 1);
    	return sqlBuffer.toString();
    	
	}
	
	default String getTableName(Class<T> tType) {
		Table tableAnnotation = tType.getDeclaredAnnotation(Table.class);
		if (tableAnnotation == null) {
			throw new NullPointerException("There is no TABLE annotation; Can not generate insert SQL automatically");
		}
		String tableName = tableAnnotation.name();
		return tableName;
	}
    
    default String deleteSql() {
    	Class<T> tType = this.getEntityType();
		String tableName = getTableName(tType);
		
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("delete from ").append(tableName).append(" where id = #id");
		return sqlBuffer.toString();
    }
    
    default String udpateSql() {
    	Class<T> tType = this.getEntityType();
		String tableName = getTableName(tType);
		
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("update " + tableName + " set ");
    	
		Field[] fields = tType.getDeclaredFields();
		for (Field field : fields) {
			if (field.getName().equals("id")) {
				sqlBuffer.append(field.getName()).append("=#{").append(field.getName()).append("},");
			}
		}
		sqlBuffer.deleteCharAt(sqlBuffer.length() - 1);
		sqlBuffer.append(" where id = #{id}");
    	return sqlBuffer.toString();
    }
    
    default String selectSql() {
    	Class<T> tType = this.getEntityType();
		String tableName = getTableName(tType);
		
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("select * from ").append(tableName);
		return sqlBuffer.toString();
    }
    
    default String selectOneSql() {
    	Class<T> tType = this.getEntityType();
		String tableName = getTableName(tType);
		
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("select * from ").append(tableName).append(" where id = #id");
		return sqlBuffer.toString();
    }
}
