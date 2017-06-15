<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<div class="shopNav">
	<div class="shopNavContent">
		<span class="navDes">汪，欢迎来到京西</span>
		<c:if test="${user != null}">
			<div class="navLogin" tag="${user.tag}" userId="${user.id }" userMoney="${user.money }">${user.name }
				<div id="userDes" class="hidden">
					<div id="userFaceArea">
						<img src="img/${user.face }" alt="头像" />
					</div>
					<div id="vipArea">
						<div id="vipIcon"><a href="jsp/center.jsp">个人中心</a></div>
						<span id="exitBtn">退出</span>
						<div id="vipDes"></div>
					</div>
				</div>
			</div>
		</c:if>
		<c:if test="${user == null}">
			<a href="jsp/login.jsp" class="navLogin">请登录</a>
			<a href="jsp/regist.jsp" class="navRegist">免费注册</a>
		</c:if>
		<a href="jsp/cart.jsp"><span class="navCart"></span></a>
		<c:if test="${user != null}">
			<a href="jsp/order.jsp" class="myOrder">我的订单</a>
		</c:if>
	</div>
</div>
<div class="searchBoxArea">
	<div class="logo">
		<a href="jsp/typeList.jsp"><img src="img/logo.png" alt="" /> </a>
	</div>
	<div class="searchBox">
		<div class="searchInputArea">
			<input type="text" name="" id="searchInput" placeholder="请输入商品名"/>
			<div id="placeholder" class="hidden">请输入商品名</div>
		</div>
		<div class="searchBtnArea">
			<input type="button" value="搜 索" id="searchBtn"/>
		</div>
	</div>
</div>
<div class="centerNav">
	<div class="navContent">
		<span class="centerNavTitle goodsType">商品分类</span><span
			class="centerNavTitle">京西超市</span> <span class="centerNavTitle">京西国际</span>
		<span class="centerNavTitle">京西会员</span> <span class="centerNavTitle">品牌街</span>
		<span class="centerNavTitle">电器城</span> <span class="centerNavTitle">汪鲜生</span>
		<span class="centerNavTitle">医药馆</span> <span class="centerNavTitle">营业厅</span>
		<span class="centerNavTitle">魅力惠</span> <span class="centerNavTitle">上天旅行</span>
		<span class="centerNavTitle">京西易购</span>
	</div>
</div>
<div id="topBtn" class="clarity">Top</div>

