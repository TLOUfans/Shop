package com.njwangbo.service;

import java.util.List;

import com.njwangbo.exception.SysException;
import com.njwangbo.pojo.Comment;
import com.njwangbo.pojo.GridCondition;

public interface CommentService {
	List<Comment> queryByPage(GridCondition condition) throws SysException;

	int quertAllCount(GridCondition condition) throws SysException;
	
	void delete(String id) throws SysException;
	
	String add(Comment comment) throws SysException;
}
