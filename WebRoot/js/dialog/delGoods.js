$(function() {
	$("#cdaOkBtn").click(function() {
		var id = $(window.parent.frames["mainFrame"].contentWindow.document.getElementsByClassName("selectRow")[0]).find("td:eq(0)").text();
		$.post("deleteGoods.action", {
			id : id
		}, function(json) {
			if (json.isSuccess == "true") {
				top.$("#btnDialogClose").click();
				top.window.frames["mainFrame"].contentWindow.grid.reload("#gird_container");
			} else {
				alert(json.errMsg);
			}
		});
	});
	$("#cdaBackBtn").click(function() {
		top.$("#btnDialogClose").click();
	});
});