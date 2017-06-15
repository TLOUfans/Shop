package com.njwangbo.controller;

import java.io.OutputStream;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.njwangbo.exception.SysException;
import com.njwangbo.pojo.GridCondition;
import com.njwangbo.pojo.GridJSON;
import com.njwangbo.pojo.ResJSON;
import com.njwangbo.pojo.User;
import com.njwangbo.service.UserService;
import com.njwangbo.util.Formatter;
import com.njwangbo.util.MakeCertPic;
import com.njwangbo.util.MySessionListener;

@Controller
public class UserController {
	@Autowired
	private UserService userService;

	@RequestMapping("/getAllUserByPage")
	@ResponseBody
	public GridJSON queryAllUsers(HttpServletRequest request, HttpServletResponse response) throws Exception {
		// 权限验证
		User user = (User) request.getSession().getAttribute("user");
		if (user == null) {
			return new GridJSON();
		}
		// 前台ajax发送过来的参数
		String condition = request.getParameter("condition");
		String pageNumStr = request.getParameter("pageNum");
		String pageSizeStr = request.getParameter("pageSize");
		// 表格查询条件
		GridCondition conditions = new GridCondition();
		conditions.setCondition(condition);
		conditions.setPageNo(pageNumStr);
		conditions.setPageSize(pageSizeStr);

		// 根据条件和页码查询分页后的用户
		List<User> rows = userService.queryAll(conditions);
		// 根据条件查询用户总数
		int total = userService.getTotal(conditions);

		GridJSON json = new GridJSON();
		json.setTotal(total);
		json.setRows(rows);
		return json;
	}

	@RequestMapping("/regist")
	@ResponseBody
	public ResJSON regist(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String loginName = request.getParameter("loginName");
		String pwd = request.getParameter("pwd");
		String name = request.getParameter("name");
		String sex = request.getParameter("sex");
		ResJSON json = new ResJSON();
		try {
			if (!loginName.matches("^[A-Za-z0-9\\-\\_]{3,20}$")) {
				throw new SysException("登录名只能包含3~20个英文、数字、减号、下划线");
			}
			if (!name.matches("^[A-Za-z0-9\u4E00-\u9fa5\\-\\_]{2,20}$")) {
				throw new SysException("昵称只能包含2~20个中文、英文、数字、减号、下划线");
			}
			if (!pwd.matches("^[A-Za-z0-9\\-\\_]{6,20}$")) {
				throw new SysException("密码只能包含6~20个英文、数字、减号、下划线");
			}
			userService.regist(new User(loginName, pwd, name, sex));
			json.setIsSuccess("true");
		} catch (SysException e) {
			json.setIsSuccess("false");
			json.setErrMsg(e.getMessage());
		}
		return json;
	}

	@RequestMapping("/login")
	@ResponseBody
	public ResJSON login(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String loginName = request.getParameter("loginName");
		String pwd = request.getParameter("pwd");
		String code = request.getParameter("code");
		ResJSON json = new ResJSON();
		HttpSession session = request.getSession();
		String serverCode = (String) session.getAttribute("code");
		try {
			if (!code.equalsIgnoreCase(serverCode)) {
				throw new SysException("验证码错误");
			}
			User user = userService.login(new User(loginName, pwd));
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
			user.setLoginTime(sdf.format(new Date()));
			session.setAttribute("user", user);
			MySessionListener.activeUsers.put(user.getId(), user);
			json.setIsSuccess("true");
		} catch (SysException e) {
			json.setIsSuccess("false");
			json.setErrMsg(e.getMessage());
		}
		return json;
	}
	@RequestMapping("/queryById")
	@ResponseBody
	public User queryById(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String userId = request.getParameter("userId");
		User user = userService.queryById(userId);
		return user;
	}

	@RequestMapping("/deleteUser")
	@ResponseBody
	public ResJSON deleteUser(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String id = request.getParameter("id");
		ResJSON json = new ResJSON();
		try {
			userService.delete(id);
			json.setIsSuccess("true");
		} catch (Exception e) {
			json.setIsSuccess("false");
			json.setErrMsg(e.getMessage());
		}
		return json;
	}

	@RequestMapping("/getCertPic")
	public void getCertPic(HttpServletRequest request, HttpServletResponse response) throws Exception {
		HttpSession session = request.getSession();
		OutputStream os = response.getOutputStream();
		String code = MakeCertPic.getCertPic(100, 35, os);
		session.setAttribute("code", code);
		os.flush();
		os.close();
	}

	@RequestMapping("/exit")
	@ResponseBody
	public ResJSON exit(HttpServletRequest request, HttpServletResponse response) throws Exception {
		HttpSession session = request.getSession();
		session.invalidate();
		ResJSON json = new ResJSON();
		json.setIsSuccess("true");
		return json;
	}

	@RequestMapping("/updateUser")
	@ResponseBody
	public ResJSON updateUser(HttpServletRequest request, HttpServletResponse response) throws Exception {
		User user = (User) request.getSession().getAttribute("user");
		if (user == null) {
			return new ResJSON();
		}
		ResJSON json = new ResJSON();
		try {
			String face = request.getParameter("face");
			String id = request.getParameter("id");
			if (id == null) {
				face = face.replace("[", "").replace("]", "");
				user.setFace(face);
				userService.update(user);
				request.getSession().setAttribute("user", user);
			} else {
				String loginName = request.getParameter("loginName");
				String pwd = request.getParameter("pwd");
				String name = request.getParameter("name");
				String sex = request.getParameter("sex");
				User u = userService.queryById(id);
				u.setLoginName(loginName);
				u.setName(name);
				u.setPwd(pwd);
				u.setSex(sex);
				if (!loginName.matches("^[A-Za-z0-9\\-\\_]{3,20}$")) {
					throw new SysException("登录名只能包含3~20个英文、数字、减号、下划线");
				}
				if (!name.matches("^[A-Za-z0-9\u4E00-\u9fa5\\-\\_]{2,20}$")) {
					throw new SysException("昵称只能包含2~20个中文、英文、数字、减号、下划线");
				}
				if (!pwd.matches("^[A-Za-z0-9\\-\\_]{6,20}$")) {
					throw new SysException("密码只能包含6~20个英文、数字、减号、下划线");
				}
				userService.update(u);
			}
			json.setIsSuccess("true");
		} catch (SysException e) {
			json.setIsSuccess("false");
			json.setErrMsg(e.getMessage());
		}
		return json;
	}
	@RequestMapping("/updateMoneyByExchange")
	@ResponseBody
	public ResJSON updateMoneyByExchange(HttpServletRequest request, HttpServletResponse response) throws Exception {
		User user = (User) request.getSession().getAttribute("user");
		if (user == null) {
			return new ResJSON();
		}
		ResJSON json = new ResJSON();
		try {
				String money = request.getParameter("money");
				String friendId = request.getParameter("friendId");
				User friend = userService.queryById(friendId);
				friend.setMoney(Formatter.toDoubleStr(Double.parseDouble(friend.getMoney()) + Double.parseDouble(money)));
				user.setMoney(Formatter.toDoubleStr(Double.parseDouble(user.getMoney()) - Double.parseDouble(money)));
				userService.update(friend);
				userService.update(user);
				json.setIsSuccess("true");
		} catch (SysException e) {
			json.setIsSuccess("false");
			json.setErrMsg(e.getMessage());
		}
		return json;
	}
	
	@RequestMapping("/updateUserSingle")
	@ResponseBody
	public ResJSON updateUserSingle(HttpServletRequest request, HttpServletResponse response) throws Exception {
		User user = (User) request.getSession().getAttribute("user");
		if (user == null) {
			return new ResJSON();
		}
		ResJSON json = new ResJSON();
		try {
			String pwd = request.getParameter("pwd");
			String name = request.getParameter("name");
			String sex = request.getParameter("sex");
			if(pwd != null) {
				if (!pwd.matches("^[A-Za-z0-9\\-\\_]{6,20}$")) {
					throw new SysException("密码只能包含6~20个英文、数字、减号、下划线");
				}
				user.setPwd(pwd);
			}
			if(name !=null) {
				if (!name.matches("^[A-Za-z0-9\u4E00-\u9fa5\\-\\_]{2,20}$")) {
					throw new SysException("昵称只能包含2~20个中文、英文、数字、减号、下划线");
				}
				user.setName(name);
			}
			if(sex != null) {
				user.setSex(sex);
			}
			userService.update(user);
			json.setIsSuccess("true");
		} catch (SysException e) {
			json.setIsSuccess("false");
			json.setErrMsg(e.getMessage());
		}
		return json;
	}
	
	@RequestMapping("/getActiveUsers")
	@ResponseBody
	public List<User> getActiveUsers(HttpServletRequest request, HttpServletResponse response) throws Exception {
		User user = (User) request.getSession().getAttribute("user");
		if (user == null) {
			return new ArrayList<User>();
		}
		return MySessionListener.getActiveUsers();
	}
}