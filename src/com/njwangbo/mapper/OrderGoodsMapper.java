package com.njwangbo.mapper;

import com.njwangbo.pojo.OrderGoods;

public interface OrderGoodsMapper {
	void add(OrderGoods orderGoods) throws Exception;
	
	void delete(String orderId) throws Exception;
}
