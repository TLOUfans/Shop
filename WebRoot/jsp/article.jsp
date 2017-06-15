<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>文章区</title>
<link rel="stylesheet" href="css/common/common.css" type="text/css"></link>
<link rel="stylesheet" href="css/common/bootstrap.min.css" type="text/css"></link>
<link rel="stylesheet" href="css/font-awesome.min.css" type="text/css"></link>
<link rel="stylesheet" href="lib/css/article.css" type="text/css"></link>
<script data-main="lib/js/app.js" src="lib/js/require.js"></script>
</head>

<body>
	<div id="articleContainer"></div>
</body>
</html>
