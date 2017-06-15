<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>iframe</title>
<link rel="stylesheet" href="css/common/common.css" type="text/css"></link>
<script type="text/javascript" src="js/common/jquery-1.8.3.js"></script>
<script type="text/javascript" src="js/common/dialog.js"></script>
<script type="text/javascript">
	function btn_click(){
		top.d.hide();
	}
</script>
</head>

<body>
	<input type="button" value="点我关闭" onclick="btn_click();"/>
</body>
</html>
