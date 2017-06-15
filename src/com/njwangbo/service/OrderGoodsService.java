package com.njwangbo.service;

import com.njwangbo.exception.SysException;
import com.njwangbo.pojo.OrderGoods;

public interface OrderGoodsService {
	void add(OrderGoods orderGoods) throws SysException;
	
	void delete(String orderId) throws SysException;
}
