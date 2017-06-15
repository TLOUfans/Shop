<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">
<title>用户添加</title>
<link rel="stylesheet" href="css/common/common.css" type="text/css"></link>
<link rel="stylesheet" href="css/dialog/addType.css" type="text/css"></link>
<link rel="stylesheet" href="css/common/myddl.css" type="text/css"></link>
<script type="text/javascript" src="js/common/jquery-1.8.3.js"></script>
<script type="text/javascript" src="js/common/util.js"></script>
<script type="text/javascript" src="js/common/myddl.js"></script>
<script type="text/javascript" src="js/dialog/addType.js"></script>
</head>

<body>
	<div id="container" class="addType">
		<div class="inputArea">
			<div class="txtName">类别:</div>
			<div class="nameInput">
				<input type="text" id="name" name="" maxlength="9"
					placeHolder="请输入类别名" validate="cnem_" minLen="2" />
			</div>
			<div class="txtErr"></div>
		</div>
		<div class="inputArea">
			<div class="txtName">编号:</div>
			<div class="nameInput">
				<input type="text" id="no" name="" maxlength="3" placeHolder="请输入编号"
					validate="n" minLen="3" />
			</div>
			<div class="txtErr"></div>
		</div>
		<div class="bottomArea">
			<input type="button" value="添加" id="addBtn" /> <input type="button"
				value="返回" id="backBtn" />
		</div>
	</div>
</body>
</html>
