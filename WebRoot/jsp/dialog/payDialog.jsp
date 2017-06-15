<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>付款</title>
<link rel="stylesheet" href="css/common/common.css" type="text/css"></link>
<link rel="stylesheet" href="css/dialog/payDialog.css" type="text/css"></link>
<script type="text/javascript" src="js/common/jquery-1.8.3.js"></script>
<script type="text/javascript" src="js/common/util.js"></script>
<script type="text/javascript" src="js/dialog/payDialog.js"></script>
</head>

<body>
	<div id="payDialogContainer">
		<div class="line"><span class="payTitle">账户余额：</span><strong id="userMoney" class="moneyNumTxt">￥6666666.66</strong></div>
		<div class="line"><span class="payTitle">应付款：</span><strong id="payMoney" class="moneyNumTxt"></strong></div>
		<div class="line"><span class="payTitle">剩余：</span><strong id="chargeMoney" class="moneyNumTxt">￥33333333.33</strong></div>
		<div id="btnArea">
			<input type="button" value="确认付款" class="payDialogBtn" id="okBtn"/><input type="button" value="取消" class="payDialogBtn" id="cancel"/>
		</div>
	</div>
</body>
</html>
