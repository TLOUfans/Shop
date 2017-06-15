package com.njwangbo.mapper;

import com.njwangbo.pojo.SmallImg;

public interface SmallImgMapper {
	void add(SmallImg smallImg) throws Exception;
	
	void delete(String goodsId) throws Exception;
}
