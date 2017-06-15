package com.njwangbo.service;

import java.util.List;

import com.njwangbo.exception.SysException;
import com.njwangbo.pojo.GridCondition;
import com.njwangbo.pojo.Order;

public interface OrderService {
	String add(Order order) throws SysException;
	
	List<Order> queryByPage(GridCondition conditions) throws SysException; 
	
	int queryCountByPage(GridCondition conditions) throws SysException;
	
	void delete(String id) throws SysException;
	
	void update(Order order) throws SysException;
	
	Order queryById(String id) throws SysException;
}
