package com.njwangbo.pojo;

import java.util.List;

public class Comment {
	private String id;
	private String content;
	private String grade;
	private String createTime;
	private User user;
	private Goods goods;
	private List<CommentImg> comImgs;

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

	public String getGrade() {
		return grade;
	}

	public void setGrade(String grade) {
		this.grade = grade;
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

	public Goods getGoods() {
		return goods;
	}

	public void setGoods(Goods goods) {
		this.goods = goods;
	}

	public List<CommentImg> getComImgs() {
		return comImgs;
	}

	public void setComImgs(List<CommentImg> comImgs) {
		this.comImgs = comImgs;
	}

}
