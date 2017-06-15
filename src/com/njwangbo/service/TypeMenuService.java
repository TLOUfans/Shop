package com.njwangbo.service;

import java.util.List;

import com.njwangbo.exception.SysException;
import com.njwangbo.pojo.GridCondition;
import com.njwangbo.pojo.TypeMenu;

public interface TypeMenuService {
	List<TypeMenu> queryAll();
	
	List<TypeMenu> queryByPager(GridCondition condition);
	
	int queryTotal(GridCondition condition);
	
	void add(TypeMenu typeMenu) throws SysException;
	
	void delete(String id) throws SysException;
	
	void update(TypeMenu typeMenu) throws SysException;
}
