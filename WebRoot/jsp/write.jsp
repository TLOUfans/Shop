<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>写文章</title>
<link rel="stylesheet" href="css/common/common.css" type="text/css"></link>
<link rel="stylesheet" href="css/common/bootstrap.min.css" type="text/css"></link>
<link rel="stylesheet" href="css/font-awesome.min.css" type="text/css"></link>
<link rel="stylesheet" href="lib/css/write.css" type="text/css"></link>
<script type="text/javascript" data-main="lib/js/app.js" src="lib/js/require.js"></script>
</head>

<body>
	<div id="writeContainer">
		
		<div id="editContent">
			<div id="editTitle">未命名标题</div>
			<ul id="toolBar">
				<li><i class="fa fa-bold"></i></li>
				<li><i class="fa fa-italic"></i></li>
				<li><i class="fa fa-underline"></i></li>
				<li><i class="fa fa-strikethrough"></i></li>
				<li><i class="fa fa-photo"></i></li>
			</ul>
			<div id="editText" contenteditable="true"></div>
		</div>
	</div>
</body>
</html>
