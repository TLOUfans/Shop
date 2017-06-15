$(function() {
	var userName = util.cookie.get("name");
	if (userName != null && userName != "") {
		// 把焦点设置到密码框上
		$("#txtPassword").focus();
		// 帮用户勾选“记住我”复选框
		$("#chkRM").prop("checked", true);
		// 把从cookie获取到的用户名设置到文本框
		$("#txtName").val(userName);
		// 显示错误提示
		showErrTip($("#txtName"), "已为您填写用户名", "txtSuccess", "showSuccessTips");
		// 两秒后删除提示
		setTimeout(function() {
			// 隐藏错误提示
			hideErrTip($("#txtName"), "txtSuccess", "showSuccessTips");
		}, 2000);
	} else {
		// 把焦点设置到登录名框上
		$("#txtName").focus();
	}
	$("input[type='text'],input[type='password']").focus(function() {// 获取焦点
		hideErrTip(this);
	}).blur(function() {// 失去焦点事件
		checkTxt(this);
	}).keydown(function(event) {// 键盘按下事件
		// 如果按下的按键编号是13表示按下的是回车
		if (event.which == 13) {
			// 模拟点击登录按钮
			$("#btnLogin").click();
		}
	}).keyup(function() {
		if ($(this).val() == "") {
			$(this).next().removeClass("hidden");
		} else {
			$(this).next().addClass("hidden");
		}
	});
	$(".placeholder").click(function() {
		$(this).prev().focus();
	});
	// 登录按钮点击事件
	$("#btnLogin").click(function() {
		if ($(this).hasClass("btnErr") || $(this).hasClass("btnDisable"))
			return;
		$(this).addClass("btnDisable");
		var errCount = 0;
		// 遍历页面上的文本框和密码框
		$("input[type='text'],input[type='password']").each(function() {
			errCount += checkTxt(this);
		});
		if (errCount > 0) {
			$(this).removeClass("btnDisable");
			return;
		}
		$.post("login.action", {
			loginName : $("#txtName").val(),
			pwd : $("#txtPassword").val(),
			code : $("#txtCode").val()
		}, function(json) {
			$("#btnLogin").removeClass("btnDisable");
			if (json.isSuccess == "true") {
				$("#btnLogin").addClass("btnSuccess").val("登陆成功，请稍后......");
				// cookie
				// 如果用户勾选了记住我复选框
				if ($("#chkRM").prop("checked"))
					// 把当前的用户名保存到cookie
					util.cookie.set("name", $("#txtName").val());
				else
					util.cookie.set("name", "");
				setTimeout(function() {
					// 页面跳转
					if (location.search != null && location.search.split("=")[0] == "?goodsId") {
						location.href = $("base").attr("href") + "jsp/goodsDes.jsp?goodsId=" + location.search.split("=")[1];
					} else {
						location.href = $("base").attr("href") + "jsp/tableFrame.jsp";
					}
				}, 1000);
			} else {
				// 添加红色错误样式并修改按钮文字
				$("#btnLogin").addClass("btnErr").val("登录失败，原因：" + json.errMsg);
				if (json.errMsg == "验证码错误") {
					$("#txtCode").val("").focus();
				}
				// 刷新验证码
				loadImg();
				setTimeout(function() {
					$("#btnLogin").removeClass("btnErr").val("登录");
				}, 1500);
			}
		});
	});
	// 验证码点击事件
	$("#pic").click(function() {
		// 加载验证码
		loadImg();
	});
	// 加载验证码
	loadImg();
});

// 检查文本框的内容是否为空，如果为空就显示红色的提示文字
function checkTxt(txtObj) {
	// 获取文本框内的文字
	var textStr = $(txtObj).val();
	// 获取文本框后面红色的错误提示元素
	var errTipObj = $(txtObj).next();
	// 错误提示信息
	var errMsg = "请输入" + $(txtObj).attr("placeholder");
	// 如果文本框内的文字为空
	if (textStr == "") {
		// 显示错误提示
		showErrTip(txtObj, errMsg);
		return 1;
	} else {
		// 隐藏错误提示
		hideErrTip(txtObj);
		return 0;
	}
}

// 显示错误提示
function showErrTip(txtObj, errMsg, txtClass, errTipClass) {
	txtClass = txtClass == null ? "txtErr" : txtClass;
	errTipClass = errTipClass == null ? "showErrTips" : errTipClass;
	// 获取文本框后面红色的错误提示元素
	var errTipObj = $(txtObj).next().next();
	// 给文本框加上红色边框
	$(txtObj).addClass(txtClass);
	// 设置错误提示文字
	$(errTipObj).text(errMsg);
	// IE8/IE9
	if (util.isLTIE10()) {
		// 使用jq实现动画
		$(errTipObj).animate({
			opacity : "1",
			marginRight : 15
		}, "fast");
	} else {
		// 给错误提示文字加上显示的样式，同时修改内部文字为errMsg
		$(errTipObj).addClass(errTipClass);
	}
}

// 隐藏错误提示
function hideErrTip(txtObj, txtClass, errTipClass) {
	txtClass = txtClass == null ? "txtErr" : txtClass;
	errTipClass = errTipClass == null ? "showErrTips" : errTipClass;
	// 获取文本框后面红色的错误提示元素
	var errTipObj = $(txtObj).next().next();
	// 去掉文本框的红色边框
	$(txtObj).removeClass(txtClass);
	// IE8/IE9
	if (util.isLTIE10()) {
		// 使用jq实现动画
		$(errTipObj).animate({
			opacity : "0",
			marginRight : "0px"
		}, "fast");
	} else {
		// 隐藏错误提示文字
		$(errTipObj).removeClass(errTipClass);
	}
}

// 当用户点击文本框时，文本框获得焦点，无论文本框内是否有文字，都不显示红色错误提示
function removeErrStyle(txtObj) {
	// 去掉文本框的红色边框
	$(txtObj).removeClass("txtErr");
	// 获取文本框后面红色的错误提示元素
	var errTipObj = $(txtObj).next();
	// 隐藏错误提示文字
	$(errTipObj).removeClass("showErrTips");
}

// 加载验证码
function loadImg() {
	$("#pic").attr("src", $("#pic").attr("basePath") + "?t=" + +new Date());
}
