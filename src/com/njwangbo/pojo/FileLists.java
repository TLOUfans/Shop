package com.njwangbo.pojo;

public class FileLists {
	private String id;
	private String userId;
	private String fileName;
	private String fileSize;
	private String fileType;
	private String createTime;

	public FileLists() {
		super();
	}

	public FileLists(String userId, String fileName, String fileSize, String fileType) {
		super();
		this.userId = userId;
		this.fileName = fileName;
		this.fileSize = fileSize;
		this.fileType = fileType;
	}

	public FileLists(String id, String fileName) {
		super();
		this.fileName = fileName;
		this.id = id;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getFileSize() {
		return fileSize;
	}

	public void setFileSize(String fileSize) {
		this.fileSize = fileSize;
	}

	public String getFileType() {
		return fileType;
	}

	public void setFileType(String fileType) {
		this.fileType = fileType;
	}

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

}
