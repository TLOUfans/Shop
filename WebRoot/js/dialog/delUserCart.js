$(function() {
	$("#cdaOkBtn").click(function() {
		var delRow = this;
		var id = $(top.document.getElementsByClassName("selectedDel")).parent().parent().find("td:eq(0)").text();
		$.post("deleteCart.action", {
			id : id
		}, function(json) {
			if (json.isSuccess == "true") {
				top.$("#btnDialogClose").click();
				$(top.document.getElementsByClassName("selectedDel")).parent().parent().remove();
				top.grid4Cart.getTotalNumAndMoney();
				top.window.cartSpan.init({
					renderTo : ".navCart",
					dataSource : "queryCartByUserId.action"
				});
			} else {
				alert(json.errMsg);
			}
		});
	});
	$("#cdaBackBtn").click(function() {
		top.$("#btnDialogClose").click();
	});
});