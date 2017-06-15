<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    <title>修改用户</title>
  	<link rel="stylesheet" href="css/common/common.css" type="text/css"></link>
  	<link rel="stylesheet" href="css/dialog/editUser.css" type="text/css"></link>
  	<script type="text/javascript" src="js/common/jquery-1.8.3.js"></script>
  	<script type="text/javascript" src="js/common/util.js"></script>
  	<script type="text/javascript" src="js/dialog/editUser.js"></script>
  </head>
  <body>
	<div id="container" class="addUser">
		<div class="inputArea">
			<div class="txtName">用户名:</div>
			<div class="nameInput">
				<input type="text" id="loginName" name="" maxlength="20" validate="cenm_" minLen="4" />
			</div>
			<div class="txtErr"></div>
		</div>
		<div class="inputArea">
			<div class="txtName">密码:</div>
			<div class="nameInput">
				<input type="password" id="password" name="" maxlength="20" validate="enm_" minLen="6" />
			</div>
			<div class="txtErr"></div>
		</div>
		<div class="inputArea">
			<div class="txtName">确认密码:</div>
			<div class="nameInput">
				<input type="password" id="confirPwd" name="" maxlength="20" validate="enm_" minLen="6" />
			</div>
			<div class="txtErr"></div>
		</div>
		<div class="inputArea">
			<div class="txtName">性别:</div>
			<div class="nameInput sexInput">
				<label class="sexArea"> <input type="radio" id="sex1"
					name="sex" value="男" checked="checked" />&nbsp;男 </label> <label
					class="sexArea"> <input type="radio" id="sex2" name="sex"
					value="女" />&nbsp;女 </label>
			</div>
		</div>
		<div class="inputArea">
			<div class="txtName">昵称:</div>
			<div class="nameInput">
				<input type="text" id="txtName" name="" maxlength="20" validate="cenm_" minLen="2" />
			</div>
			<div class="txtErr"></div>
		</div>
		<div class="bottomArea">
			<input type="button" value="保存" id="editBtn" /> <input type="button"
				value="返回" id="backBtn" />
		</div>
	</div>
  </body>
</html>
