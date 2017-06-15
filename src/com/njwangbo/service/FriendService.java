package com.njwangbo.service;

import java.util.List;

import com.njwangbo.exception.SysException;
import com.njwangbo.pojo.GridCondition;
import com.njwangbo.pojo.MyFriends;


public interface FriendService {
	public abstract int add(String userId,String friendId,String tag) throws SysException;

	public abstract int delete(String userId,String friendId) throws SysException;
	
	public abstract List<MyFriends> queryByGroup(GridCondition condition) throws SysException;

	public abstract int queryAllCount(GridCondition condition) throws SysException;
}
