$(function() {
	if(util.isIE()) {
		var id = $(window.parent.frames["mainFrame"].document).find(".selectRow").find("td:eq(0)").text();
		var loginName = $(window.parent.frames["mainFrame"].document).find(".selectRow").find("td:eq(1)").text();
		var password = $(window.parent.frames["mainFrame"].document).find(".selectRow").find("td:eq(2)").text();
		var confirPwd = $(window.parent.frames["mainFrame"].document).find(".selectRow").find("td:eq(2)").text();
		var txtName = $(window.parent.frames["mainFrame"].document).find(".selectRow").find("td:eq(3)").text();
		var sex = $(window.parent.frames["mainFrame"].document).find(".selectRow").find("td:eq(4) > div").attr("sex");
		var face = $(window.parent.frames["mainFrame"].document).find(".selectRow").find("td:eq(6)").attr("originalvalue");
	}else {
		var id = $(window.parent.frames["mainFrame"].contentWindow.document.getElementsByClassName("selectRow")[0]).find("td:eq(0)").text();
		var loginName = $(window.parent.frames["mainFrame"].contentWindow.document.getElementsByClassName("selectRow")[0]).find("td:eq(1)").text();
		var password = $(window.parent.frames["mainFrame"].contentWindow.document.getElementsByClassName("selectRow")[0]).find("td:eq(2)").text();
		var confirPwd = $(window.parent.frames["mainFrame"].contentWindow.document.getElementsByClassName("selectRow")[0]).find("td:eq(2)").text();
		var txtName = $(window.parent.frames["mainFrame"].contentWindow.document.getElementsByClassName("selectRow")[0]).find("td:eq(3)").text();
		var sex = $(window.parent.frames["mainFrame"].contentWindow.document.getElementsByClassName("selectRow")[0]).find("td:eq(4) > div").attr("sex");
		var face = $(window.parent.frames["mainFrame"].contentWindow.document.getElementsByClassName("selectRow")[0]).find("td:eq(6)").attr("originalvalue");
	}
	$("#loginName").val(loginName);
	$("#password").val(password);
	$("#confirPwd").val(confirPwd);
	$("#txtName").val(txtName);
	if (sex == '1') {
		$("input[id='sex1']").prop("checked", true);
		sex = "男";
	} else {
		$("input[id='sex2']").prop("checked", true);
		sex = "女";
	}

	$("#editBtn").click(function() {
		var i = 0;
		$("input[type='text'],input[type='password']").each(function() {
			if (checkTxt(this)) {
				i++;
			}
			if (i >= $("input[type='text'],input[type='password']").length) {
				$.post("updateUser.action", {
					id : id,
					loginName : $("#loginName").val(),
					pwd : $("#password").val(),
					sex : $("input[name='sex']:checked").val(),
					name : $("#txtName").val(),
					face : face
				}, function(json) {
					if (json.isSuccess == "true") {
						top.window.frames["mainFrame"].contentWindow.grid.reload("#gird_container");
						top.$("#btnDialogClose").click();
					} else {
						alert(json.errMsg);
					}
				});
			}
		});
	});
	$("#backBtn").click(function() {
		top.$("#btnDialogClose").click();
	});
	$("input[type='text'],input[type='password']").keydown(function(event) {
		if (event.which == 13) {
			$("#editBtn").click();
		}
	}).focus(function() {
		removeErrStyle(this);
	}).blur(function() {
		checkTxt(this);
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
		if(util.isLTIE10()) {
			$(txtObj).parent().next().text(errMsg).animate({
				right : "55px",
				opacity : 1
			});
		} else {
			$(txtObj).parent().next().text(errMsg).css("right", "55px").css("opacity", "1");
		}
		$(txtObj).css("border", "2px solid #f00");
		return 0;
	}

	function removeErrStyle(txtObj) {
		$(txtObj).parent().next().css("right", "20px").css("opacity", "0");
		return 1;
	}

});