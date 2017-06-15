package com.njwangbo.pojo;

import java.util.List;

public class TypeMenu {
	private String id;
	private String menu;
	private String url;
	private String no;
	private String createTime;
	private List<TypeItemTitle> typeItemTitles;

	public TypeMenu() {

	}

	public TypeMenu(String id, String menu, String url, String no, String createTime, List<TypeItemTitle> typeItemTitles) {
		this.id = id;
		this.menu = menu;
		this.url = url;
		this.no = no;
		this.createTime = createTime;
		this.typeItemTitles = typeItemTitles;
	}

	public TypeMenu(String menu, String no) {
		this.menu = menu;
		this.no = no;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getMenu() {
		return menu;
	}

	public void setMenu(String menu) {
		this.menu = menu;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getNo() {
		return no;
	}

	public void setNo(String no) {
		this.no = no;
	}

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

	public List<TypeItemTitle> getTypeItemTitles() {
		return typeItemTitles;
	}

	public TypeMenu(String id, String menu, String no) {
		this.id = id;
		this.menu = menu;
		this.no = no;
	}

	public void setTypeItemTitles(List<TypeItemTitle> typeItemTitles) {
		this.typeItemTitles = typeItemTitles;
	}

}
