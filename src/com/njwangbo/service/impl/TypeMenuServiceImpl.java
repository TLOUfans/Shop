package com.njwangbo.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.njwangbo.exception.SysException;
import com.njwangbo.mapper.TypeMenuMapper;
import com.njwangbo.pojo.GridCondition;
import com.njwangbo.pojo.TypeMenu;
import com.njwangbo.service.TypeMenuService;

@Service
public class TypeMenuServiceImpl implements TypeMenuService {
	@Autowired
	private TypeMenuMapper mapper;

	public List<TypeMenu> queryAll() {
		List<TypeMenu> menus = mapper.queryAll();
		return menus;
	}

	public List<TypeMenu> queryByPager(GridCondition condition) {
		List<TypeMenu> menus = mapper.queryByPager(condition);
		return menus;
	}
	
	public int queryTotal(GridCondition condition) {
		int total = mapper.queryTotal(condition);
		return total;
	}
	
	public void add(TypeMenu typeMenu) throws SysException {
		try {
			TypeMenu resTypeMenu = mapper.queryByNameAndNo(typeMenu);
			if(resTypeMenu != null) {
				throw new SysException("添加类型失败");
			}
			mapper.add(typeMenu);
		} catch (Exception e) {
			throw new SysException("类型或编号已经存在，不能添加");
		}
	}
	
	public void delete(String id) throws SysException {
		try {
			mapper.delete(id);
		} catch (Exception e) {
			throw new SysException("删除类型失败");
		}
	}
	
	public void update(TypeMenu typeMenu) throws SysException {
		try {
			mapper.update(typeMenu);
		} catch (Exception e) {
			throw new SysException("修改类型失败");
		}
	}
}
