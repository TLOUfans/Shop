package com.njwangbo.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.njwangbo.exception.SysException;
import com.njwangbo.mapper.SmallImgMapper;
import com.njwangbo.pojo.SmallImg;
import com.njwangbo.service.SmallImgService;

@Service
public class SmallImgServiceImpl implements SmallImgService {
	@Autowired
	private SmallImgMapper mapper;

	public void add(SmallImg img) throws SysException {
		try {
			mapper.add(img);
		} catch (Exception e) {
			throw new SysException("图片添加失败");
		}
	}
	
	public void delete(String goodsId) throws SysException {
		try {
			mapper.delete(goodsId);
		} catch (Exception e) {
			throw new SysException("删除图片失败");
		}
	}
}
