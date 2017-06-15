package com.njwangbo.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.njwangbo.exception.SysException;
import com.njwangbo.pojo.Chat;
import com.njwangbo.pojo.GridJSON;
import com.njwangbo.pojo.ResJSON;
import com.njwangbo.pojo.User;
import com.njwangbo.service.ChatService;

@Controller
public class ChatController {
	@Autowired
	private ChatService chatService;

	@RequestMapping("/addChat")
	@ResponseBody
	public ResJSON addCart(HttpServletRequest request, HttpServletResponse resp) {
		// 权限验证
		User user = (User) request.getSession().getAttribute("user");
		if (user == null) {
			return new ResJSON();
		}
		String content = request.getParameter("content");
		String receiverId = request.getParameter("receiverId");
		User receiver = new User();
		receiver.setId(receiverId);
		Chat chat = new Chat(content, user, receiver);
		ResJSON json = new ResJSON();
		try {
			chatService.add(chat);
			json.setIsSuccess("true");
		} catch (SysException e) {
			e.printStackTrace();
			json.setErrMsg(e.getMessage());
		}
		return json;
	}

	@RequestMapping("/queryAllChat")
	@ResponseBody
	public GridJSON queryCart(HttpServletRequest request, HttpServletResponse resp) {
		// 权限验证
		User user = (User) request.getSession().getAttribute("user");
		if (user == null) {
			return new GridJSON();
		}
		String condition = request.getParameter("condition");
		GridJSON json = new GridJSON();
		try {
			List<Chat> rows = chatService.queryAll(condition);
			json.setRows(rows);
		} catch (SysException e) {
			e.printStackTrace();
		}
		return json;
	}
}
