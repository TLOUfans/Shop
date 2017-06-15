package com.njwangbo.pojo;

import java.util.List;

public class TypeItemTitle {
	private String id;
	private String itemTitle;
	private String url;
	private List<TypeItem> items;

	public TypeItemTitle() {

	}

	public TypeItemTitle(String id, String itemTitle, String url, List<TypeItem> items) {
		this.id = id;
		this.itemTitle = itemTitle;
		this.url = url;
		this.items = items;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getItemTitle() {
		return itemTitle;
	}

	public void setItemTitle(String itemTitle) {
		this.itemTitle = itemTitle;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public List<TypeItem> getItems() {
		return items;
	}

	public void setItems(List<TypeItem> items) {
		this.items = items;
	}

}
