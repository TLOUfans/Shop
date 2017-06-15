package com.njwangbo.pojo;

import java.util.List;

public class MyFriends {
	private String id;
	private User mine;
	private List<User> friend;
	private String group;
	public MyFriends() {
		super();
	}
	public MyFriends(String id, User mine, List<User> friend, String group) {
		super();
		this.id = id;
		this.mine = mine;
		this.friend = friend;
		this.group = group;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public User getMine() {
		return mine;
	}
	public void setMine(User mine) {
		this.mine = mine;
	}
	public List<User> getFriend() {
		return friend;
	}
	public void setFriend(List<User> friend) {
		this.friend = friend;
	}
	public String getGroup() {
		return group;
	}
	public void setGroup(String group) {
		this.group = group;
	}
}
