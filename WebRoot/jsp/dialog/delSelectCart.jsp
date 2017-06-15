<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    <title>删除用户</title>
    <link rel="stylesheet" href="css/common/common.css" type="text/css"></link>
    <link rel="stylesheet" href="css/dialog/delCart.css" type="text/css"></link>
    <script type="text/javascript" src="js/common/jquery-1.8.3.js"></script>
    <script type="text/javascript" src="js/dialog/delSelectCart.js"></script>
  </head>
  <body>
  	<div id="container" class="delCart">
		<span class="warningImg"></span>
		<div class="delContainer">
			<div class="cdaTxt">删除商品？</div>
			<div class="tips">你可以选择取消，或删除商品</div>
		</div>
		<div class="cdaBtnArea ">
			<input type="button" value="删除" id="cdaOkBtn" class="delBtn"/>
			<input type="button" value="取消" id="cdaBackBtn" class="delBtn"/>
		</div>
  	</div>
  </body>
</html>
