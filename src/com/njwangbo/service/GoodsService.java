package com.njwangbo.service;

import java.util.List;

import com.njwangbo.exception.SysException;
import com.njwangbo.pojo.Goods;
import com.njwangbo.pojo.GoodsCondition;

public interface GoodsService {
	List<Goods> queryAll(GoodsCondition condition);
	
	int getTotal(GoodsCondition condition);
	
	String add(Goods goods) throws SysException;
	
	String update(Goods goods) throws SysException;
	
	void delete(String id) throws SysException;
	
	Goods queryById(String id) throws SysException;
	
	List<Goods> queryRealAll(GoodsCondition condition) throws SysException;
}
