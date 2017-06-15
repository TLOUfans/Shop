package com.njwangbo.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.njwangbo.exception.SysException;
import com.njwangbo.mapper.OrderGoodsMapper;
import com.njwangbo.pojo.OrderGoods;
import com.njwangbo.service.OrderGoodsService;

@Service
public class OrderGoodsServiceImpl implements OrderGoodsService {
	@Autowired
	private OrderGoodsMapper mapper;

	public void add(OrderGoods orderGoods) throws SysException {
		try {
			mapper.add(orderGoods);
		} catch (Exception e) {
			e.printStackTrace();
			throw new SysException("添加关联失败");
		}
	}
	
	 public void delete(String orderId) throws SysException {
		 try {
			mapper.delete(orderId);
		} catch (Exception e) {
			e.printStackTrace();
			throw new SysException("删除订单商品关联失败");
		}
	}
}
