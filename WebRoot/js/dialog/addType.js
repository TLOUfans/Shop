$(function() {
	$("#addBtn").click(function() {
		var i = 0;
		$("input[type='text'],input[type='password'],textarea").each(function() {
			if (checkTxt(this)) {
				i++;
			}
			if (i >= $("input[type='text'],input[type='password'],textarea").length && $("#typeDdl .ddlItemSelected").attr("key") != "-1") {
				$.post("addType.action", {
					name : $("#name").val(),
					no : $("#no").val(),
				}, function(json) {
					if (json.isSuccess == "true") {
						top.window.frames["mainFrame"].contentWindow.grid.reload("#gird_container");
						top.$("#btnDialogClose").click();
					} else {
						alert("添加失败：错误原因是:" + json.errMsg);
					}
				});
			}
		});
	});
	$("#backBtn").click(function() {
		top.$("#btnDialogClose").click();
	});
	$("input[type='text'],input[type='password'],textarea").keydown(function(event) {
		if (event.which == 13) {
			$("#addBtn").click();
		}
	}).focus(function() {
		removeErrStyle(this);
	}).blur(function() {
		checkTxt(this);
	});
});

function checkTxt(txtObj) {
	var isHasErr = false;
	var getErrMsg = function(txtObj) {
		if ($.trim($(txtObj).val()) == "") {
			isHasErr = true;
			return $(txtObj).attr("placeholder");
		}
		if ($(txtObj).val().length < $(txtObj).attr("minLen")) {
			isHasErr = true;
			return "长度太短了";
		}
		if (!util.string.validate($(txtObj).val(), $(txtObj).attr("validate"))) {
			isHasErr = true;
			return "输入的是非法字符";
		}
		var p1 = $("#password").val(), p2 = $("#confirPwd").val();
		if ($(txtObj).attr("id") == "confirPwd" && p1.length != 0 && !($("password").parent().next().css("opacity") == 1) && p1 != p2) {
			isHasErr = true;
			return "两次输入密码不一致";
		}
	};
	var errMsg = getErrMsg(txtObj);
	return isHasErr ? showErrTips(txtObj, errMsg) : removeErrStyle(txtObj, errMsg);
}

function showErrTips(txtObj, errMsg) {
	if (util.isLTIE10()) {
		$(txtObj).parent().next().text(errMsg).animate({
			right : "80px",
			opacity : 1
		});
	} else {
		$(txtObj).parent().next().text(errMsg).css("right", "80px").css("opacity", "1");
	}
	$(txtObj).css("border", "2px solid #f00");
	return 0;
}

function removeErrStyle(txtObj) {
	$(txtObj).parent().next().css("right", "20px").css("opacity", "0");
	$(txtObj).css("border", "2px solid #aaa");
	return 1;
}
