<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../common/private.jsp"%>
<%
	User user = (User)obj;
 %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>用户头像</title>
<link rel="stylesheet" href="css/common/common.css" type="text/css"></link>
<link rel="stylesheet" href="css/dialog/userFace.css" type="text/css"></link>
<script type="text/javascript" src="js/common/jquery-1.8.3.js"></script>
<script type="text/javascript" src="js/dialog/userFace.js"></script>
</head>

<body>
	<div id="userFaceUpload">
		<div id="imgCon">
			<img src="img/${user.face }" alt="" />
		</div>
		<form id="userFaceForm" class="hidden" action="upload.action" method="post" enctype="multipart/form-data" target="userFaceIframe">
			<input type="file" name="userFace" id="userFace" class="hidden"/>
		</form>
		<iframe src="" frameborder="0" class="hidden" id="userFaceIframe" name="userFaceIframe"></iframe>
		<input type="button" value="上传头像" id="faceBtn" class="unClick"/>
	</div>
</body>
</html>
