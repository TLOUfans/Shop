package com.njwangbo.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.njwangbo.exception.SysException;
import com.njwangbo.pojo.GridCondition;
import com.njwangbo.pojo.GridJSON;
import com.njwangbo.pojo.ResJSON;
import com.njwangbo.pojo.TypeMenu;
import com.njwangbo.pojo.User;
import com.njwangbo.service.TypeMenuService;

@Controller
public class TypeMenuController {
	@Autowired
	private TypeMenuService menuService;

	@RequestMapping("/getTypeMenu")
	@ResponseBody
	public List<TypeMenu> queryAllType(HttpServletRequest request, HttpServletResponse response) throws Exception {
		List<TypeMenu> json = menuService.queryAll();
		return json;
	}

	@RequestMapping("/getTypeMenuByPager")
	@ResponseBody
	public GridJSON queryTypeByPager(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String condition = request.getParameter("condition");
		String pageSize = request.getParameter("pageSize");
		String pageNum = request.getParameter("pageNum");
		GridCondition conditions = new GridCondition(condition, pageSize, pageNum);
		List<TypeMenu> rows = menuService.queryByPager(conditions);
		int total = menuService.queryTotal(conditions);
		GridJSON json = new GridJSON(total, rows);
		return json;
	}
	
	@RequestMapping("/addType")
	@ResponseBody
	public ResJSON addType(HttpServletRequest request, HttpServletResponse response) throws Exception {
		// 权限验证
		User user = (User) request.getSession().getAttribute("user");
		if (user == null) {
			return new ResJSON();
		}
		String name = request.getParameter("name");
		String no = request.getParameter("no");
		ResJSON json = new ResJSON();
		try {
			menuService.add(new TypeMenu(name, no));
			json.setIsSuccess("true");
		} catch (SysException e) {
			json.setIsSuccess("false");
			json.setErrMsg(e.getMessage());
		}
		return json;
	}
	
	@RequestMapping("/deleteType")
	@ResponseBody
	public ResJSON deleteType(HttpServletRequest request, HttpServletResponse response) throws Exception {
		// 权限验证
		User user = (User) request.getSession().getAttribute("user");
		if (user == null) {
			return new ResJSON();
		}
		String id = request.getParameter("id");
		ResJSON json = new ResJSON();
		try {
			menuService.delete(id);
			json.setIsSuccess("true");
		} catch (SysException e) {
			json.setIsSuccess("false");
			json.setErrMsg(e.getMessage());
		}
		return json;
	}
	
	@RequestMapping("/updateType")
	@ResponseBody
	public ResJSON updateType(HttpServletRequest request, HttpServletResponse response) throws Exception {
		// 权限验证
		User user = (User) request.getSession().getAttribute("user");
		if (user == null) {
			return new ResJSON();
		}
		String id = request.getParameter("id");
		String menu = request.getParameter("menu");
		String no = request.getParameter("no");
		TypeMenu typeMenu = new TypeMenu(id, menu, no);
		ResJSON json = new ResJSON();
		try {
			menuService.update(typeMenu);
			json.setIsSuccess("true");
		} catch (SysException e) {
			json.setIsSuccess("false");
			json.setErrMsg(e.getMessage());
		}
		return json;
	}
}
