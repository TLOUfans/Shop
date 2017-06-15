$(function() {
	$(".addressInput").blur(function() {
		if (checkAddressTxt(this) != 1) {
			$(this).next().removeClass("hidden");
			$(this).next().text(checkAddressTxt(this));
		}
	}).focus(function() {
		$(this).next().addClass("hidden");
	});
	$("#saveInfo").click(function() {
		var count = 0;
		$(".addressInput").each(function() {
			if (checkAddressTxt(this) == 1) {
				count++;
			}
		});
		if (count != $(".addressInput").length) {
			return;
		}
		var receiver = $("#receiver").val();
		var area = "";
		$(".select-item").each(function() {
			area += $(this).text() + " ";
		});
		var areaDes = $("#areaDes").val();
		var tel = $("#tel").val();
		$.post("addAddress.action", {
			receiver : receiver,
			area : area,
			areaDes : areaDes,
			tel : tel
		}, function(json) {
			if (json.isSuccess == "true") {
				top.$("#btnDialogClose").click();
				var con = "";
				con += " AND C.CHECKED='1'";
				top.window.balance.init({
					renderTo : "#balanceArea",
					dataSource : "queryCartByUserId.action",
					ajaxData : {
						condition : con
					}
				});
			}
		});
	});
});

function checkAddressTxt(obj) {
	var errMsg;
	if (!util.string.validate($(obj).val(), $(obj).attr("validate"))) {
		errMsg = $(obj).attr("placeholder");
		return errMsg;
	} else if ($(obj).val().length < $(obj).attr("minlen")) {
		errMsg = "长度不能小于" + $(obj).attr("minlen");
		return errMsg;
	} else {
		return 1;
	}
};
