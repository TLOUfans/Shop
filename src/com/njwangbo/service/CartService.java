package com.njwangbo.service;

import java.util.List;

import com.njwangbo.exception.SysException;
import com.njwangbo.pojo.Cart;
import com.njwangbo.pojo.CartCondition;

public interface CartService {
	List<Cart> queryByUserId(CartCondition condition) throws SysException;
	
	int queryCountByUserId(CartCondition condition) throws SysException;
	
	int queryCountByPage(CartCondition condition) throws SysException;
	
	List<Cart> queryByPage(CartCondition condition) throws SysException;
	
	Cart queryByGoodsId(CartCondition condition) throws SysException;
	
	void delete(String id) throws SysException;
	
	void add(Cart cart) throws SysException;
	
	void update(Cart cart) throws SysException;
}
