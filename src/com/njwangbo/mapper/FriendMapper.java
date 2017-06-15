package com.njwangbo.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.njwangbo.pojo.GridCondition;
import com.njwangbo.pojo.MyFriends;

public interface FriendMapper {
	public abstract int add(@Param("userId") String userId,@Param("friendId") String friendId,@Param("tag") String tag) throws Exception;

	public abstract int delete(@Param("userId") String userId,@Param("friendId") String friendId) throws Exception;
	
	public abstract List<MyFriends> queryByGroup(GridCondition condition) throws Exception;

	public abstract int queryAllCount(GridCondition condition) throws Exception;
}
