package com.njwangbo.pojo;

public class OrderGoods {
	private String id;
	private String orderId;
	private String goodsId;
	private String goodsNum;
	private Goods goods;
	private User seller;

	public OrderGoods() {

	}

	public OrderGoods(String orderId, String goodsId, String goodsNum) {
		this.orderId = orderId;
		this.goodsId = goodsId;
		this.goodsNum = goodsNum;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getOrderId() {
		return orderId;
	}

	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}

	public String getGoodsId() {
		return goodsId;
	}

	public void setGoodsId(String goodsId) {
		this.goodsId = goodsId;
	}

	public String getGoodsNum() {
		return goodsNum;
	}

	public void setGoodsNum(String goodsNum) {
		this.goodsNum = goodsNum;
	}

	public Goods getGoods() {
		return goods;
	}

	public void setGoods(Goods goods) {
		this.goods = goods;
	}

	public User getSeller() {
		return seller;
	}

	public void setSeller(User seller) {
		this.seller = seller;
	}
	
	

}
