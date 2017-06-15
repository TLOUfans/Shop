$(function() {
	$("#xnavFace").click(function() {
		var navUserInfo = $("#navUserInfo");
		if (navUserInfo.hasClass("hidden")) {
			navUserInfo.removeClass("hidden");
		} else {
			navUserInfo.addClass("hidden");
		}
	});
	$("body").click(function(event) {
		if (event.target == $("#xnavFace")[0]) {
			return;
		}
		$("#navUserInfo").addClass("hidden");
		if (util.isMobile() && window.screen.width < 720) {
			if (event.target == $("#navSearchBtn")[0] || event.target == $("#navSearchBox")[0]) {
				return;
			}
			$("#navSearchBox").css("display", "none");
			$(".xnavTxt").removeClass("hidden");
			$("#xnavFace").removeClass("hidden");
			$("#navInputArea").removeClass("allWidth");
			$("#btnArea").removeClass("hidden");
		}
	});

	$("#navSearchBtn").click(function() {
		if (util.isMobile()) {
			if ($(this).prev("input").css("display") == "none") {
				$(this).parent().addClass("allWidth");
				$(this).prev().css("display", "inline-block");
				$(".xnavTxt").addClass("hidden");
				$("#xnavFace").addClass("hidden");
				$("#btnArea").addClass("hidden");
			}
		}
		if ($(this).prev("input").css("display") != "none") {
			var goodsName = $(this).prev().val();
			if (util.string.replaceAll(goodsName, /[ ]/ig, "") == "") {
				return;
			} else {
				if(util.isIE()) {
					window.open("goodsList.jsp?goodsName=" + escape(goodsName));
				} else {
					if(util.isMobile()) {
						location.href = "jsp/goodsList.jsp?goodsName=" + escape(goodsName);
					} else {
						window.open("jsp/goodsList.jsp?goodsName=" + escape(goodsName));
					}
				}
			}
		}
	});
	$("#navSearchBox").keydown(function(event) {// 键盘按下事件
		// 如果按下的按键编号是13表示按下的是回车
		if (event.which == 13) {
			if (this == document.activeElement) {
				// 模拟点击登录按钮
				$("#navSearchBtn").click();
			}
		}
	});
	$(".navUserInfoItem:eq(1)").click(function() {
		$.post("exit.action", function(json) {
			if (json.isSuccess == "true") {
				if (navigator.userAgent.indexOf("MSIE") > -1 || navigator.userAgent.indexOf("rv:11") > -1) {
					location.href = "login.jsp";
				} else {
					location.href = "jsp/login.jsp";
				}
			}
		});
	});
	$("#xnavBtnReg").click(function(){
		if(util.isIE()) {
			location.href = "regist.jsp";
		} else {
			location.href = "jsp/regist.jsp";
		}
	});
	$("#xnavBtnLogin").click(function(){
		if(util.isIE()) {
			location.href = "login.jsp";
		} else {
			location.href = "jsp/login.jsp";
		}
	});
});