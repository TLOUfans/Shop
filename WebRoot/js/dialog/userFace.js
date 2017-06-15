$(function() {
	$("#faceBtn").click(function() {
		if ($(this).hasClass("unClick")) {
			alert("还没有选择新头像");
			return;
		}
		$("#userFaceForm").submit();
	});
	$("#imgCon").click(function() {
		$("#userFace").click();
	});
	$("#userFace").change(function() {
		$("#faceBtn").removeClass("unClick");
		var imgSrc = $(this).val().substr(12);
		if (imgSrc == "") {
			$("#faceBtn").addClass("unClick");
		}
		$("#imgCon>img").attr("src", "img/" + imgSrc);
		top.$("#userFaceArea>img").attr("src","img/" +  imgSrc);
	});
});

function postGoodsInfo(allImgInfo) {
	$.post("updateUser.action", {
		face : allImgInfo
	}, function(json) {
		if (json.isSuccess == "true") {
			top.window.frames["mainFrame"].contentWindow.grid.reload("#gird_container");
			top.$("#btnDialogClose").click();
		} else {
			alert(json.errMsg);
		}
	});
}

var face = {
	init : function(args) {
		face.build(args);
	},
	build : function(args) {
		var renderTo = args.renderTo;
		$(renderTo).addClass("hidden");
		var userFace = $("<div id='userFace'></div>").appendTo(renderTo);
		$("<img src='' alt='头像' />").appendTo(userFace);
		$(userFace).find("img").attr("src", "img/<%=Session['user']%>");
		var vipArea = $("<div id='vipArea'></div>").appendTo(renderTo);
		$("<div id='vipIcon'>PLUS</div>").appendTo(vipArea);
		$("<div id='vipDes'>购买PLUS会员尊享顶级特权</div>").appendTo(vipArea);
		face.eventBind(args);
	},
	eventBind : function(args) {
		$("#faceBtn").click(function() {
			$("#userFaceForm").submit();
		});
	}
};
