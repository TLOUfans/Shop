<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
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

<title>京西商场</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<link rel="stylesheet" href="css/common/common.css" type="text/css"></link>
<link rel="stylesheet" href="css/font-awesome.min.css" type="text/css"></link>
<link rel="stylesheet" href="css/common/xnav.css" type="text/css"></link>
<link rel="stylesheet" href="css/common/bottom.css" type="text/css"></link>
<link rel="stylesheet" href="css/common/dialog.css" type="text/css"></link>
<link rel="stylesheet" href="css/common/typeList.css" type="text/css"></link>
<link rel="stylesheet" href="css/common/carouselFigure.css" type="text/css"></link>
<link rel="stylesheet" href="css/common/goodsList.css" type="text/css"></link>
<link rel="stylesheet" href="css/common/myddl.css" type="text/css"></link>
<script type="text/javascript" src="js/common/jquery-1.8.3.js"></script>
<script type="text/javascript" src="js/common/util.js"></script>
<script type="text/javascript" src="js/common/xnav.js"></script>
<script type="text/javascript" src="js/common/dialog.js"></script>
<script type="text/javascript" src="js/common/carouselFigure.js"></script>
<script type="text/javascript" src="js/common/typeList.js"></script>
<script type="text/javascript" src="js/common/goodsList.js"></script>
<script type="text/javascript" src="js/common/myddl.js"></script>
<script type="text/javascript" src="lib/rgbaster.js"></script>

<script type="text/javascript">
	$(function() {
		carouselFigure.init({
			renderTo : "rollPic",
			dataSource : "data/imgData.txt",
			onLoad : function() {
				if (!util.isLTIE10()) {
					var img = $(".cfItem>img").get(0);
					RGBaster.colors(img, {
						success : function(payload) {
							$("#typeArea").css("background-color", payload.secondary);
						}
					});
				}
			}
		});
		typeList.init({
			renderTo : "#container",
			dataSource : "getTypeMenu.action"
		});
		goodsList.init({
			renderTo : "#mylist",
			dataSource : "queryAllGoods.action"
		});
	});
</script>
</head>

<body>
	<%@ include file="common/xnav.jsp"%>
	<div id="mianPager">
		<div id="typeArea">
			<div id="rollPic"></div>
			<div class="containerParent">
				<div id="container"></div>
			</div>
		</div>
		<div id="mylist"></div>
		<div id="xDialog"></div>
		<%@ include file="common/bottom.jsp"%>
	</div>
</body>
</html>
