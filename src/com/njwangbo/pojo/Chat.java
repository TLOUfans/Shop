package com.njwangbo.pojo;

public class Chat {
	private String id;
	private String content;
	private String createTime;
	private User user;
	private User receiver;

	public Chat() {
		// TODO Auto-generated constructor stub
	}

	public Chat(String content, User user) {
		this.content = content;
		this.user = user;
	}

	public Chat(String content, User user, User receiver) {
		this.content = content;
		this.user = user;
		this.receiver = receiver;
	}

	public User getReceiver() {
		return receiver;
	}

	public void setReceiver(User receiver) {
		this.receiver = receiver;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}
