package com.njwangbo.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.njwangbo.exception.SysException;
import com.njwangbo.pojo.Comment;
import com.njwangbo.pojo.GridCondition;
import com.njwangbo.pojo.GridJSON;
import com.njwangbo.pojo.MyFriends;
import com.njwangbo.pojo.ResJSON;
import com.njwangbo.pojo.User;
import com.njwangbo.service.FriendService;

@Controller
public class FriendController {
	@Autowired
	private FriendService friendService;

	@RequestMapping("/deleteFriend")
	@ResponseBody
	public ResJSON deleteFriend(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("user");
		if (user == null) {
			return new ResJSON();
		}
		String userId = user.getId();
		String friendId = request.getParameter("friendId");
		ResJSON json = new ResJSON();
		try {
			friendService.delete(userId,friendId);
			friendService.delete(friendId,userId);
			json.setIsSuccess("true");
		} catch (Exception e) {
			json.setIsSuccess("false");
			json.setErrMsg(e.getMessage());
		}
		return json;
	}

	@RequestMapping("/addFriend")
	@ResponseBody
	public ResJSON addFriend(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		// 权限验证
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("user");
		if (user == null) {
			return new ResJSON();
		}
		String tag = request.getParameter("tag");
		String friendId = request.getParameter("friendId");
		String userId = user.getId();
		ResJSON json = new ResJSON();
		try {
			friendService.add(userId, friendId, tag);
			friendService.add(friendId, userId, "0");
			json.setIsSuccess("true");
		} catch (SysException e) {
			json.setIsSuccess("false");
			json.setErrMsg(e.getMessage());
		}
		return json;
	}
	
	@RequestMapping("/queryByGroup")
	@ResponseBody
	public GridJSON queryByGroup(HttpServletRequest request, HttpServletResponse response) {
		// 前台ajax发送过来的参数
		String condition = request.getParameter("condition");
		String pageNumStr = request.getParameter("pageNum");
		String pageSizeStr = request.getParameter("pageSize");
		// 表格查询条件
		GridCondition conditions = new GridCondition();
		conditions.setCondition(condition);
		conditions.setPageNo(pageNumStr);
		conditions.setPageSize(pageSizeStr);
		GridJSON json = new GridJSON();
		try {
			List<MyFriends> rows = friendService.queryByGroup(conditions);
			int total = friendService.queryAllCount(conditions);
			json.setRows(rows);
			json.setTotal(total);
		} catch (SysException e) {
			e.printStackTrace();
		}
		return json;
	}

}
