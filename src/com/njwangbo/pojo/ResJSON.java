package com.njwangbo.pojo;

public class ResJSON {
	private String isSuccess;
	private String errMsg = "";

	public ResJSON() {
	}

	public ResJSON(String isSuccess, String errMsg) {
		this.isSuccess = isSuccess;
		this.errMsg = errMsg;
	}

	public String getIsSuccess() {
		return isSuccess;
	}

	public void setIsSuccess(String isSuccess) {
		this.isSuccess = isSuccess;
	}

	public String getErrMsg() {
		return errMsg;
	}

	public void setErrMsg(String errMsg) {
		this.errMsg = errMsg;
	}

}
