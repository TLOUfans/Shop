<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="common/public.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>订单页面</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<link rel="stylesheet" href="css/common/common.css" type="text/css"></link>
<link rel="stylesheet" href="css/font-awesome.min.css" type="text/css"></link>
<link rel="stylesheet" href="css/common/xnav.css" type="text/css"></link>
<link rel="stylesheet" href="css/common/bottom.css" type="text/css"></link>
<link rel="stylesheet" href="css/dialog/delCartDialog.css" type="text/css"></link>
<link rel="stylesheet" href="css/common/myddl.css" type="text/css"></link>
<link rel="stylesheet" href="css/order.css" type="text/css"></link>
<script type="text/javascript" src="js/common/jquery-1.8.3.js"></script>
<script type="text/javascript" src="js/common/util.js"></script>
<script type="text/javascript" src="js/common/xnav.js"></script>
<script type="text/javascript" src="js/common/dialog.js"></script>
<script type="text/javascript" src="js/common/myddl.js"></script>
<script type="text/javascript" src="js/order.js"></script>
</head>

<body>
	<%@ include file="common/xnav.jsp"%>
	<div id="orderContainer">
		<div id='orderTitle'>订单详情&nbsp;&gt;</div>
		<div id='orderStatus'>
			<span class='orderStatusTitle selectTitle' tag="0">全部订单</span>
			<span class='orderStatusTitle' tag="1">待付款</span>
			<span class='orderStatusTitle' tag="2">待收货</span>
			<span class='orderStatusTitle' tag="3">待评价</span>
			<span class='orderStatusTitle' tag="4">已完成</span>
		</div>
		<div id='orderContent'></div>
	</div>
	<%@ include file="common/bottom.jsp"%>
</body>
</html>
