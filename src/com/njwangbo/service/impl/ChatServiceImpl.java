package com.njwangbo.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.njwangbo.exception.SysException;
import com.njwangbo.mapper.ChatMapper;
import com.njwangbo.pojo.Chat;
import com.njwangbo.service.ChatService;

@Service
public class ChatServiceImpl implements ChatService {
	@Autowired
	private ChatMapper mapper;
	
	public void add(Chat chat) throws SysException {
		try {
			mapper.add(chat);
		} catch (Exception e) {
			throw new SysException("添加聊天信息失败");
		}
	}
	
	public List<Chat> queryAll(String condition) throws SysException {
		List<Chat> chats = null;
		try {
			chats = mapper.queryAll(condition);
		} catch (Exception e) {
			throw new SysException("查询聊天信息失败");
		}
		return chats;
	}
}
