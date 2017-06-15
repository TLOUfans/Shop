package com.njwangbo.pojo;

import java.util.List;

public class Order {
	private String id;
	private String orderNum;
	private String beginTime;
	private String endTime;
	private String status;
	private String totalMoney;
	private String payWay;
	private User user;
	private Address address;
	private List<Goods> goodsList;
	private List<OrderGoods> orderGoodsList;

	public Order() {

	}

	public Order(String totalMoney, String payWay, User user) {
		this.totalMoney = totalMoney;
		this.payWay = payWay;
		this.user = user;
	}

	public Order(String totalMoney, String payWay, User user, Address address) {
		this.totalMoney = totalMoney;
		this.payWay = payWay;
		this.user = user;
		this.address = address;
	}
	
	

	public Order(String id, String endTime, String status) {
		super();
		this.id = id;
		this.endTime = endTime;
		this.status = status;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getOrderNum() {
		return orderNum;
	}

	public void setOrderNum(String orderNum) {
		this.orderNum = orderNum;
	}

	public String getBeginTime() {
		return beginTime;
	}

	public void setBeginTime(String beginTime) {
		this.beginTime = beginTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getTotalMoney() {
		return totalMoney;
	}

	public void setTotalMoney(String totalMoney) {
		this.totalMoney = totalMoney;
	}

	public String getPayWay() {
		return payWay;
	}

	public void setPayWay(String payWay) {
		this.payWay = payWay;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public List<Goods> getGoodsList() {
		return goodsList;
	}

	public void setGoodsList(List<Goods> goodsList) {
		this.goodsList = goodsList;
	}

	public List<OrderGoods> getOrderGoodsList() {
		return orderGoodsList;
	}

	public void setOrderGoodsList(List<OrderGoods> orderGoodsList) {
		this.orderGoodsList = orderGoodsList;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

}
