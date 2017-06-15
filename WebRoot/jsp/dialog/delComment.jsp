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
    <link rel="stylesheet" href="css/dialog/delUser.css" type="text/css"></link>
    <script type="text/javascript" src="js/common/jquery-1.8.3.js"></script>
    <script type="text/javascript" src="js/dialog/delComment.js"></script>
  </head>
  <body>
  	<div id="container" class="delUser">
		<div class="cdaTxt">是否确认删除？</div>
		<div class="tips">此操作不可逆!!!</div>
		<div class="cdaBtnArea ">
			<input type="button" value="确认删除" id="cdaOkBtn" class="delBtn"/>
			<input type="button" value="不想删了" id="cdaBackBtn" class="delBtn"/>
		</div>
  	</div>
  </body>
</html>
