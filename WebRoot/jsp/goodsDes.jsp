<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
	if (request.getParameter("goodsId") == null) {
		out.print("<script>location.href='typeList.jsp'</script>");
	}
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>商品详情</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<link rel="stylesheet" href="css/common/common.css" type="text/css"></link>
<link rel="stylesheet" href="css/font-awesome.min.css" type="text/css"></link>
<link rel="stylesheet" href="css/common/xnav.css" type="text/css"></link>
<link rel="stylesheet" href="css/common/bottom.css" type="text/css"></link>
<link rel="stylesheet" href="css/common/count.css" type="text/css"></link>
<link rel="stylesheet" href="css/common/myddl.css" type="text/css"></link>
<link rel="stylesheet" href="css/common/typeList.css" type="text/css"></link>
<link rel="stylesheet" href="css/goodsDes.css" type="text/css"></link>
<script type="text/javascript" src="js/common/jquery-1.8.3.js"></script>
<script type="text/javascript" src="js/common/util.js"></script>
<script type="text/javascript" src="js/common/xnav.js"></script>
<script type="text/javascript" src="js/common/count.js"></script>
<script type="text/javascript" src="js/common/myddl.js"></script>
<script type="text/javascript" src="js/common/typeList.js"></script>
<script type="text/javascript" src="js/goodsDes.js"></script>

</head>

<body>
	<%@ include file="common/xnav.jsp"%>
	<div id="typeList" class="hidden"></div>
	<div class="goodsContainer" id="goodsContainer"></div>
	<div class="commentContainer" id="commentDiv"></div>
	<%@ include file="common/bottom.jsp"%>
</body>
</html>
