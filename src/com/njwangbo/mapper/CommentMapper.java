package com.njwangbo.mapper;

import java.util.List;

import com.njwangbo.pojo.Comment;
import com.njwangbo.pojo.GridCondition;

public interface CommentMapper {
	List<Comment> queryByPage(GridCondition condition) throws Exception;

	int queryAllCount(GridCondition condition) throws Exception;
	
	void delete(String id) throws Exception;
	
	void add(Comment comment) throws Exception;
}
