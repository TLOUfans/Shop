package com.njwangbo.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.njwangbo.exception.SysException;
import com.njwangbo.pojo.Cart;
import com.njwangbo.pojo.CartCondition;
import com.njwangbo.pojo.Goods;
import com.njwangbo.pojo.GridJSON;
import com.njwangbo.pojo.ResJSON;
import com.njwangbo.pojo.User;
import com.njwangbo.service.CartService;

@Controller
public class CartController {
	@Autowired
	private CartService cartService;

	@RequestMapping("/queryCartByUserId")
	@ResponseBody
	public GridJSON queryCartByUserId(HttpServletRequest request, HttpServletResponse response) {
		// 前台ajax发送过来的参数
		User user = (User) request.getSession().getAttribute("user");
		if (user == null) {
			return null;
		}
		// 前台ajax发送过来的参数
		CartCondition conditions = new CartCondition();
		String condition = request.getParameter("condition");
		String pageNumStr = request.getParameter("pageNum");
		String pageSizeStr = request.getParameter("pageSize");
		// 表格查询条件
		conditions.setCondition(condition);
		conditions.setPageNum(pageNumStr);
		conditions.setPageSize(pageSizeStr);
		conditions.setUserId(user.getId());
		GridJSON json = new GridJSON();
		try {
			List<Cart> rows = cartService.queryByUserId(conditions);
			int total = cartService.queryCountByUserId(conditions);
			json.setRows(rows);
			json.setTotal(total);
		} catch (SysException e) {
			e.printStackTrace();
		}
		return json;
	}

	@RequestMapping("/queryCartByPage")
	@ResponseBody
	public GridJSON queryCartByPage(HttpServletRequest request, HttpServletResponse response) {
		// 前台ajax发送过来的参数
		CartCondition conditions = new CartCondition();
		String condition = request.getParameter("condition");
		String pageNumStr = request.getParameter("pageNum");
		String pageSizeStr = request.getParameter("pageSize");
		// 表格查询条件
		conditions.setCondition(condition);
		conditions.setPageNum(pageNumStr);
		conditions.setPageSize(pageSizeStr);
		GridJSON json = new GridJSON();
		try {
			List<Cart> rows = cartService.queryByPage(conditions);
			int total = cartService.queryCountByPage(conditions);
			json.setRows(rows);
			json.setTotal(total);
		} catch (SysException e) {
			e.printStackTrace();
		}
		return json;
	}

	@RequestMapping("/deleteCart")
	@ResponseBody
	public ResJSON deleteCart(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String id = request.getParameter("id");
		ResJSON json = new ResJSON();
		try {
			cartService.delete(id);
			json.setIsSuccess("true");
		} catch (Exception e) {
			json.setIsSuccess("false");
			json.setErrMsg(e.getMessage());
		}
		return json;
	}

	@RequestMapping("/addCart")
	@ResponseBody
	public ResJSON addCart(HttpServletRequest request, HttpServletResponse resp) {
		// 权限验证
		User user = (User) request.getSession().getAttribute("user");
		if (user == null) {
			return new ResJSON();
		}
		String goodsNum = request.getParameter("goodsNum");
		String goodsId = request.getParameter("goodsId");
		CartCondition conditions = new CartCondition();
		conditions.setPageSize("10");
		conditions.setPageNum("1");
		conditions.setUserId(user.getId());
		conditions.setGoodsId(goodsId);
		Cart resCart = null;
		try {
			resCart = cartService.queryByGoodsId(conditions);
		} catch (SysException e1) {
			e1.printStackTrace();
		}
		ResJSON json = new ResJSON();
		if (resCart != null) {
			json = updateCart(request, resp);
		} else {
			Goods goods = new Goods();
			goods.setId(goodsId);
			Cart cart = new Cart(user, goods, goodsNum);
			try {
				cartService.add(cart);
				json.setIsSuccess("true");
			} catch (SysException e) {
				json.setIsSuccess("false");
				json.setErrMsg(e.getMessage());
			}
		}
		return json;
	}

	@RequestMapping("/updateCart")
	@ResponseBody
	public ResJSON updateCart(HttpServletRequest request, HttpServletResponse resp) {
		// 权限验证
		User user = (User) request.getSession().getAttribute("user");
		if (user == null) {
			return new ResJSON();
		}
		String goodsNum = request.getParameter("goodsNum");
		String goodsId = request.getParameter("goodsId");
		String checked = request.getParameter("checked");
		Goods goods = new Goods();
		goods.setId(goodsId);
		CartCondition conditions = new CartCondition();
		conditions.setPageSize("10");
		conditions.setPageNum("1");
		conditions.setUserId(user.getId());
		conditions.setGoodsId(goodsId);
		ResJSON json = new ResJSON();
		try {
			Cart resCart = cartService.queryByGoodsId(conditions);
			Cart cart = new Cart(resCart.getId(), user, goods, Integer.parseInt(goodsNum) + Integer.parseInt(resCart.getGoodsNum()) + "", checked);
			cartService.update(cart);
			json.setIsSuccess("true");
		} catch (SysException e) {
			json.setIsSuccess("false");
			json.setErrMsg(e.getMessage());
		}
		return json;
	}

	@RequestMapping("/updateCartGoodsNum")
	@ResponseBody
	public ResJSON updateCartGoodsNum(HttpServletRequest request, HttpServletResponse resp) {
		// 权限验证
		User user = (User) request.getSession().getAttribute("user");
		if (user == null) {
			return new ResJSON();
		}
		String goodsNum = request.getParameter("goodsNum");
		String goodsId = request.getParameter("goodsId");
		String checked = request.getParameter("checked");
		Goods goods = new Goods();
		goods.setId(goodsId);
		CartCondition conditions = new CartCondition();
		conditions.setPageSize("10");
		conditions.setPageNum("1");
		conditions.setUserId(user.getId());
		conditions.setGoodsId(goodsId);
		ResJSON json = new ResJSON();
		try {
			Cart resCart = cartService.queryByGoodsId(conditions);
			Cart cart = new Cart(resCart.getId(), user, goods, Integer.parseInt(goodsNum) + "", checked);
			cartService.update(cart);
			json.setIsSuccess("true");
		} catch (SysException e) {
			json.setIsSuccess("false");
			json.setErrMsg(e.getMessage());
		}
		return json;
	}
}
