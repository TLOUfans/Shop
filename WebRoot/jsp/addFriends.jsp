<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
	Object obj = session.getAttribute("user");
	if(obj == null) {
		out.print("<script>location.href='typeList.jsp'</script>");
	}
%>

<!DOCTYPE HTML>
<html>
<head>
<base href="<%=basePath%>">
<link rel="stylesheet" href="css/common/common.css" type="text/css"></link>
<link rel="stylesheet" href="css/common/myddl.css" type="text/css"></link>
<link rel="stylesheet" href="css/font-awesome.min.css" type="text/css"></link>
<link rel="stylesheet" href="css/addFriends.css" type="text/css"></link>
<script type="text/javascript" src="js/common/jquery-1.8.3.js"></script>
<script type="text/javascript" src="js/common/util.js"></script>
<script type="text/javascript" src="js/common/myddl.js"></script>
<script type="text/javascript" src="js/addFriends.js"></script>
<title>添加好友</title>
</head>
<body>
	<div class="Container" uid="${user.id}">
		<div class="title">
			<div class="title_text">好友查找条件</div>
		</div>
		<div class="find_area">
			<table cellpadding="0" cellspacing="0">
				<tr class="line">
					<td class="condition_cell">
						<div class="input_text" id="input_name">用户名:</div></td>
					<td class="condition_cell_input" colspan="2">
						<div class="input_area">
							<input type="text" name="" id="userName" class="text_control" />
						</div></td>
					<td class="condition_cell">
						<div class="input_text">性别:</div></td>
					<td class="condition_cell_input" colspan="2">
						<div id="select_container">
							<!--封装的下拉菜单插入点-->
						</div></td>
					<td class="condition_cell_input">
						<div class="btnArea">
							<i class="fa fa-search fa-2x" style="cursor: pointer;"></i>
						</div></td>
				</tr>
			</table>
		</div>
		<div class="titleResult">
			<div class="title_text">好友查询结果</div>
		</div>
		<div id="resultContainer"></div>
	</div>
	<div class="groupList hidden">
		<div class="groupTitle">选择分组</div>
		<label class="groupItem"> <input type="radio" name="group"
			class="groupRadio" value="0" />&nbsp;&nbsp;我的好友 </label> <label
			class="groupItem"> <input type="radio" name="group"
			class="groupRadio" value="1" />&nbsp;&nbsp;我的同学 </label> <label
			class="groupItem"> <input type="radio" name="group"
			class="groupRadio" value="2" />&nbsp;&nbsp;我的亲友 </label> <label
			class="groupItem"> <input type="radio" name="group"
			class="groupRadio" value="3" />&nbsp;&nbsp;泛泛之交 </label>
		<div class="Btn">确认</div>
	</div>
</body>
</html>
