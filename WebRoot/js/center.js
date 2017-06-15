$(function() {
	var xDialog = new XDialog({
		renderTo : "#xDialog"
	});
	$("#bgImg").height($("body").height());
	$("#xDialog").click(function(event) {
		event.stopPropagation();
	});
	$("body").click(function(event) {
		xDialog.hide();
		$(".funcList").addClass("hidden");
	});
	$("#editBtn").click(function() {
		$("#userInfo").removeClass("hidden");
		$("#chatIframe").addClass("hidden");
	});
	$(".underLine").css("left", $(".funcTitle").width() / 2 - 15 + "px");
	$(".funcTitle").click(function(event) {
		event.stopPropagation();
		var index = $(".funcTitle").index(event.target);
		if ($(this).next().hasClass("hidden")) {
			$(".funcList").not(this).addClass("hidden");
			$(this).next().removeClass("hidden");
		} else {
			$(this).next().addClass("hidden");
		}
		if (util.isLTIE10()) {
			$(".underLine").animate({
				left : index * $(this).outerWidth() + $(".funcTitle").width() / 2 - 15
			});
		} else {
			$(".underLine").css("left", (index * $(this).outerWidth() + $(".funcTitle").width() / 2 - 15) + "px");
		}
	});
	$(".funcList:eq(1)").click(function() {
		$(this).addClass("hidden");
	});
	$(".funcList:eq(0)").on("click", ".funcItem", function() {
		if ($(this).index() == 0) {
			location.href = "jsp/typeList.jsp";
		} else if ($(this).index() == 1) {
			location.href = "jsp/cart.jsp";
		} else if ($(this).index() == 2) {
			location.href = "jsp/order.jsp";
		}
		$(this).parent().addClass("hidden");
	});
	$(".funcList:eq(1)").on("click", ".funcItem", function() {
		$("#userInfo").addClass("hidden");
		$("#chatIframe").removeClass("hidden");
		if ($(this).index() == 0) {
			$("#chatIframe").attr("src", "jsp/myFriends.jsp");
		} else if ($(this).index() == 1) {
			$("#chatIframe").attr("src", "jsp/chatroom.jsp");
		} else if ($(this).index() == 2) {
			$("#chatIframe").attr("src", "jsp/addFriends.jsp");
		}
		$(this).parent().addClass("hidden");
	});
	$(".funcTitle:eq(2)").on("click", function() {
		if (util.isIE()) {
			location.href = "diskSystem/diskMain.jsp";
		} else {
			location.href = "jsp/diskSystem/diskMain.jsp";
		}
	});
	$(".funcTitle:eq(3)").on("click", function(event) {
		event.stopPropagation();
		var diglogH = util.isLTIE10() ? 500 : 400;
		xDialog.show({
			title : "销量图表",
			url : "jsp/dialog/SalesCharts.jsp",
			width : "90%",
			height : diglogH
		});
		$(".xdialogMask").height($("body").height());
	});
	$("#userFace").mouseenter(function() {
		if (util.isMobile())
			return;
		$(this).find("#mask").removeClass("hidden");
	});
	$("#mask").mouseleave(function() {
		$(this).addClass("hidden");
	});
	$(".line").hover(function() {
		if (util.isMobile())
			return;
		if (util.isLTIE10()) {
			$(this).find(".modifyBtn").animate({
				opacity : 1
			}, "fast");
		} else {
			$(this).find(".modifyBtn").css({
				opacity : 1
			});
		}
	}, function() {
		if (util.isLTIE10()) {
			$(this).find(".modifyBtn").animate({
				opacity : 0
			}, "fast");
		} else {
			$(this).find(".modifyBtn").css({
				opacity : 0
			});
		}
	});
	// 修改按钮
	$(".modifyBtn").click(function() {
		if (util.isMobile())
			return;
		editModule(this);
	});
	// 取消按钮
	$(".cancelBtn").click(function() {
		normalModule(this);
	});
	// 保存按钮
	$(".saveBtn").click(function() {
		var txtInput = $(this).parent().parent().find(".txtInput");
		if (txtInput.attr("name") == "sex") {
			txtInput.each(function() {
				if ($(this).prop("checked")) {
					var obj = this;
					var sex = $(this).val();
					$.post("updateUserSingle.action", {
						sex : sex
					}, function(json) {
						if (json.isSuccess == "true") {
							$(obj).parent().parent().prev().prev().html(sex);
						} else {
							alert(json.errMsg);
						}
					});
				}
			});
		} else if (txtInput.attr("name") == "pwd") {
			var obj = {};
			obj[txtInput.attr("name")] = txtInput.val();
			$.post("updateUserSingle.action", obj, function(json) {
				if (json.isSuccess == "true") {
					alert("请重新登陆");
					$.post("exit.action", function(json) {
						if (json.isSuccess == "true") {
							if (util.isIE()) {
								location.href = "login.jsp";
							} else {
								location.href = "jsp/login.jsp";
							}
						}
					});
				} else {
					alert(json.errMsg);
				}
			});
		} else {
			var obj = {};
			obj[txtInput.attr("name")] = txtInput.val();
			$.post("updateUserSingle.action", obj, function(json) {
				if (json.isSuccess == "true") {
					$(txtInput).parent().prev().prev().html($(txtInput).val());
				} else {
					alert(json.errMsg);
				}
			});
		}
		normalModule(this);
	});
	// 修改头像
	$("#mask").click(function() {
		if (util.isMobile())
			return;
		$("#faceFile").click();
	});
	$("#faceFile").change(function() {
		$("form").submit();
		var imgDiv = $("#userFace");
		imgDiv.find("img").remove();
		util.file.preview(this, imgDiv[0]);
	});
	$(".txtContent:eq(3)").text(util.string.replaceAll($(".txtContent:eq(3)").text(), /\w/ig, "*"));
});

function editModule(obj) {
	$(obj).nextAll().removeClass("hidden");
	$(obj).addClass("hidden").prev().addClass("hidden");
}

function normalModule(obj) {
	$(obj).parent().prevAll(".hidden").removeClass("hidden");
	$(obj).parent().addClass("hidden");
	$(obj).parent().prev().addClass("hidden");
}

function postGoodsInfo(allImgInfo) {
	$.post("updateUser.action", {
		face : allImgInfo
	}, function(json) {
		if (json.isSuccess == "true") {
			$.post("queryById.action", {
				userId : $("#xnavFace").attr("userid")
			}, function(json) {
				$("#xnavFace").attr("src", "img/" + json.face);
			});
		} else {
			alert(json.errMsg);
		}
	});
}
