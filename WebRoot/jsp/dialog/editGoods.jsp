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
<link rel="stylesheet" href="css/dialog/editGoods.css" type="text/css"></link>
<link rel="stylesheet" href="css/common/myddl.css" type="text/css"></link>
<script type="text/javascript" src="js/common/jquery-1.8.3.js"></script>
<script type="text/javascript" src="js/common/util.js"></script>
<script type="text/javascript" src="js/common/myddl.js"></script>
<script type="text/javascript" src="js/dialog/addGoods.js"></script>
</head>

<body>
	<div id="container" class="addGoods">
		<div class="txtName">类别:</div>
		<div id="typeDdl"></div>
		<div class="inputArea" id="goodsNameArea">
			<div class="txtName">商品名:</div>
			<div class="nameInput">
				<input type="text" id="name" name="" maxlength="20"
					placeHolder="请输入商品名" validate="cenm_p" minLen="2" />
			</div>
			<div class="txtErr"></div>
		</div>
		<div class="inputArea">
			<div class="txtName">价格:</div>
			<div class="nameInput">
				<input type="text" id="price" name=""  maxlength="9"
					placeHolder="请输入价格" validate="np" minLen="1" />
			</div>
			<div class="txtErr"></div>
		</div>
		<div class="inputArea">
			<div class="txtName">销量:</div>
			<div class="nameInput">
				<input type="text" id="sales" name="" maxlength="20"
					placeHolder="请输入销量" validate="n" minLen="1" />
			</div>
			<div class="txtErr"></div>
		</div>
		<div class="inputArea">
			<div class="txtName">库存:</div>
			<div class="nameInput">
				<input type="text" id="num" name="" maxlength="20"
					placeHolder="请输入库存" validate="n" minLen="1" />
			</div>
			<div class="txtErr"></div>
		</div>
		<div class="inputArea">
			<div class="txtName">描述:</div>
			<div class="nameInput">
				<textarea name="" placeHolder="请输入商品描述" id="des" cols="" rows="" validate="cenmp_" minLen="1"></textarea>
			</div>
			<div class="txtErr"></div>
		</div>

		<div class="bottomArea">
			<input type="button" value="保存" id="addBtn" /> <input type="button"
				value="返回" id="backBtn" />
		</div>
	</div>
	<div id="upload">
		<div id="imgList">
			<span>图片预览</span>
		</div>
		<form action="upload.action" method="post" enctype="multipart/form-data" target="uploadIframe">
			<input type="file" name="fileUpload" id="fileUpload" /><span class="delSpan">╳</span>
			<input type="button" id="addPic" value="添加图片" />
		</form>
		<iframe src="" frameborder="0" class="hidden" name="uploadIframe" id="uploadIframe"></iframe>
	</div>
</body>
</html>
