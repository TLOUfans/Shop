$(function() {
	$("#cdaOkBtn").click(function() {
		var id = window.parent.frames["mainFrame"].contentWindow.document.getElementsByClassName("selectRow")[0].firstChild.getAttribute("title");
		$.post("deleteType.action", {
			id : id
		}, function(json) {
			if (json.isSuccess == "true") {
				top.window.frames["mainFrame"].contentWindow.grid.reload("#gird_container");
				top.$("#btnDialogClose").click();
			} else {
				alert("删除失败，原因是：" + json.errMsg);
			}
		});
	});
	$("#cdaBackBtn").click(function() {
		top.$("#btnDialogClose").click();
	});
});