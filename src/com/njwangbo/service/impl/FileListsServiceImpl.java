package com.njwangbo.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.njwangbo.exception.SysException;
import com.njwangbo.mapper.FileListsMapper;
import com.njwangbo.pojo.FileLists;
import com.njwangbo.pojo.GridCondition;
import com.njwangbo.service.FileListsService;

@Service
public class FileListsServiceImpl implements FileListsService {

	@Autowired
	private FileListsMapper fileListsMapper;
	
	public List<FileLists> queryAllFilesByPage(GridCondition condition) throws SysException {
		List<FileLists> fileList = null;
		try {
			fileList = fileListsMapper.queryAllFilesByPage(condition);
		} catch (Exception e) {
			e.printStackTrace();
			throw new SysException("文件查询失败");
		}
		return fileList;
	}

	public int queryAllCount(GridCondition condition) throws SysException {
		int count = 0;
		try {
			count = fileListsMapper.queryAllCount(condition);
		} catch (Exception e) {
			e.printStackTrace();
			throw new SysException("total查询失败");
		}
		return count;
	}

	public String insert(FileLists fileLists) throws SysException {
		try {
			fileListsMapper.insert(fileLists);
		} catch (Exception e) {
			e.printStackTrace();
			throw new SysException("文件上传失败");
		}
		return fileLists.getId();
	}

	public int delete(String id) throws SysException {
		int count = 0;
		try {
			count = fileListsMapper.delete(id);
		} catch (Exception e) {
			e.printStackTrace();
			throw new SysException("文件删除失败");
		}
		return count;
	}

	public int update(FileLists fileLists) throws SysException {
		int count = 0;
		try {
			count = fileListsMapper.update(fileLists);
		} catch (Exception e) {
			e.printStackTrace();
			throw new SysException("文件名修改失败");
		}
		return count;
	}

	public FileLists queryByUserId(String userId) throws SysException {
		FileLists fileList = null;
		try {
			fileList = fileListsMapper.queryByUserId(userId);
		} catch (Exception e) {
			e.printStackTrace();
			throw new SysException("该用户文件查询失败");
		}
		return fileList;
	}

	public String queryByFileId(String id) throws SysException {
		String fileName = null;
		try {
			fileName = fileListsMapper.queryByFileId(id);
		} catch (Exception e) {
			e.printStackTrace();
			throw new SysException("文件名查询失败");
		}
		return fileName;
	}
}
