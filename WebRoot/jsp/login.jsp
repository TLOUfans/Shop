<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE HTML>
<html>
<head>
<base href="<%=basePath%>">
<title>登录</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<link rel="stylesheet" href="css/common/common.css" type="text/css"></link>
<link rel="stylesheet" href="css/login.css" type="text/css"></link>
<script type="text/javascript" src="js/common/jquery-1.8.3.js"></script>
<script type="text/javascript" src="js/common/util.js"></script>
<script type="text/javascript" src="js/login.js"></script>
</head>
<body>
	<div id="loginPanel">
		<div id="loginTitle">登录</div>
		<div id="subTitle">欢迎使用商品管理系统</div>
		<div class="line">
			<input id="txtName" type="text" placeholder="用户名" maxlength="20"
				autocomplete="off" />
			<div class="placeholder">用户名</div>
			<div class="errTips"></div>
		</div>
		<div class="line">
			<input id="txtPassword" type="password" placeholder="密码"
				maxlength="20" />
			<div class="placeholder">密码</div>
			<div class="errTips"></div>
		</div>
		<div id="txtCodeLine">
			<input id="txtCode" type="text" placeholder="验证码" maxlength="4" />
			<div class="placeholder">验证码</div>
			<div id="errTipsCode" class="errTips"></div>
		</div>
		<img id="pic" src="" basePath="<%=basePath%>getCertPic.action"
			title="点击刷新" alt="验证码" /> <label id="lblRM"> <input
			id="chkRM" type="checkbox" /> <span>记住我</span> </label> <a
			href="jsp/regist.jsp">注册账户</a> <input id="btnLogin" type="button"
			value="登录"></input>
	</div>
	<div id="particles-js"></div>
</body>
</html>
