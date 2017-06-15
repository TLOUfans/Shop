package com.njwangbo.mapper;

import java.util.List;

import com.njwangbo.pojo.GridCondition;
import com.njwangbo.pojo.Order;

public interface OrderMapper {

	List<Order> queryByPage(GridCondition condition) throws Exception;

	int queryCountByPage(GridCondition condition) throws Exception;

	void delete(String id) throws Exception;

	void add(Order order) throws Exception;

	void update(Order order) throws Exception;
	
	Order queryById(String id) throws Exception;
}
