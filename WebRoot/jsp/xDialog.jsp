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
<link rel="stylesheet" href="css/common/dialog.css" type="text/css"></link>
<script type="text/javascript" src="js/common/jquery-1.8.3.js"></script>
<script type="text/javascript" src="js/common/util.js"></script>
<script type="text/javascript" src="js/common/dialog.js"></script>
<script type="text/javascript">
	function testBtn_click() {
		var d = new XDialog({
			renderTo : "#xDialog"
		});
		top.d = d;
		d.show({
			title : "测试弹出层",
			url : "jsp/iframe.jsp",
			width: "90%",
			height : 600
		});
	}
</script>
<title>XDialog</title>
</head>

<body>
	<div id="xDialog"></div>
	<input type="button" value="点我" onclick="testBtn_click()" />
</body>
</html>
