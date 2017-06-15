package com.njwangbo.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.njwangbo.exception.SysException;
import com.njwangbo.mapper.CartMapper;
import com.njwangbo.pojo.Cart;
import com.njwangbo.pojo.CartCondition;
import com.njwangbo.service.CartService;

@Service
public class CartServiceImpl implements CartService {

	@Autowired
	private CartMapper mapper;

	public List<Cart> queryByUserId(CartCondition cartCondition) throws SysException {
		List<Cart> carts = null;
		try {
			carts = mapper.queryByUserId(cartCondition);
		} catch (Exception e) {
			e.printStackTrace();
			throw new SysException("查询购物车失败");
		}
		return carts;
	}

	public int queryCountByUserId(CartCondition condition) throws SysException {
		int count = 0;
		try {
			count = mapper.queryCountByUserId(condition);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return count;
	}

	public int queryCountByPage(CartCondition condition) throws SysException {
		int count = 0;
		try {
			count = mapper.queryCountByPage(condition);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return count;
	}

	public List<Cart> queryByPage(CartCondition condition) throws SysException {
		List<Cart> carts = null;
		try {
			carts = mapper.queryByPage(condition);
		} catch (Exception e) {
			e.printStackTrace();
			throw new SysException("查询购物车失败");
		}
		return carts;
	}
	
	public void delete(String id) throws SysException {
		try {
			mapper.delete(id);
		} catch (Exception e) {
			e.printStackTrace();
			throw new SysException("删除购物车失败");
		}
	}
	
	public void add(Cart cart) throws SysException {
		try {
			mapper.add(cart);
		} catch (Exception e) {
			e.printStackTrace();
			throw new SysException("添加到购物车失败");
		}
	}
	
	public void update(Cart cart) throws SysException {
		try {
			mapper.update(cart);
		} catch (Exception e) {
			throw new SysException("修改商品数量失败");
		}
	}
	
	public Cart queryByGoodsId(CartCondition condition) throws SysException {
		Cart cart = null;
		try {
			cart = mapper.queryByGoodsId(condition);
		} catch (Exception e) {
			// TODO Auto-generated catch block
		}
		return cart;
	}
}
