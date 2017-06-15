<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
	Object obj = session.getAttribute("user");
	if(obj == null) {
		out.print("<script>location.href='typeList.jsp'</script>");
	}
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">
<title>好友列表</title>
<link rel="stylesheet" href="css/common/common.css" type="text/css"></link>
<link rel="stylesheet" href="css/font-awesome.min.css" type="text/css"></link>
<link rel="stylesheet" href="css/myFriends.css" type="text/css"></link>
<script type="text/javascript" src="js/common/jquery-1.8.3.js"></script>
<script type="text/javascript" src="js/common/util.js"></script>
<script type="text/javascript" src="js/myFriends.js"></script>
</head>
<body>
	<div class="Container" uid="${user.id}">
		<div class="title" tag= '0'>
			<div class="title_text">我的好友</div>
			<i class="fa fa-plus fa-x"></i>
			<i class="fa fa-minus fa-x"></i>
		</div>
		<div class="resultContainer">
		</div>
		<div class="title" tag= '1'>
			<div class="title_text">我的同学</div>
			<i class="fa fa-plus fa-x"></i>
			<i class="fa fa-minus fa-x"></i>
		</div>
		<div class="resultContainer heightEq0">
		</div>
		<div class="title" tag= '2'>
			<div class="title_text">我的亲友</div>
			<i class="fa fa-plus fa-x"></i>
			<i class="fa fa-minus fa-x"></i>
		</div>
		<div class="resultContainer heightEq0">
		</div>
		<div class="title" tag= '3'>
			<div class="title_text">泛泛之交</div>
			<i class="fa fa-plus fa-x"></i>
			<i class="fa fa-minus fa-x"></i>
		</div>
		<div class="resultContainer heightEq0">
		</div>
	</div>
</body>
</html>
