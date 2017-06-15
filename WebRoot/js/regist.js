$(function() {
	$("#loginName").focus();
	$("input[type='text'],input[type='password']").focus(function() {// 获取焦点
		hideErrTip(this);
	}).blur(function() {// 失去焦点事件
		checkTxt(this);
	}).keydown(function(event) {// 键盘按下事件
		// 如果按下的按键编号是13表示按下的是回车
		if (event.which == 13) {
			// 模拟点击登录按钮
			$("#btnRegist").click();
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
	$("#btnRegist").click(function() {
		var errCount = 0;
		// 遍历页面上的文本框和密码框
		$("input[type='text'],input[type='password']").each(function() {
			errCount += checkTxt(this);
		});
		if (errCount > 0) {
			return;
		}
		$(".placeholder").click(function() {
			$(this).prev().focus();
		});
		$.post("regist.action", {
			loginName : $("#txtLoginName").val(),
			pwd : $("#txtPwd").val(),
			name : $("#txtName").val(),
			sex : $("input[name='sex']:checked").val()
		}, function(json) {
			if (json.isSuccess == "true") {
				$("#btnRegist").addClass("btnSuccess").val("注册成功，请稍后......");
				setTimeout(function() {
					// 页面跳转
					location.href = $("base").attr("href") + "jsp/login.jsp";
				}, 1000);
			} else {
				// 添加红色错误样式并修改按钮文字
				$("#btnRegist").addClass("btnErr").val("注册失败，原因：" + json.errMsg);
				setTimeout(function() {
					$("#btnRegist").removeClass("btnErr").val("注册");
				}, 1500);
			}
		});
	});
});

// 检查文本框的内容是否为空，如果为空就显示红色的提示文字
function checkTxt(txtObj) {
	// 文本框是否出现过错误
	var isHasErr = false;
	// 获取文本框内的文字
	var textStr = $(txtObj).val();
	// 获取文本框后面红色的错误提示元素
	var errTipObj = $(txtObj).next();
	// 错误提示信息
	var getErrMsg = function() {
		// 错误提示信息
		var n = $(txtObj).prev().text();
		// 如果文本框内的文字为空
		if ($.trim(textStr) == "") {
			isHasErr = true;
			return "请输入" + n;
		}
		// 如果输入文字的长度小于minlength属性指定的长度
		if ($.trim(textStr).length < parseInt($(txtObj).attr("minlength"))) {
			isHasErr = true;
			return "长度太短";
		}
		// 判断是否包含非法字符
		if (!util.string.validate(textStr, $(txtObj).attr("validate"))) {
			isHasErr = true;
			return "请勿输入非法字符";
		}
		// 获取密码和确认密码文本框的值
		var p1 = $("#txtPwd").val(), p2 = $("#txtConfirm").val();
		if ($(txtObj).attr("id") == "txtConfirm" && p1.length > 0 && !$("#txtPwd").hasClass("txtErr") && p1 != p2) {
			isHasErr = true;
			return "密码不一致";
		}
	};
	// 获取错误提示信息
	var errMsg = getErrMsg();
	// 如果出错?显示错误提示的样式:隐藏错误提示的样式
	return isHasErr ? showErrTip(txtObj, errMsg) : hideErrTip(txtObj, errMsg);
}

// 显示错误提示的样式
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
	return 1;
}

// 隐藏错误提示的样式
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
	return 0;
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
