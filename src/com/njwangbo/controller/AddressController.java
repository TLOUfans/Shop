package com.njwangbo.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.njwangbo.exception.SysException;
import com.njwangbo.pojo.Address;
import com.njwangbo.pojo.ResJSON;
import com.njwangbo.pojo.User;
import com.njwangbo.service.AddressService;

@Controller
public class AddressController {
	@Autowired
	private AddressService addressService;

	@RequestMapping("/addAddress")
	@ResponseBody
	public ResJSON addAddress(HttpServletRequest request, HttpServletResponse resp) {
		// 权限验证
		User user = (User) request.getSession().getAttribute("user");
		if (user == null) {
			return new ResJSON();
		}
		String receiver = request.getParameter("receiver");
		String area = request.getParameter("area");
		String areaDes = request.getParameter("areaDes");
		String tel = request.getParameter("tel");
		String userId = user.getId();
		Address address = new Address(receiver, area, areaDes, tel, userId);
		ResJSON json = new ResJSON();
		try {
			addressService.add(address);
			json.setIsSuccess("true");
		} catch (SysException e) {
			e.printStackTrace();
			json.setErrMsg(e.getMessage());
		}
		return json;
	}
	
	@RequestMapping("/updateAddress")
	@ResponseBody
	public ResJSON updateAddress(HttpServletRequest request, HttpServletResponse resp) {
		// 权限验证
		User user = (User) request.getSession().getAttribute("user");
		if (user == null) {
			return new ResJSON();
		}
		String addressId = request.getParameter("addressId");
		String receiver = request.getParameter("receiver");
		String area = request.getParameter("area");
		String areaDes = request.getParameter("areaDes");
		String tel = request.getParameter("tel");
		String userId = "0";
		Address address = new Address(addressId, receiver, area, areaDes, tel, userId);
		ResJSON json = new ResJSON();
		try {
			addressService.update(address);
			json.setIsSuccess("true");
		} catch (SysException e) {
			e.printStackTrace();
			json.setErrMsg(e.getMessage());
		}
		return json;
	}
}
