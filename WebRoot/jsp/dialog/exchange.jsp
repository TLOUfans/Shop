<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">
<link rel="stylesheet" href="css/common/common.css" type="text/css"></link>
<link rel="stylesheet" href="css/font-awesome.min.css" type="text/css"></link>
<link rel="stylesheet" href="css/dialog/exchange.css" type="text/css"></link>
<title>转账对话框</title>
</head>

<body>
	<div class="exContainer">
		<div class="exNav">
			<i class="fa fa-exchange fa-x"></i>
			<span class="exTitle">转账</span>
		</div>
		<div class="exContent">
			<span>转账金额：¥</span>
			<input type="text" class="putMoney"/>
		</div>
		<div class="exBtn">转账</div>
	</div>
</body>
</html>
