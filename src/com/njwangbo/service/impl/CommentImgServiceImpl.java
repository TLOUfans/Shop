package com.njwangbo.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.njwangbo.exception.SysException;
import com.njwangbo.mapper.CommentImgMapper;
import com.njwangbo.pojo.CommentImg;
import com.njwangbo.service.CommentImgService;

@Service
public class CommentImgServiceImpl implements CommentImgService{
	@Autowired
	private CommentImgMapper mapper;
	
	public void add(CommentImg commentImg) throws SysException {
		try {
			mapper.add(commentImg);
		} catch (Exception e) {
			e.printStackTrace();
			throw new SysException("添加评论图片失败");
		}
	}
}
