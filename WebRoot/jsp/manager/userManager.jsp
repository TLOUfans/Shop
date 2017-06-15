<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../common/private.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">
<title>用户管理系统</title>

<link rel="stylesheet" href="css/common/common.css" type="text/css"></link>
<link rel="stylesheet" href="css/common/myddl.css" type="text/css"></link>
<link rel="stylesheet" type="text/css" href="css/common/grid.css"></link>
<link rel="stylesheet" href="css/userManager.css" type="text/css"></link>

<script type="text/javascript" src="js/common/jquery-1.8.3.js"></script>
<script type="text/javascript" src="js/common/myddl.js"></script>
<script type="text/javascript" src="js/common/dialog.js"></script>
<script type="text/javascript" src="js/common/grid.js"></script>
<script type="text/javascript" src="js/common/util.js"></script>
<script type="text/javascript" src="js/userManager.js"></script>

</head>
<body>
	<div id="container">
		<div id="title_area">
			<div class="title_text">查询条件</div>
		</div>
		<div id="find_area">
			<table cellpadding="0" cellspacing="0" id="condition_table">
				<tr>
					<td class="condition_cell">
						<div class="input_text" id="input_name">昵称</div>
					</td>
					<td class="condition_cell_input">
						<div class="input_area">
							<input type="text" name="" id="name" class="text_control"/>
						</div>
					</td>
					<td class="condition_cell">
						<div class="input_text">性别</div>
					</td>
					<td class="condition_cell_input">
						<div id="select_container">
							<!--封装的下拉菜单插入点-->

						</div>
					</td>
					<td class="condition_cell">
						<div class="input_text">登录名</div>
					</td>
					<td class="condition_cell_input">
						<div class="input_area">
							<input type="text" name="" id="loginName" class="text_control" />
						</div>
					</td>
				</tr>
			</table>
		</div>
		<div id="list_bar">
			<div id="list_area_title">用户列表</div>
			<input type="button" value="查询" id="btnFind" class="list_btn" /> <input
				type="button" value="添加" id="btnAdd" class="list_btn" /> <input
				type="button" value="编辑" id="btnEdit" class="list_btn unClick" /> <input
				type="button" value="删除" id="btnDel" class="list_btn unClick" />
		</div>
		<div id="gird_container">
			<!--封装的表格插入点-->

		</div>
	</div>
</body>
</html>