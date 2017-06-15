<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
	if(session.getAttribute("user")==null) {
		out.print("<script>location.href='login.jsp'</script>");
	}
%>

<!DOCTYPE html>
<html>
<head>
<base href="<%=basePath%>">

<title>个人中心</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<link rel="stylesheet" href="css/common/common.css" type="text/css"></link>
<link rel="stylesheet" href="css/common/dialog.css" type="text/css"></link>
<link rel="stylesheet" href="css/font-awesome.min.css" type="text/css"></link>
<link rel="stylesheet" href="css/common/xnav.css" type="text/css"></link>
<link rel="stylesheet" href="css/center.css" type="text/css"></link>
<script type="text/javascript" src="js/common/jquery-1.8.3.js"></script>
<script type="text/javascript" src="js/common/util.js"></script>
<script type="text/javascript" src="js/common/dialog.js"></script>
<script type="text/javascript" src="js/common/xnav.js"></script>
<script type="text/javascript" src="js/center.js"></script>
</head>

<body>
	<%@ include file="common/xnav.jsp" %>
	<div id="center">
		<div id="centerContainer">
			<div id="topArea">
				<div id="userBg">
					<img src="img/bg02.png" alt="" />
				</div>
				<div id="whiteBg">
					<div id="userFace">
						<img src="img/${user.face }" alt="" />
						<div id="mask" class="hidden">修改头像</div>
					</div>
					<div id="editBtnArea">
						<input type="button" value="编辑个人资料" id="editBtn" />
					</div>
				</div>
			</div>
		</div>
		<div id="leftNav">
			<div class="funcArea">
				<div class="underLine"></div>
				<div class="funcTitle">购物系统</div>
				<div class="funcList hidden">
					<div class="funcItem">商城首页</div>
					<div class="funcItem">购物车</div>
					<div class="funcItem">我的订单</div>
					<div class="funcItem">地址管理</div>
				</div>
			</div><div class="funcArea">
				<div class="funcTitle">聊天系统</div>
				<div class="funcList hidden">
					<div class="funcItem">我的好友</div>
					<div class="funcItem">公共聊天室</div>
					<div class="funcItem">添加好友</div>
				</div>
			</div><div class="funcArea">
				<div class="funcTitle">网盘系统</div>
			</div><div class="funcArea">
				<div class="funcTitle">销量图表</div>
			</div>
		</div>
		<div id="userInfo">
			<div class="line">
				<label for="" class="txtTitle">登录名</label>
				<span class="txtContent">${user.loginName }</span>
			</div>
			<div class="line">
				<label for="" class="txtTitle">昵称</label>
				<span class="txtContent">${user.name }</span>
				<button class="modifyBtn"><i class="fa fa-pencil" aria-hidden="true"></i> 修改</button>
				<div class="inputArea hidden">
					<input type="text" name="name" id="" value="${user.name }" class="txtInput"/>
				</div>
				<div class="modifyArea hidden">
					<input type="button" value="保存" class="saveBtn"/><input type="button" value="取消" class="cancelBtn" />
				</div>
			</div>
			<div class="line">
				<label for="" class="txtTitle">性别</label>
				<span class="txtContent">${user.sex }</span>
				<button class="modifyBtn"><i class="fa fa-pencil" aria-hidden="true"></i> 修改</button>
				<div class="inputArea hidden">
					<label>
						<c:if test="${user.sex=='男' }"><input type="radio" name="sex" id="sex1" value="男" class="txtInput" checked="checked"/></c:if>
						<c:if test="${user.sex!='男' }"><input type="radio" name="sex" id="sex1" value="男" class="txtInput"/></c:if>
						&nbsp;男&nbsp;&nbsp;
					</label>
					<label>
						<c:if test="${user.sex=='女' }"><input type="radio" name="sex" id="sex2" value="女" class="txtInput" checked="checked"/></c:if>
						<c:if test="${user.sex!='女' }"><input type="radio" name="sex" id="sex1" value="女" class="txtInput"/></c:if>
						&nbsp;女
					</label>
				</div>
				<div class="modifyArea hidden">
					<input type="button" value="保存" class="saveBtn" /><input type="button" value="取消" class="cancelBtn" />
				</div>
			</div>
			<div class="line">
				<label for="" class="txtTitle">密码</label>
					<span class="txtContent">${user.pwd }</span>
				<button class="modifyBtn"><i class="fa fa-pencil" aria-hidden="true"></i> 修改</button>
				<div class="inputArea hidden">
					<input type="password" name="pwd" id="" class="txtInput" value="${user.pwd }"/>
				</div>
				<div class="modifyArea hidden">
					<input type="button" value="保存" class="saveBtn" /><input type="button" value="取消" class="cancelBtn" />
				</div>
			</div>
			<div class="line">
				<label for="" class="txtTitle">账户余额</label>
				<span class="txtContent">￥${user.money }</span>
			</div>
			<div class="line">
				<label for="" class="txtTitle">收货地址</label>
				<div class="addressArea">
				<c:if test="${fn:length(user.addresses) == 0 }">还未添加收货地址</c:if>
				<c:if test="${fn:length(user.addresses) != 0 }">
					<c:forEach items="${user.addresses }" var="address">
						<span class="txtContent">${address.area }${address.areaDes } ${address.receiver } ${address.tel }</span>
					</c:forEach>
				</c:if>
				</div>
			</div>
			<div class="line">
				<label for="" class="txtTitle">角色</label>
				<span class="txtContent"><c:if test="${user.tag==0 }">普通用户</c:if><c:if test="${user.tag==1 }">管理员</c:if><c:if test="${user.tag==2 }">商家</c:if></span>
			</div>
			<div class="line">
				<label for="" class="txtTitle">创建时间</label>
				<span class="txtContent">${user.createTime }</span>
			</div>
		</div>
		<div id="rightArea">
			<iframe src="" frameborder="0" id="chatIframe" class="hidden" name="chatIframe"></iframe>
		</div>
		<form id="userFaceForm" class="hidden" action="upload.action" method="post" enctype="multipart/form-data" target="userFaceIframe">
			<input type="file" name="userFace" id="faceFile" class="hidden"/>
		</form>
		<iframe src="" frameborder="0" class="hidden" id="userFaceIframe" name="userFaceIframe"></iframe>
	</div>
	<div id="xDialog"></div>
	<ul id="bgImg">
		<li class="bgImgLi"></li>
	</ul>
</body>
</html>
