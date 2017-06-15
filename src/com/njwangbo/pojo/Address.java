package com.njwangbo.pojo;

public class Address {
	private String id;
	private String receiver;
	private String area;
	private String areaDes;
	private String tel;
	private String userId;

	public Address() {

	}

	public Address(String receiver, String area, String areaDes, String tel, String userId) {
		super();
		this.receiver = receiver;
		this.area = area;
		this.areaDes = areaDes;
		this.tel = tel;
		this.userId = userId;
	}
	
	

	public Address(String id, String receiver, String area, String areaDes, String tel, String userId) {
		super();
		this.id = id;
		this.receiver = receiver;
		this.area = area;
		this.areaDes = areaDes;
		this.tel = tel;
		this.userId = userId;
	}

	public String getReceiver() {
		return receiver;
	}

	public void setReceiver(String receiver) {
		this.receiver = receiver;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getArea() {
		return area;
	}

	public void setArea(String area) {
		this.area = area;
	}

	public String getAreaDes() {
		return areaDes;
	}

	public void setAreaDes(String areaDes) {
		this.areaDes = areaDes;
	}

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}
}
