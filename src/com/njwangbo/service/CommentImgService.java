package com.njwangbo.service;

import com.njwangbo.exception.SysException;
import com.njwangbo.pojo.CommentImg;

public interface CommentImgService {
	void add(CommentImg commentImg) throws SysException;
}
