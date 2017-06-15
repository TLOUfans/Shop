package com.njwangbo.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.njwangbo.exception.SysException;
import com.njwangbo.mapper.FriendMapper;
import com.njwangbo.pojo.GridCondition;
import com.njwangbo.pojo.MyFriends;
import com.njwangbo.service.FriendService;

@Service
public class FriendServiceImpl implements FriendService{

	@Autowired
	private FriendMapper mapper;
	public int add(String userId, String friendId,String tag) throws SysException {
		int count = 0;
		try {
			count = mapper.add(userId,friendId,tag);
		} catch (Exception e) {
			throw new SysException("好友添加失败");
		}
		return count;
	}

	public int delete(String userId,String friendId) throws SysException {
		int count = 0;
		try {
			count = mapper.delete(userId,friendId);
		} catch (Exception e) {
			throw new SysException("好友删除失败");
		}
		return count;
	}

	public List<MyFriends> queryByGroup(GridCondition condition)
			throws SysException {
		List<MyFriends> myFriends = null;
		try {
			myFriends = mapper.queryByGroup(condition);
		} catch (Exception e) {
			throw new SysException("好友分组查询失败");
		}
		return myFriends;
	}

	public int queryAllCount(GridCondition condition) throws SysException {
		int count = 0;
		try {
			count = mapper.queryAllCount(condition);
		} catch (Exception e) {
			throw new SysException("total查询失败");
		}
		return count;
	}

}
