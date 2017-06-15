package com.njwangbo.pojo;

public class CommentImg {
	private String id;
	private String url;
	private String commentId;
	private String createTime;

	public CommentImg() {

	}

	public CommentImg(String url, String commentId) {
		super();
		this.url = url;
		this.commentId = commentId;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getCommentId() {
		return commentId;
	}

	public void setCommentId(String commentId) {
		this.commentId = commentId;
	}

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

}
