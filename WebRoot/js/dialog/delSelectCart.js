$(function() {
	$("#cdaOkBtn").click(function() {
		var count = 0;
		top.$(".checkItem:checked").each(function() {
			var id = $(this).parent().prev().text();
			$.post("deleteCart.action", {
				id : id
			}, function(json) {
				if (json.isSuccess == "true") {
					count++;
				}
				if (count == top.$(".checkItem:checked").size()) {
					top.$("#btnDialogClose").click();
					top.$(".checkItem:checked").parent().parent().remove();
					top.grid4Cart.getTotalNumAndMoney();
					top.window.cartSpan.init({
						renderTo : ".navCart",
						dataSource : "queryCartByUserId.action"
					});
				}
			});
		});
	});
	$("#cdaBackBtn").click(function() {
		top.$("#btnDialogClose").click();
	});
});