package com.njwangbo.mapper;

import java.util.List;

import com.njwangbo.pojo.FileLists;
import com.njwangbo.pojo.GridCondition;

public interface FileListsMapper {
	
	public abstract List<FileLists> queryAllFilesByPage(GridCondition condition) throws Exception;
	
	public abstract int queryAllCount(GridCondition condition) throws Exception;

	public abstract int insert(FileLists fileLists) throws Exception;
	
	public abstract int delete(String id) throws Exception;
	
	public abstract int update(FileLists fileLists) throws Exception;
	
	public abstract FileLists queryByUserId(String userId) throws Exception;
	
	public abstract String queryByFileId(String id) throws Exception;
}
