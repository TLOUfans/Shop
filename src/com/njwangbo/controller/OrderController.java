package com.njwangbo.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.njwangbo.exception.SysException;
import com.njwangbo.pojo.Address;
import com.njwangbo.pojo.Goods;
import com.njwangbo.pojo.GridCondition;
import com.njwangbo.pojo.GridJSON;
import com.njwangbo.pojo.Order;
import com.njwangbo.pojo.OrderGoods;
import com.njwangbo.pojo.ResJSON;
import com.njwangbo.pojo.User;
import com.njwangbo.service.CartService;
import com.njwangbo.service.GoodsService;
import com.njwangbo.service.OrderGoodsService;
import com.njwangbo.service.OrderService;
import com.njwangbo.service.UserService;
import com.njwangbo.util.Formatter;

@Controller
public class OrderController {
	@Autowired
	private OrderService orderService;
	@Autowired
	private OrderGoodsService orderGoodsService;
	@Autowired
	private CartService cartService;
	@Autowired
	private GoodsService goodsService;
	@Autowired
	private UserService userService;

	@RequestMapping("/addOrder")
	@ResponseBody
	public ResJSON addOrder(HttpServletRequest request, HttpServletResponse resp) {
		// 权限验证
		User user = (User) request.getSession().getAttribute("user");
		if (user == null) {
			return new ResJSON();
		}
		String totalMoney = request.getParameter("totalMoney");
		String payWay = request.getParameter("payWay");
		String goodsId = request.getParameter("goodsId");
		String[] goodsIdArr = goodsId.split(",");
		String goodsNum = request.getParameter("goodsNum");
		String[] goodsNumArr = goodsNum.split(",");
		String cartId = request.getParameter("cartId");
		String[] cartIdArr = cartId.split(",");
		String addressId = request.getParameter("addressId");
		Address address = new Address();
		address.setId(addressId);
		ResJSON json = new ResJSON();
		try {
			// 添加订单
			String orderId = orderService.add(new Order(totalMoney, payWay, user, address));
			for (int i = 0; i < goodsIdArr.length; i++) {
				orderGoodsService.add(new OrderGoods(orderId, goodsIdArr[i], goodsNumArr[i]));
				cartService.delete(cartIdArr[i]);
				// 修改商品库存和销量
				Goods goods = goodsService.queryById(goodsIdArr[i]);
				goods.setNum(goods.getNum() - Integer.parseInt(goodsNumArr[i]));
				goods.setSales(goods.getSales() + Integer.parseInt(goodsNumArr[i]));
				goods.setPrice(goods.getPrice().replaceAll(",", ""));
				goodsService.update(goods);
			}
			json.setIsSuccess("true");
		} catch (SysException e) {
			e.printStackTrace();
			json.setErrMsg(e.getMessage());
		}
		return json;
	}

	@RequestMapping("/deleteOrder")
	@ResponseBody
	public ResJSON deleteOrder(HttpServletRequest request, HttpServletResponse resp) {
		// 权限验证
		User user = (User) request.getSession().getAttribute("user");
		if (user == null) {
			return new ResJSON();
		}
		String id = request.getParameter("id");
		ResJSON json = new ResJSON();
		try {
			orderService.delete(id);
			orderGoodsService.delete(id);
			json.setIsSuccess("true");
		} catch (SysException e) {
			e.printStackTrace();
			json.setErrMsg(e.getMessage());
		}
		return json;
	}

	@RequestMapping("/updateOrder")
	@ResponseBody
	public ResJSON updateOrder(HttpServletRequest request, HttpServletResponse resp) {
		// 权限验证
		User user = (User) request.getSession().getAttribute("user");
		if (user == null) {
			return new ResJSON();
		}
		String id = request.getParameter("id");
		String status = request.getParameter("status");
		String endTime = null;
		ResJSON json = new ResJSON();
		if (status.equals("3")) {
			endTime = "1";
			Order order = new Order(id, endTime, status);
			try {
				orderService.update(order);
				json.setIsSuccess("true");
			} catch (SysException e) {
				e.printStackTrace();
				json.setErrMsg(e.getMessage());
			}
			return json;
		}
		if (status.equals("4")) {
			endTime = "1";
			try {
				Order order = orderService.queryById(id);
				order.setStatus("4");
				orderService.update(order);
				json.setIsSuccess("true");
			} catch (SysException e) {
				e.printStackTrace();
				json.setErrMsg(e.getMessage());
			}
			return json;
		}
		String payMoney = request.getParameter("payMoney");
		String sellerId = request.getParameter("sellerId");
		String[] sellerIdArr = sellerId.split(",");
		String price = request.getParameter("price");
		String[] priceArr = price.split(",");
		Order order = new Order(id, endTime, status);
		try {
			user.setMoney(Formatter.toDoubleStr(Double.parseDouble(user.getMoney()) - Double.parseDouble(payMoney)));
			for (int i = 0; i < sellerIdArr.length; i++) {
				User seller = userService.queryById(sellerIdArr[i]);
				seller.setMoney(Formatter.toDoubleStr(Double.parseDouble(seller.getMoney()) + Double.parseDouble(priceArr[i])));
				userService.update(seller);
			}
			userService.update(user);
			orderService.update(order);
			json.setIsSuccess("true");
		} catch (SysException e) {
			e.printStackTrace();
			json.setErrMsg(e.getMessage());
		}
		return json;
	}

	@RequestMapping("/queryOrderByPage")
	@ResponseBody
	public GridJSON queryOrderByPage(HttpServletRequest request, HttpServletResponse response) {
		// 前台ajax发送过来的参数
		GridCondition conditions = new GridCondition();
		String condition = request.getParameter("condition");
		String pageNumStr = request.getParameter("pageNum");
		String pageSizeStr = request.getParameter("pageSize");
		// 表格查询条件
		conditions.setCondition(condition);
		conditions.setPageNo(pageNumStr);
		conditions.setPageSize(pageSizeStr);
		GridJSON json = new GridJSON();
		try {
			List<Order> rows = orderService.queryByPage(conditions);
			int total = orderService.queryCountByPage(conditions);
			json.setRows(rows);
			json.setTotal(total);
		} catch (SysException e) {
			e.printStackTrace();
		}
		return json;
	}
}
