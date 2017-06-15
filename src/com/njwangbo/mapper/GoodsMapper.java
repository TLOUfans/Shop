package com.njwangbo.mapper;

import java.util.List;

import com.njwangbo.pojo.Goods;
import com.njwangbo.pojo.GoodsCondition;

public interface GoodsMapper {
	List<Goods> queryAll(GoodsCondition condition);

	int getTotal(GoodsCondition condition);

	void add(Goods goods) throws Exception;
	
	void update(Goods goods) throws Exception;
	
	void delete(String id) throws Exception;
	
	Goods queryById(String id) throws Exception;
	
	List<Goods> queryRealAll(GoodsCondition condition) throws Exception;
}
