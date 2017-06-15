package com.njwangbo.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.njwangbo.exception.SysException;
import com.njwangbo.mapper.OrderMapper;
import com.njwangbo.pojo.GridCondition;
import com.njwangbo.pojo.Order;
import com.njwangbo.service.OrderService;

@Service
public class OrderServiceImpl implements OrderService {
	@Autowired
	private OrderMapper mapper;

	public String add(Order order) throws SysException {
		try {
			mapper.add(order);
		} catch (Exception e) {
			e.printStackTrace();
			throw new SysException("添加订单失败");
		}
		return order.getId();
	}

	public List<Order> queryByPage(GridCondition conditions) throws SysException {
		List<Order> orders = null;
		try {
			orders = mapper.queryByPage(conditions);
		} catch (Exception e) {
			e.printStackTrace();
			throw new SysException("查询订单失败");
		}
		return orders;
	}
	
	public int queryCountByPage(GridCondition conditions) throws SysException {
		int count = 0;
		try {
			count = mapper.queryCountByPage(conditions);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return count;
	}
	
	public void delete(String id) throws SysException {
		try {
			mapper.delete(id);
		} catch (Exception e) {
			e.printStackTrace();
			throw new SysException("删除订单失败");
		}
	}
	
	public void update(Order order) throws SysException {
		try {
			mapper.update(order);
		} catch (Exception e) {
			e.printStackTrace();
			throw new SysException("修改订单失败");
		}
	}
	
	public Order queryById(String id) throws SysException {
		Order order = null;
		try {
			order = mapper.queryById(id);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return order;
	}
}
