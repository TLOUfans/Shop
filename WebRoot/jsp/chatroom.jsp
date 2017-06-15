<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ include file="common/public.jsp"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>聊天室</title>
<link rel="stylesheet" href="css/common/common.css" type="text/css"></link>
<link rel="stylesheet" href="css/font-awesome.min.css" type="text/css"></link>
<link rel="stylesheet" href="css/common/colpick.css" type="text/css"></link>
<link rel="stylesheet" href="css/chatroom.css" type="text/css"></link>
<script type="text/javascript" src="js/common/jquery-1.8.3.js"></script>
<script type="text/javascript" src="js/common/colpick.js"></script>
<script type="text/javascript" src="js/common/jquery.qqFace.js"></script>
<script type="text/javascript" src="js/chatroom.js"></script>
</head>

<body>
	<div id="chatroom">
		<div id="logoContainer" userid="${user.id }">
			<span id="logoTxt"><i class="fa fa-twitter fa-2x"></i></span>
			<img alt="" src="img/${user.face}" width="30" height="30">
			<span id="logoUsername">${user.name}宝宝</span>
		</div>
		<div id="chatContainer">
			<div id="userList">
				<div id="userListTitle">在线用户：<span></span></div>
				<div class="userItem">公共聊天</div>
			</div>
			<div id="messageContainer">
				<div id="messageList"></div>
				<div class="tool">
				<div class="tContainer">
					<div class="toolBold"></div>
				</div>
				<div class="tContainer">
					<div class="toolColor"></div>
				</div>
				<div class="tContainer">
				<div class="controlEmotion"></div>
				<div class="toolEmotion"></div>
				</div>
				<div class="tContainer">
					<div class="toolImage"></div>
				</div>
				</div>
				<div id="sendMessage">
					<textarea id="messageTxt"></textarea>
				</div>
					<div id="sendBtnArea">
						<label>
							<input type="checkbox" id="autoScollBtn" checked="checked"/>自动滚动开关
						</label>
						<div id="sendBtnDiv">
							<span id="tips">按下Ctrl+Enter</span>
							<input type="button" value="发送" id="sendBtn" />
						</div>
					</div>
			</div>
			<div id="rightSide"></div>
		</div>
	</div>
</body>
</html>
