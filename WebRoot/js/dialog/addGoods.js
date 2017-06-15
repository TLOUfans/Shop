var isEdit = false;
var goodsId = "";

$(function() {
	ddl.init({
		renderTo : "#typeDdl",
		mapping : {
			key : "id",
			value : "menu"
		},
		dataSource : "getTypeMenu.action",
		direction : "down",
		defaultSelected : -1,
		defaultItems : [ {
			id : "-1",
			menu : "-- 请选择 --"
		} ],
		onClick : function() {
			$("#typeDdl").css("border", "2px solid #aaa");
		},
		onLoad : function() {
			edit();
		}
	});

	$("#addBtn").click(function() {
		var i = 0;
		$("input[type='text'],input[type='password'],textarea").each(function() {
			if (checkTxt(this)) {
				i++;
			}
			if ($("#typeDdl .ddlItemSelected").attr("key") != "-1") {
				i++;
			} else {
				$("#typeDdl").css("border", "2px solid red");
			}
			if ($("input[type='file']").val() != "") {
				i++;
			} else {
				$("input[type='file']").css("color", "red");
			}
			if (i >= $("input[type='text'],input[type='password'],textarea").length + 2) {
				$("form").submit();
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
	$("#addPic").click(function() {
		$("<input type='file' name='fileUpload' id='fileUpload' /><span class='delSpan'>╳</span>").insertBefore($(this));
		removeFile(".delSpan");
	});
	removeFile();
});

function removeFile(delSpan) {
	if (!delSpan) {
		delSpan = ".delSpan";
	}
	$(delSpan).click(function() {
		$(this).prev().remove();
		$(this).remove();
	});
}

function postGoodsInfo(allImgInfo) {
	if (isEdit) {
		var fileNameArr = [];
		$(".goodsImg").each(function() {
			fileNameArr.push($(this).attr("fileName"));
		});
		allImgInfo = fileNameArr.join(",") + "," + allImgInfo;
	}
	var url = isEdit ? "updateGoods.action" : "addGoods.action";
	$.post(url, {
		id : goodsId,
		name : $("#name").val(),
		price : $("#price").val(),
		sales : $("#sales").val(),
		num : $("#num").val(),
		des : $("#des").val(),
		typeId : $("#typeDdl .ddlItemSelected").attr("key"),
		allImgInfo : allImgInfo
	}, function(json) {
		if (json.isSuccess == "true") {
			if(util.isIE()) {
				top.window.frames["mainFrame"].grid.reload("#gird_container");
			} else {
				top.window.frames["mainFrame"].contentWindow.grid.reload("#gird_container");
			}
			top.$("#btnDialogClose").click();
		} else {
			alert(json.errMsg);
		}
	});
}

function edit() {
	if (top.editObj != null) {
		var e = top.editObj;
		top.editObj = null;
		$("#name").val(e.name);
		$("#price").val(util.string.ieTrim(e.price).replace(",", ""));
		$("#sales").val(e.sales);
		$("#num").val(e.num);
		$("#des").val(e.des);
		ddl.selectItem("#typeDdl", $("#typeDdl .ddlItem[key='" + e.typeId + "']"));
		goodsId = e.id;
		isEdit = true;
		$(e.smImgs.split(",")).each(function() {
			var imgContainer = $("<div class='imgContainer'>删除</div>").appendTo("#imgList");
			$("<img class='goodsImg' src='img/" + this + "'fileName='" + this + "'/>").appendTo(imgContainer);
			$(".imgContainer").click(function() {
				$(this).remove();
			});
		});
	}
}

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
			right: "80px",
			opacity : 1
		});
	}else {
		$(txtObj).parent().next().text(errMsg).css("right", "80px").css("opacity", "1");
	}
	$(txtObj).css("border", "2px solid #f00");
	return 0;
}

function removeErrStyle(txtObj) {
	$(txtObj).parent().next().css("right", "60px").css("opacity", "0");
	$(txtObj).css("border", "2px solid #aaa");
	return 1;
}
