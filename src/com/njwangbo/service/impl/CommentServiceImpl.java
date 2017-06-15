package com.njwangbo.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.njwangbo.exception.SysException;
import com.njwangbo.mapper.CommentMapper;
import com.njwangbo.pojo.Comment;
import com.njwangbo.pojo.GridCondition;
import com.njwangbo.service.CommentService;

@Service
public class CommentServiceImpl implements CommentService{
	@Autowired
	private CommentMapper mapper;
	
	public List<Comment> queryByPage(GridCondition condition) throws SysException {
		List<Comment> comments = null;
		try {
			comments = mapper.queryByPage(condition);
		} catch (Exception e) {
			e.printStackTrace();
			throw new SysException("查询评论失败");
		}
		return comments;
	}
	
	public int quertAllCount(GridCondition condition) throws SysException {
		int count = 0;
		try {
			count = mapper.queryAllCount(condition);
		} catch (Exception e) {
			e.printStackTrace();
			throw new SysException("查询评论总数失败");
		}
		return count;
	}
	
	public void delete(String id) throws SysException {
		try {
			mapper.delete(id);
		} catch (Exception e) {
			e.printStackTrace();
			throw new SysException("删除评价失败");
		}
	}
	
	public String add(Comment comment) throws SysException {
		try {
			mapper.add(comment);
		} catch (Exception e) {
			e.printStackTrace();
			throw new SysException("添加评论失败");
		}
		return comment.getId();
	}
}
