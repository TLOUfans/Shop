package com.njwangbo.mapper;

import java.util.List;

import com.njwangbo.pojo.Cart;
import com.njwangbo.pojo.CartCondition;

public interface CartMapper {

	List<Cart> queryByUserId(CartCondition condition) throws Exception;

	int queryCountByUserId(CartCondition condition) throws Exception;
	
	int queryCountByPage(CartCondition condition) throws Exception;
	
	List<Cart> queryByPage(CartCondition condition) throws Exception;
	
	Cart queryByGoodsId(CartCondition condition) throws Exception;
	
	void delete(String id) throws Exception; 
	
	void add(Cart cart) throws Exception;
	
	void update(Cart cart) throws Exception;
}
