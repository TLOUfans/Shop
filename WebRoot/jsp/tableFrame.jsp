<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="common/private.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">
<title>商城管理系统</title>
<link rel="stylesheet" href="css/common/common.css" type="text/css"></link>
<link rel="stylesheet" href="css/tableFrame.css" type="text/css"></link>
<link rel="stylesheet" href="css/common/dialog.css" type="text/css"></link>
<script type="text/javascript" src="js/common/jquery-1.8.3.js"></script>
<script type="text/javascript" src="js/common/util.js"></script>
<script type="text/javascript" src="js/common/dialog.js"></script>
<script type="text/javascript" src="js/tableFrame.js"></script>
<script type="text/javascript" src="js/common/dialog.js"></script>
<script type="text/javascript" src="js/common/tableModel.js"></script>
</head>
<body>
	<table id="main" cellpadding="0" cellspacing="0">
		<tr>
			<td id="nav" colspan="2">
				<div><a href="jsp/typeList.jsp" style="color:#fff;">商城管理系统</a></div>
				<div id="userInfo">
					欢迎&nbsp;<span id="userName">${user.name }</span>&nbsp;登录
				</div>
				<div id="userDes" class="hidden">
					<div id="userFaceArea">
						<img src="img/${user.face }" alt="头像" />
					</div>
					<div id="vipArea">
						<div id="vipIcon">PLUS</div>
						<div id="vipDes">购买PLUS会员尊享顶级特权</div>
					</div>
				</div>
				<div id="exitBtn">退出</div>
			</td>
		</tr>
		<tr>
			<td id="leftMenu">
				<div id="menuContainer"></div></td>
			<td><iframe src="" frameborder="0" id="mainFrame"></iframe></td>
		</tr>
	</table>
</body>
</html>
