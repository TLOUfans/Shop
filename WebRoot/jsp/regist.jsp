<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">
<title>注册</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<link rel="stylesheet" href="css/common/common.css" type="text/css"></link>
<link rel="stylesheet" href="css/regist.css" type="text/css"></link>
<script type="text/javascript" src="js/common/jquery-1.8.3.js"></script>
<script type="text/javascript" src="js/common/util.js"></script>
<script type="text/javascript" src="js/regist.js"></script>
</head>
<body>
	<div id="registPanel">
		<div id="registTitle">创建账户</div>
		<div id="registDes">用户名是网站的唯一标示，自己保管好账户。</div>
		<div class="line">
			<label for="txtLoginName">登陆名</label>
			<input id="txtLoginName" type="text" placeholder="由3~20个英文、数字、减号、下划线组成" minlength="3" maxlength="20" validate="enm_" />
			<div class="placeholder">由3~20个英文、数字、减号、下划线组成</div>
			<div class="errTips"></div>
		</div>
		<div class="line">
			<label for="txtName">昵称</label>
			<input id="txtName" type="text" placeholder="由3~20个中文、英文、数字、减号、下划线组成" minlength="2" maxlength="20" validate="cenm_" />
			<div class="placeholder">由3~20个中文、英文、数字、减号、下划线组成</div>
			<div class="errTips"></div>
		</div>
		<div class="line sexLine">
			<label>性别</label>
			<label>
				<input type="radio" name="sex" id="sex1" value="男" checked="checked"/>男&nbsp;
			</label>
			<label>
				<input type="radio" name="sex" id="sex2" value="女"/>女&nbsp;
			</label>
		</div>
		<div class="line">
			<label for="txtPwd">密码</label>
			<input id="txtPwd" type="password" placeholder="由6~20个英文、数字、减号、下划线组成" minlength="6" maxlength="20" validate="enm_" />
			<div class="placeholder">由6~20个英文、数字、减号、下划线组成</div>
			<div class="errTips"></div>
		</div>
		<div class="line">
			<label for="txtConfirm">确认密码</label>
			<input id="txtConfirm" type="password" placeholder="由6~20个英文、数字、减号、下划线组成" minlength="6" maxlength="20" validate="enm_" />
			<div class="placeholder">由6~20个英文、数字、减号、下划线组成</div>
			<div class="errTips"></div>
		</div>
		<div id="btnBar">
			<input id="btnRegist" type="button" value="注册" />
			<a href="jsp/login.jsp">返回</a>
		</div>
	</div>
</body>
</html>
