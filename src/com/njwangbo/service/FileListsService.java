package com.njwangbo.service;

import java.util.List;

import com.njwangbo.exception.SysException;
import com.njwangbo.pojo.FileLists;
import com.njwangbo.pojo.GridCondition;

public interface FileListsService {

	public abstract List<FileLists> queryAllFilesByPage(GridCondition condition) throws SysException;

	public abstract int queryAllCount(GridCondition condition) throws SysException;

	public abstract String insert(FileLists fileLists) throws SysException;

	public abstract int delete(String id) throws SysException;

	public abstract int update(FileLists fileLists) throws SysException;

	public abstract FileLists queryByUserId(String userId) throws SysException;
	
	public abstract String queryByFileId(String id) throws SysException;
}
