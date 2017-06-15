package com.njwangbo.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.njwangbo.exception.SysException;
import com.njwangbo.mapper.GoodsMapper;
import com.njwangbo.pojo.Goods;
import com.njwangbo.pojo.GoodsCondition;
import com.njwangbo.service.GoodsService;

@Service
public class GoodsServiceImpl implements GoodsService {
	@Autowired
	private GoodsMapper mapper;

	public List<Goods> queryAll(GoodsCondition condition) {
		List<Goods> goodsList = mapper.queryAll(condition);
		return goodsList;
	}

	public int getTotal(GoodsCondition condition) {
		return mapper.getTotal(condition);
	}

	public String add(Goods goods) throws SysException {
		try {
			mapper.add(goods);
		} catch (Exception e) {
			throw new SysException("商品添加失败");
		}
		return goods.getId();
	}

	public String update(Goods goods) throws SysException {
		if (goods.getNum() < 0) {
			throw new SysException("库存不足");
		}
		try {
			mapper.update(goods);
		} catch (Exception e) {
			throw new SysException("修改商品失败");
		}
		return goods.getId();
	}

	public void delete(String id) throws SysException {
		try {
			mapper.delete(id);
		} catch (Exception e) {
			throw new SysException("商品删除失败");
		}
	}

	public Goods queryById(String id) throws SysException {
		Goods goods = null;
		try {
			goods = mapper.queryById(id);
		} catch (Exception e) {
			e.printStackTrace();
			throw new SysException("查询失败");
		}
		return goods;
	}
	
	
	public List<Goods> queryRealAll(GoodsCondition condition) throws SysException {
		List<Goods> list = null;
		try {
			list = mapper.queryRealAll(condition);
		} catch (Exception e) {
			throw new SysException(e.getMessage());
		}
		return list;
	}
}
