package com.njwangbo.pojo;

public class Cart {
	private String id;
	private User user;
	private Goods goods;
	private String goodsNum;
	private String checked;
	private String createTime;

	public Cart() {

	}

	public Cart(User user, Goods goods, String goodsNum) {
		this.user = user;
		this.goods = goods;
		this.goodsNum = goodsNum;
	}

	public Cart(String id, User user, Goods goods, String goodsNum) {
		super();
		this.id = id;
		this.user = user;
		this.goods = goods;
		this.goodsNum = goodsNum;
	}

	public Cart(String id, User user, Goods goods, String goodsNum, String checked) {
		super();
		this.id = id;
		this.user = user;
		this.goods = goods;
		this.goodsNum = goodsNum;
		this.checked = checked;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
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

	public String getGoodsNum() {
		return goodsNum;
	}

	public void setGoodsNum(String goodsNum) {
		this.goodsNum = goodsNum;
	}

	public String getCreateTime() {
		return createTime;
	}

	public String getChecked() {
		return checked;
	}

	public void setChecked(String checked) {
		this.checked = checked;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

}
