package com.njwangbo.pojo;

import java.util.List;

public class Goods {
	private String id;
	private String name;
	private String price;
	private Integer num;
	private Integer sales;
	private Integer tate;
	private String des;
	private String bigImgPath;
	private String createTime;
	private String userId;
	private String userName;
	private String typeName;
	private String typeId;
	private List<SmallImg> smImgs;
	private List<Comment> comments;

	public Goods() {

	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public Integer getNum() {
		return num;
	}

	public void setNum(Integer num) {
		this.num = num;
	}

	public Integer getSales() {
		return sales;
	}

	public void setSales(Integer sales) {
		this.sales = sales;
	}

	public Integer getTate() {
		return tate;
	}

	public void setTate(Integer tate) {
		this.tate = tate;
	}

	public String getDes() {
		return des;
	}

	public void setDes(String des) {
		this.des = des;
	}

	public String getBigImgPath() {
		return bigImgPath;
	}

	public void setBigImgPath(String bigImgPath) {
		this.bigImgPath = bigImgPath;
	}

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getTypeName() {
		return typeName;
	}

	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}

	public String getTypeId() {
		return typeId;
	}

	public void setTypeId(String typeId) {
		this.typeId = typeId;
	}

	public List<SmallImg> getSmImgs() {
		return smImgs;
	}

	public void setSmImgs(List<SmallImg> smImgs) {
		this.smImgs = smImgs;
	}

	public Goods(String name, String price, Integer num, Integer sales, String des, String userId, String typeId, List<SmallImg> smImgs) {
		this.name = name;
		this.price = price;
		this.num = num;
		this.sales = sales;
		this.des = des;
		this.userId = userId;
		this.typeId = typeId;
		this.smImgs = smImgs;
	}

	public Goods(String id, String name, String price, Integer num, Integer sales, String des, String userId, String typeId, List<SmallImg> smImgs) {
		this.id = id;
		this.name = name;
		this.price = price;
		this.num = num;
		this.sales = sales;
		this.des = des;
		this.userId = userId;
		this.typeId = typeId;
		this.smImgs = smImgs;
	}

	public List<Comment> getComments() {
		return comments;
	}

	public void setComments(List<Comment> comments) {
		this.comments = comments;
	}

	
	
	
	

}
