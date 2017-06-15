package com.njwangbo.service;

import java.util.List;

import com.njwangbo.exception.SysException;
import com.njwangbo.pojo.GridCondition;
import com.njwangbo.pojo.User;

public interface UserService {
	User queryById(String id) throws SysException;

	void regist(User user) throws SysException;

	void update(User user) throws SysException;

	void delete(String id) throws SysException;
	
	List<User> queryAll(GridCondition condition) throws SysException;
	
	public int getTotal(GridCondition condition) throws SysException;
	
	User login(User user) throws SysException;

}
