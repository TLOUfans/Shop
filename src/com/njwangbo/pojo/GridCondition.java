package com.njwangbo.pojo;

public class GridCondition {
	private String condition;
	private String pageSize;
	private String pageNum;

	public GridCondition() {
	}

	public GridCondition(String condition, String pageSize, String pageNum) {
		this.condition = condition;
		this.pageSize = pageSize;
		this.pageNum = pageNum;
	}

	public String getCondition() {
		return condition;
	}

	public void setCondition(String condition) {
		this.condition = condition;
	}

	public String getPageSize() {
		return pageSize;
	}

	public void setPageSize(String pageSize) {
		this.pageSize = pageSize;
	}

	public String getPageNo() {
		return pageNum;
	}

	public void setPageNo(String pageNum) {
		this.pageNum = pageNum;
	}
}
