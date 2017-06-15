package com.njwangbo.service;

import com.njwangbo.exception.SysException;
import com.njwangbo.pojo.SmallImg;

public interface SmallImgService {
	void add(SmallImg img) throws SysException;
	
	void delete(String goodsId) throws SysException;
}
