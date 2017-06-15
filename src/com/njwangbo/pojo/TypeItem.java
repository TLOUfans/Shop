package com.njwangbo.pojo;

public class TypeItem {
	private String id;
	private String item;
	private String url;

	public TypeItem() {
	}

	public TypeItem(String id, String item, String url) {
		this.id = id;
		this.item = item;
		this.url = url;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getItem() {
		return item;
	}

	public void setItem(String item) {
		this.item = item;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

}
