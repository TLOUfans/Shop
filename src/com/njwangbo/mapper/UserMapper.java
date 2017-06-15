package com.njwangbo.mapper;

import java.util.List;

import com.njwangbo.pojo.GridCondition;
import com.njwangbo.pojo.User;

public interface UserMapper {
	User queryById(String id) throws Exception;

	User queryByLoginName(String name) throws Exception;

	void add(User user) throws Exception;

	void update(User user) throws Exception;

	void delete(String id) throws Exception;

	List<User> queryAll(GridCondition condition) throws Exception;

	int getTotal(GridCondition condition) throws Exception;

	User queryByLoginNameAndPwd(User user) throws Exception;
}
