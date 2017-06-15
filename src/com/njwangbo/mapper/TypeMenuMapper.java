package com.njwangbo.mapper;

import java.util.List;

import com.njwangbo.pojo.GridCondition;
import com.njwangbo.pojo.TypeMenu;

public interface TypeMenuMapper {
	List<TypeMenu> queryAll();

	List<TypeMenu> queryByPager(GridCondition condition);

	int queryTotal(GridCondition condition);

	void add(TypeMenu typeMenu) throws Exception;

	TypeMenu queryByNameAndNo(TypeMenu typeMenu) throws Exception;
	
	void delete(String id) throws Exception;
	
	void update(TypeMenu typeMenu) throws Exception;
	
	TypeMenu queryByNo(String no) throws Exception;
}
