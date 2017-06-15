package com.njwangbo.pojo;

public class SmallImg {
	private String id;
	private String src;
	private String url;
	private String goodsId;

	public SmallImg(String url, String goodsId) {
		this.url = url;
		this.goodsId = goodsId;
	}

	public SmallImg() {

	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getSrc() {
		return src;
	}

	public void setSrc(String src) {
		this.src = src;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getGoodsId() {
		return goodsId;
	}

	public void setGoodsId(String goodsId) {
		this.goodsId = goodsId;
	}

}
