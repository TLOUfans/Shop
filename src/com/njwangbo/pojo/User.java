package com.njwangbo.pojo;

import java.util.List;

public class User {
	private String id;
	private String loginName;
	private String pwd;
	private String name;
	private String sex;
	private String face;
	private String money;
	private String tag;
	private String loginTime;
	private String createTime;
	private List<Address> addresses;
	private List<User> friends;

	public User() {

	}

	public User(String id, String loginName, String pwd, String name, String createTime) {
		this.id = id;
		this.loginName = loginName;
		this.pwd = pwd;
		this.name = name;
		this.createTime = createTime;
	}

	public User(String loginName, String pwd, String name) {
		this.loginName = loginName;
		this.pwd = pwd;
		this.name = name;
	}

	public User(String loginName, String pwd) {
		this.loginName = loginName;
		this.pwd = pwd;
	}

	public User(String loginName, String pwd, String name, String sex) {
		this.loginName = loginName;
		this.pwd = pwd;
		this.name = name;
		this.sex = sex;
	}

	public User(String id, String loginName, String pwd, String name, String sex, String face) {
		this.id = id;
		this.loginName = loginName;
		this.pwd = pwd;
		this.name = name;
		this.sex = sex;
		this.face = face;
	}

	public String getLoginTime() {
		return loginTime;
	}

	public void setLoginTime(String loginTime) {
		this.loginTime = loginTime;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getLoginName() {
		return loginName;
	}

	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}

	public String getPwd() {
		return pwd;
	}

	public void setPwd(String pwd) {
		this.pwd = pwd;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getFace() {
		return face;
	}

	public void setFace(String face) {
		this.face = face;
	}

	public List<Address> getAddresses() {
		return addresses;
	}

	public void setAddresses(List<Address> addresses) {
		this.addresses = addresses;
	}

	public String getMoney() {
		return money;
	}

	public void setMoney(String money) {
		this.money = money;
	}

	public String getTag() {
		return tag;
	}

	public void setTag(String tag) {
		this.tag = tag;
	}

	public List<User> getFriends() {
		return friends;
	}

	public void setFriends(List<User> friends) {
		this.friends = friends;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return id;
	}


}
