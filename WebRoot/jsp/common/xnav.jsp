<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div id="xnav">
	<div id="xnavContainer">
		<span class="xnavTxt"><a href="jsp/typeList.jsp">首页</a></span>
		<span class="xnavTxt"><a href="jsp/cart.jsp">购物车</a></span>
		<span class="xnavTxt"><a href="jsp/order.jsp">我的订单</a></span>
		<div id="navInputArea">
			<input type="text" name="" id="navSearchBox" placeholder="请输入商品名"/>
			<input type="button" value="搜索" id="navSearchBtn"/>
		</div>
		<c:if test="${user == null }">
			<div id="btnArea">
				<input type="button" value="登陆" id="xnavBtnLogin"/>
				<input type="button" value="注册" id="xnavBtnReg"/>
			</div>
		</c:if>
		<c:if test="${user != null }">
			<img src="img/${user.face }" alt="" class="navLogin" id="xnavFace" tag="${user.tag}" userId="${user.id }" userMoney="${user.money }"/>
		</c:if>
		<div id="navUserInfo" class="hidden" >
			<div class="navUserInfoItem"><a href="jsp/center.jsp"><i class="fa fa-user-o"></i>个人中心</a></div>
			<div class="navUserInfoItem"><i class="fa fa-power-off"></i>退出</a></div>
		</div>
	</div>
</div>

