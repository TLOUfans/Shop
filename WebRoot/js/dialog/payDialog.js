$(function() {
	var totalMoney = top.$(".clickedBtn").parent().parent().parent().parent().find(".totalMoney").attr("totalMoney");
	$("#payMoney").text(util.number.money(totalMoney));
	var userMoney = $($(top.window.document).find(".navLogin")).attr("userMoney");
	$("#userMoney").text(util.number.money(userMoney));
	if (userMoney - totalMoney < 0) {
		$("#chargeMoney").text("余额不足，请充值").addClass("disableBtn");
	} else {
		$("#chargeMoney").text(util.number.money(userMoney - totalMoney));
	}
	$("#okBtn").click(function() {
		if ($("#chargeMoney").hasClass("disableBtn")) {
			return;
		}
		$("payMoney").text(util.number.money(totalMoney));
		var id = top.$(".clickedBtn").parent().parent().parent().parent().find(".orderNum").attr("orderId");
		var payMoney = totalMoney;
		var sellerId = "";
		top.$(".clickedBtn").parent().parent().parent().parent().find(".sellerName").each(function() {
			sellerId += $(this).attr("sellerId") + ",";
		});
		var price = "";
		top.$(".clickedBtn").parent().parent().parent().parent().find(".goodsName").each(function() {
			price += (+$(this).attr("price") * +$(this).attr("goodsNum")) + ",";
		});
		$.post("updateOrder.action", {
			id : id,
			status : 2,
			payMoney : payMoney,
			sellerId : sellerId,
			price : price
		}, function(json) {
			if (json.isSuccess == "true") {
				top.$("#btnDialogClose").click();
				var userId = top.$(".navLogin").attr("userId");
				var con = " WHERE USERID='" + userId + "' AND STATUS=2 AND 1=1";
				top.$(".selectTitle").removeClass("selectTitle");
				top.$(".orderStatusTitle:eq(2)").addClass("selectTitle");
				top.$("#vipDes").text(util.number.money(userMoney - totalMoney));
				top.order.init({
					renderTo : "#orderContent",
					dataSource : "queryOrderByPage.action",
					ajaxData : {
						condition : con
					}
				});
			} else {
				alert(json.errMsg);
			}
		});
	});
	$("#cancel").click(function() {
		top.$("#btnDialogClose").click();
	});
});