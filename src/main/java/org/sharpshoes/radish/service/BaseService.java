package org.sharpshoes.radish.service;

import org.sharpshoes.radish.entity.BaseEntity;
import org.sharpshoes.radish.mapper.BaseMapper;

public abstract class BaseService<T extends BaseEntity> {

	public abstract BaseMapper<T> getMapper();
	
	public void save(T t) {
		this.getMapper().save(t);
	}
	
	public void delete(Long id) {
		this.getMapper().delete(id);
	}
}
