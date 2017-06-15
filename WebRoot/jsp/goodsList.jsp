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

<title>商品列表</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<link rel="stylesheet" href="css/common/common.css" type="text/css"></link>
<link rel="stylesheet" href="css/common/xnav.css" type="text/css"></link>
<link rel="stylesheet" href="css/common/bottom.css" type="text/css"></link>
<link rel="stylesheet" href="css/common/myddl.css" type="text/css"></link>
<link rel="stylesheet" href="css/common/dialog.css" type="text/css"></link>
<link rel="stylesheet" href="css/common/goodsList.css" type="text/css"></link>
<script type="text/javascript" src="js/common/jquery-1.8.3.js"></script>
<script type="text/javascript" src="js/common/util.js"></script>
<script type="text/javascript" src="js/common/xnav.js"></script>
<script type="text/javascript" src="js/common/myddl.js"></script>
<script type="text/javascript" src="js/common/dialog.js"></script>
<script type="text/javascript" src="js/common/goodsList.js"></script>
<script type="text/javascript">
	$(function() {
		var con = "";
		if (location.search.split("=")[0] == "?typeId") {
			var typeId = location.search.split("=")[1];
			if (typeId == null || typeId == "") {
				location.href = "jsp/typeList.jsp";
			}
			con = " WHERE T.ID = '" + typeId + "' AND 1=1";
		}
		if (location.search.split("=")[0] == "?goodsName") {
			var goodsName = location.search.split("=")[1];
			if (goodsName == null || goodsName == "") {
				location.href = "jsp/typeList.jsp";
			}
			con = " WHERE G.NAME LIKE '%" + unescape(goodsName) + "%' AND 1=1";
		}
		if (location.search == "") {
			location.href = "jsp/typeList.jsp";
		}
		goodsList.init({
			renderTo : "#mylist",
			dataSource : "queryAllGoods.action",
			ajaxData : {
				condition : con
			}
		});
	});
</script>
</head>

<body>
	<%@ include file="common/xnav.jsp"%>
	<div id="goodsListTitle">商品列表&nbsp;&gt;</div>
	<div id="mylist"></div>
	<%@ include file="common/bottom.jsp"%>
</body>
</html>
