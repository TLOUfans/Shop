<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>收货信息</title>
<link rel="stylesheet" href="css/common/common.css" type="text/css"></link>
<link rel="stylesheet" href="lib/css/bootstrap.css" type="text/css"></link>
<link rel="stylesheet" href="lib/css/city-picker.css" type="text/css"></link>
<link rel="stylesheet" href="lib/css/main.css" type="text/css"></link>
<link rel="stylesheet" href="css/dialog/address.css" type="text/css"></link>
<script type="text/javascript" src="lib/js/jquery.js"></script>
<script type="text/javascript" src="js/common/util.js"></script>
<script type="text/javascript" src="lib/js/bootstrap.js"></script>
<script type="text/javascript" src="lib/js/city-picker.data.js"></script>
<script type="text/javascript" src="lib/js/city-picker.js"></script>
<script type="text/javascript" src="lib/js/main.js"></script>
<script type="text/javascript" src="js/dialog/address.js"></script>
</head>

<body>
	<div id="addressContainer">
		<div class="line">
			<span class="lineTxt">收货人:</span><input type="text" class="addressInput" id="receiver" minlen="2" maxlength="4" validate="c" placeholder="2~4个中文"/>
			<div class="errMsg"></div>
		</div>
		<div class="line">
			<span class="lineTxt">收货地区:</span>
			<div id="areaContainer">
				<input id="city-picker3" class="form-control" readonly type="text" value="江苏省/南京市/浦口区" data-toggle="city-picker">
			</div>
		</div>
		<div class="line">
			<span class="lineTxt">详细地址:</span><input type="text" class="addressInput" id="areaDes" minLen="2" maxlength="30" validate="cnpe" placeholder="2~30个中文、英文、数字"/>
			<div class="errMsg"></div>
		</div>
		<div class="line">
			<span class="lineTxt">电话号码:</span><input type="text" class="addressInput" id="tel" maxlength="11" minlen="11" validate="n" placeholder="11位数字"/>
			<div class="errMsg"></div>
		</div>
		<div class="line lastLine">
			<input type="button" value="保存收货人信息" id="saveInfo"/>
		</div>
	</div>
</body>
</html>
