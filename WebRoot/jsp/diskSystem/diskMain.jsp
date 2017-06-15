<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../common/public.jsp"%>

<!DOCTYPE HTML>
<html>
<head>
<base href="<%=basePath%>">

<title>网盘主页</title>
<link rel="stylesheet" href="css/common/common.css" type="text/css"></link>
<link rel="stylesheet" href="css/font-awesome.min.css" type="text/css"></link>
<link rel="stylesheet" href="css/common/myddl.css" type="text/css"></link>
<link rel="stylesheet" href="css/common/jquery-ui.css" type="text/css"></link>
<link rel="stylesheet" href="css/diskSystem/diskMain.css" type="text/css"></link>
<link rel="stylesheet" href="css/diskSystem/font/iconfont.css" type="text/css"></link>
<link rel="stylesheet" href="css/diskSystem/font2/iconfont.css" type="text/css"></link>
<link rel="stylesheet" href="css/common/dialog.css" type="text/css"></link>


<script type="text/javascript" src="js/common/jquery-1.8.3.js"></script>
<script type="text/javascript" src="js/common/util.js"></script>
<script type="text/javascript" src="js/common/jquery-ui.js"></script>
<script type="text/javascript" src="js/common/myddl.js"></script>
<script type="text/javascript" src="js/common/dialog.js"></script>
<script type="text/javascript" src="js/diskSystem/diskMain.js"></script>

<script type="text/javascript">
$(function(){
	var con = "";
	var userId = location.search.split("=")[1];
	if(userId != ""){
		con += " USERID ='"+$("#shopName").attr("userId")+"' AND ";
	}
	con = "WHERE"+con+"1=1";
	filesInfo.init({
		renderTo : "#fileList",
		dataSource: "getFilesByPage.action",
		ajaxData:{
			condition : con
		}
	});
	var user = $("#shopName").attr("userId");
	var setBG = util.cookie.get(user);
	if( setBG != null ){
		var s = setBG.split("-");
		$("#main").css("background-image",s[0]);
		$("#main").css("color",s[1]);
		$("#main").find("#menuBG").css("background-color",s[2]);
	}
});

	
</script>
</head>

<body>
	<table id="main" cellpadding="0" cellspacing="0">
		<tr>
			<td id="nav" colspan="3">
				<i id="logo" class="iconfont icon-duoyun"></i>
				<span id="shopName" userId="${user.id }" loginName="${user.loginName }">京西网盘</span>
				<!--  
				<div id="top">
					<span class="navMenu selected"><i class="fa fa-cloud"
						aria-hidden="true"></i>网盘</span> <span class="navMenu ">分享</span> <span
						class="navMenu">更多</span>

				</div>
				-->
				<div id="user">
					<img src="img/${user.face }"></img> 
					<span id="userName">${user.name}<span id="arrow"><i class="fa fa-angle-down" aria-hidden="true"></i></span></span> 
					
					<div class="userMenu hidden">
						<div id="userArrow"></div>
						<div id="userMsg">
							<img src="img/${user.face }"></img> <span
								id="userName">${user.name}</span>
						</div>
						<div id="userItem">
							<div class="itemList" id="personalData">个人资料</div>
							<div class="itemList" id="btnExit">退出</div>
						</div>
					</div>
				</div>
				<div id="changeBG"><span ><i class="iconfont icon-yifuhuanfu"></i></span></div>
				<div id="memberCenter"><a href="jsp/typeList.jsp">购物中心</a></div>
			</td>
		</tr>
		<tr>
			<td id="leftMenu">
				<div id="menuContent">
					<div class="menuItem " fileType="all">
						<div class="option selted">
							<span class="iSpan"><i class="fa fa-file"
								aria-hidden="true"></i> </span> 全部文件 <span class="hand"><i
								class="fa fa-hand-o-right fa-2" aria-hidden="true"></i>
							</span>
						</div>
					</div>
					<div class="menuItem " fileType=".jpg .png .jpeg .tif .tiff .gif .bmp .dib">
						<div class="option">
							<span class="iSpan"><i class="fa fa-file-image-o"
								aria-hidden="true"></i> </span> 图片 <span class="hand hidden"><i
								class="fa fa-hand-o-right fa-2" aria-hidden="true"></i>
							</span>
						</div>
					</div>
					<div class="menuItem" fileType=".doc .txt .xls .ppt .docm .docx">
						<div class="option">
							<span class="iSpan"><i class="fa fa-file-text"
								aria-hidden="true"></i> </span> 文档 <span class="hand hidden"><i
								class="fa fa-hand-o-right fa-2" aria-hidden="true"></i>
							</span>
						</div>
					</div>
					<div class="menuItem" fileType=".avi .mpg .wmv .mp4 .3gp .swf .mkv .flv .vob">
						<div class="option">
							<span class="iSpan"><i class="fa fa-film"
								aria-hidden="true"></i> </span> 视频 <span class="hand hidden"><i
								class="fa fa-hand-o-right fa-2" aria-hidden="true"></i>
							</span>
						</div>
					</div>
					<div class="menuItem" fileType=".torrent">
						<div class="option">
							<span class="iSpan"><i class="fa fa-arrow-circle-down"
								aria-hidden="true"></i> </span> 种子 <span class="hand hidden"><i
								class="fa fa-hand-o-right fa-2" aria-hidden="true"></i>
							</span>
						</div>
					</div>
					<div class="menuItem" fileType=".wav .mp3 .wma">
						<div class="option">
							<span class="iSpan"><i class="fa fa-music"
								aria-hidden="true"></i> </span> 音乐 <span class="hand hidden"><i
								class="fa fa-hand-o-right fa-2" aria-hidden="true"></i>
							</span>
						</div>
					</div>
					<div class="menuItem" fileType="others">
						<div class="option">
							<span class="iSpan"><i class="fa fa-bars"
								aria-hidden="true"></i> </span> 其他 <span class="hand hidden"><i
								class="fa fa-hand-o-right fa-2" aria-hidden="true"></i>
							</span>
						</div>
					</div>
					
					<div id='menuBG' class='hidden'></div>
				</div>
				</td>

			<td id="rightContent">
				<div id="insideContent">
					<div id="btnList">
						<div id="upload">
							<span class="btnISpan"><i class="fa fa-arrow-up" aria-hidden="true"></i></span>上传
						</div>
						<div id="dialog-upload" class="hidden" title="上传完成">
							 <p>
							   <span class="ui-icon ui-icon-circle-check" style="float:left; margin:0 7px 50px 0;"></span>
							   您的文件已经成功上传。
							 </p>
						</div>
						<form action="uploadByDisk.action" target="hidden_iframe" enctype="multipart/form-data" method="post">
							<input class="hidden" type="file" name="file"></input>
							<input class="hidden" type="submit" value="上传"/>
						</form>
						<div id="hideBtns">
							<div id="share" class="btnMenu hidden">
								<span class="btnISpan"><i class="fa fa-share-alt"
									aria-hidden="true"></i> </span>分享
							</div>
							<div id="download" class="btnMenu hidden">
								<span class="btnISpan"><i class="fa fa-arrow-down"
									aria-hidden="true"></i> </span>下载
							</div>
							
							<div id="btnDel" class="btnMenu hidden">
								<span class="btnISpan"><i class="fa fa-trash-o" aria-hidden="true"></i> </span>删除
							</div>
							<div class="hidden" id="dialog-confirm" title="您确定删除这些文件吗?">
							  	<p>这些文件将被永久删除，并且无法恢复。您确定码？</p>
							</div>
							<div id="btnUpdate" class="btnMenu hidden">重命名</div>
						</div>
						<div id="search">
							<input id="searchBox" type="text" placeholder="搜索您的文件" /> <span
								id="btnSearch"><i class="fa fa-search" aria-hidden="true"></i>
							</span>
						</div>
					</div>
					<div id="empty" class="hidden">
						<img src="jsp/diskSystem/imgInDisk/noFile.png"></img>
						<div>您还没上传过文件哦，点击上传按钮</div>
					</div>
					<div id="tableDiv">
						<table id="fileList" class="" cellpadding="0" cellspacing="0"></table>
					</div>
				</div></td>
			<td style="width: 10px;"></td>
		</tr>
	</table>
	<div id="xDialogIn"></div>
	<div id="shareDiv"></div>
	<iframe name="hidden_iframe" class="hidden" ></iframe>
</body>
</html>
