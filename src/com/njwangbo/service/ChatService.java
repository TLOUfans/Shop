package com.njwangbo.service;

import java.util.List;

import com.njwangbo.exception.SysException;
import com.njwangbo.pojo.Chat;

public interface ChatService {
	void add(Chat chat) throws SysException;
	
	List<Chat> queryAll(String condition) throws SysException;
}
