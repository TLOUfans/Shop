$(function() {
	// 上传按钮点击事件
	$("#upload").click(function() {
		$("input[type='file']").click();
	});
	// 搜索框搜索文件
	$("#btnSearch").click(function() {
		if ($("#searchBox").val().trim() != "") {
			loadFileBySearch();
			$("#searchBox").val("");
		} else {
			$("#searchBox").val("");
			$("#searchBox").focus();
			reloadFileList();
		}
	});
	$("#searchBox").keydown(function(event) {
		if (event.which == 13) {
			$("#btnSearch").click();
			$("#searchBox").blur();
		}
	});
	// 删除文件
	$("#btnDel").click(function() {
		var id = "";
		var fileName = "";
		$("input:checkbox:checked").each(function(i, t) {
			id += $(t).attr("id") + ",";
			fileName += $(t).next().text() + ",";
		});
		$("#dialog-confirm").removeClass("hidden");
		$("#dialog-confirm").dialog({
			resizable : false,
			height : "auto",
			width : 400,
			modal : true,
			buttons : {
				"确认" : function() {
					$.post("deleteFile.action", {
						id : id,
						fileName : fileName
					}, function(json) {
						if (json.isSuccess == "true") {
							reloadFileList();
							// $(".btnMenu").addClass("hidden");
						} else {
							alert(json.errMsg);
						}
					});
					$(this).dialog("close");
					setTimeout(function() {
						showBtns();
					}, 50);

				},
				"取消" : function() {
					$(this).dialog("close");
				}
			}
		});
	});
	// 文件下载
	$("#download").click(function() {
		var userName = $("#shopName").attr("loginName");
		$("input:checkbox:checked").each(function(i, t) {
			var n = $(t).next().text();
			$("<a href='disk/" + userName + "/" + unescape(n) + "' download='" + n + "' class='na hidden'>下载...</a>").appendTo("#btnList");
			$("#btnList>.na")[i].click();
		});
		$("#btnList>.na").remove();
	});
	// 文件分享
	$("#share").click(function() {

		if ($("input:checkbox:checked").length != 1) {
			return;
		} else {
			var xDialog = new XDialog({
				renderTo : "#shareDiv"
			});
			$("body").click(function(event) {
				xDialog.hide();
			});
			event.stopPropagation();
			// var downloadPath = $("#shareDiv").attr("sharePath",dlPath);
			var fileName = $("input:checkbox:checked").next().text();
			var diglogH = util.isLTIE10() ? 700 : 600;
			xDialog.show({
				title : "分享文件",
				url : "jsp/myFriends.jsp?download",
				width : "60%",
				height : diglogH
			});
			top.sessionStorage.downloadPath = $("input:checkbox:checked").attr("dlPath");
		}
	});
	// 文件分类搜索
	$(".menuItem").click(function() {

		var con = "";
		var type = $(this).attr("fileType").split(" ");
		var fileTypeStr = "";
		var allType = [ ".jpg", ".png", ".jpeg", ".tif", ".tiff", ".gif", ".bmp", ".dib", ".doc", ".txt", ".xls", ".ppt", ".avi", ".mpg", ".wmv", ".mp4", ".3gp", ".swf", ".mkv", ".flv", ".vob", ".torrent", ".wav", ".mp3", ".wma" ];
		var otherType = "";
		$(type).each(function() {
			fileTypeStr += " FILETYPE = '" + this + "' OR";
		});

		$(allType).each(function() {
			otherType += " FILETYPE != '" + this + "' AND";
		});

		fileTypeStr = fileTypeStr.substring(0, fileTypeStr.length - 2);
		otherType = otherType.substring(0, otherType.length - 3);
		if (type[0] == "all") {
			con += "USERID ='" + $("#shopName").attr("userId") + "' AND ";
		} else if (type[0] == "others") {

			con += "USERID ='" + $("#shopName").attr("userId") + "' AND (" + otherType + ") AND ";
		} else {
			con += "USERID ='" + $("#shopName").attr("userId") + "' AND (" + fileTypeStr + ") AND ";
		}
		con = "WHERE " + con + " 1=1";
		filesInfo.init({
			renderTo : "#fileList",
			dataSource : "getFilesByPage.action",
			ajaxData : {
				condition : con,
			}
		});
		setTimeout(function() {
			showBtns();
		}, 50);
	});
	$(window).resize(function() {
		updateSize();
	});
});

var filesInfo = {
	init : function(args) {
		if (args.ajaxData == null) {
			args.ajaxData = {
				pageNum : 1,
				pageSize : 10
			};
		} else {
			if (args.ajaxData.pageNum == null) {
				args.ajaxData.pageNum = 1;
			}
			if (args.ajaxData.pageSize == null) {
				args.ajaxData.pageSize = 10;
			}
		}
		$(args.renderTo).data("args", args);
		filesInfo.getDataByDataSource(args);
	},
	reload : function(renderTo, pageSize, pageNum) {
		var args = $(renderTo).data("args");
		args.ajaxData.pageNum = pageNum;
		args.ajaxData.pageSize = pageSize;
		filesInfo.init(args);
	},
	getDataByDataSource : function(args) {
		if (typeof args.dataSource == "string") {
			$.ajax({
				url : args.dataSource,
				type : "POST",
				dataType : "json",
				data : args.ajaxData,
				success : function(json) {
					var obj = json;
					args.data = obj;
					filesInfo.build(args);
				}
			});
		} else if ($.isArray(args.dataSource)) {
			args.data = args.dataSource;
			filesInfo.build(args);
		}
	},
	build : function(args) {
		var renderTo = $(args.renderTo);
		renderTo.html("");
		var th = $("<tr><td>文件名</td><td>大小</td><td>修改日期</td></tr>").appendTo(renderTo);
		$(args.data.rows).each(function(i, t) {
			var userName = $("#shopName").attr("loginName");
			var tr = $("<tr userId = '" + this.userId + "'></tr>").appendTo(renderTo);
			var tdName = $("<td></td>").appendTo(tr);
			var label = $("<label class='lblRM'></label>").appendTo(tdName);
			var chkI = $("<span class='chkI'></span>").appendTo(label);
			var faCheck = $("<i class='fa fa-check-square-o hidden' aria-hidden='true'></i>").appendTo(chkI);
			var faSquare = $("<i class='fa fa-square-o' aria-hidden='true'></i>").appendTo(chkI);
			var chkName = $("<input id='" + this.id + "' class='chkRM' dlPath='" + $("base").attr("href") + "disk/" + userName + "/" + this.fileName + "' type='checkbox' /><span class='fileName'>" + this.fileName + "</span><input class='reName hidden' type='text' value='" + this.fileName + "'/><span class='new-chk hidden'><i class='fa fa-check' aria-hidden='true'></i><i class='fa fa-times' aria-hidden='true'></i></span>").appendTo(label);
			var tdSize = $("<td><span>" + util.string.countSize(this.fileSize) + "</span></td>").appendTo(tr);
			var tdTime = $("<td><span>" + this.createTime + "</span></td>").appendTo(tr);
			if (args.onLoad != null)
				args.onLoad();
		});
		// 分页
		var trIn = $("<tr></tr>").appendTo(renderTo);
		var tdIn = $("<td id='filePageTd' colspan='3'></td>").appendTo(trIn);
		var pagerTable = $("<table class='pagerTable' cellpadding='0' cellspacing='0'></table>").appendTo(tdIn);
		var pagerTr = $("<tr></tr>").appendTo(pagerTable);
		var html = "";
		html += "<td width='100'>共<span class='itemCount'>" + args.data.total + "</span>项</td>";
		html += "<td width='70'>每页显示</td>";
		html += "<td width='80'><div class='pagerDdl'></div></td><td style='text-align:left;'>项</td>";
		html += "<td width='80'><div class='pagePrev pagerBtn'>上一页</div></td>";
		html += "<td width='80' style='text-align: center;'><span class='currentPage'>" + args.ajaxData.pageNum + "</span>/<span class='totalPage'>" + Math.ceil(args.data.total / args.ajaxData.pageSize) + "</span></td>";
		html += "<td width='80'><div class='pageNext pagerBtn'>下一页</div></td>";
		$(pagerTr).html(html);
		if (args.onLoad != null && $.isFunction(args.onLoad)) {
			args.onLoad();
		}
		if ($("#fileList tr").length == 3) {
			$("#fileList").addClass("hidden");
			$("#empty").removeClass("hidden");
		} else {
			$("#fileList").removeClass("hidden");
			$("#empty").addClass("hidden");
		}
		filesInfo.eventBind(args);
	},
	eventBind : function(args) {
		var renderTo = args.renderTo;
		var xddl = new XDDL({
			renderTo : args.renderTo + " .pagerDdl",
			dataSource : [ {
				key : 10,
				value : 10
			}, {
				key : 15,
				value : 15
			}, {
				key : 20,
				value : 20
			}, {
				key : 30,
				value : 30
			} ],
			direction : "up",
			offset : -4,
			defaultSelected : args.ajaxData.pageSize,
			onClick : function() {
				// 回调
				filesInfo.reload(args.renderTo, $(".ddl .ddlItemSelected", args.renderTo).attr("key"), 1);
			}
		});

		$(".pageNext", args.renderTo).click(function() {
			var currentPage = $(".currentPage", args.renderTo).text();
			var maxPage = $(".totalPage").text();
			var page = +currentPage + 1;
			page = page > maxPage ? maxPage : page;
			$(".currentPage", args.renderTo).text(page);
			filesInfo.reload(args.renderTo, $(".ddl .ddlItemSelected", $(args.renderTo)).attr("key"), page);
		});
		$(".pagePrev", args.renderTo).click(function() {
			var currentPage = $(".currentPage", args.renderTo).text();
			var page = +currentPage - 1;
			page = page < 1 ? 1 : page;
			$(".currentPage", args.renderTo).text(page);
			filesInfo.reload(args.renderTo, $(".ddl .ddlItemSelected", $(args.renderTo)).attr("key"), page);
		});
		// 导航栏菜单选则
		$(".navMenu").click(function() {
			$(".navMenu").removeClass("selected");
			$(this).addClass("selected");
		});

		// 导航栏用户信息显示    
		$("#arrow,#user").mouseenter(function() {
			$("#arrow").hover().css("transform", "rotate(180deg)");
			$(".userMenu").removeClass("hidden").height("158px");
		});
		$("#arrow,#user").mouseleave(function() {
			$(".userMenu").height("0px");
			setTimeout(function() {
				$(".userMenu").addClass("hidden");
			}, 240);
			//$(".userMenu").addClass("hidden");
			$("#arrow").hover().css("transform", "rotate(0deg)");
		});

		// 左侧菜单栏
		$("#menuContent").hover(function() {
			// 鼠标进入菜单区域时显示背景色块
			$("#menuBG").removeClass("hidden");
		}, function() {
			// 鼠标移出菜单区域时隐藏背景色块
			$("#menuBG").addClass("hidden");
		});
		$(".menuItem").on({
			// 菜单点击事件
			click : function() {
				// 清除页面上所有的selted样式
				$(".selted").removeClass("selted");
				$(".hand").addClass("hidden");
				// 给当前被点击的子元素添加样式
				$(this).find(".option").addClass("selted");
				$(this).find(".hand").removeClass("hidden");
			},
			// 鼠标进入菜单项
			mouseenter : function() {
				// 获取当前元素在兄弟元素中排名索引
				var index = $(this).index();
				// 修改背景色div的top样式
				if (util.isLTIE10()) {
					$("#menuBG").animate({
						top : index * 54
					}, 30);
				} else {
					$("#menuBG").css("top", (index * 54));
				}
			}
		});
		// 选中文件，显示按钮
		$("input[type='checkbox']").change(function() {
			showBtns();
		});
		// 上传提交
		$("input[type='file']").change(function() {
			$("form").submit();
		});
		// 文件重命名
		$("#btnUpdate").click(function() {
			if ($("input:checkbox:checked").length != 1) {
				return;
			} else {
				$("input:checkbox:checked").next().next().removeClass("hidden");
				$("input:checkbox:checked").next().addClass("hidden");
				$("input:checkbox:checked").parent().find(".new-chk ").removeClass("hidden");
			}
		});
		// checkbox勾选
		$(".lblRM").click(function() {
			if ($(this).find(".fileName").hasClass("hidden")) {
				return;
			} else {
				if ($(this).find("input:checkbox").attr('checked')) {
					$(this).find(".fa-check-square-o").removeClass("hidden");
					$(this).find(".fa-square-o").addClass("hidden");
				} else {
					$(this).find(".fa-check-square-o").addClass("hidden");
					$(this).find(".fa-square-o").removeClass("hidden");
				}
			}
		});
		// 重命名确认
		$(".fa-check").click(function() {
			var updateId = $(this).parent().parent().find(".chkRM").attr("id");
			var newName = $(this).parent().parent().find(".reName").val();
			var t = $(this);
			$.post("updateFileName.action", {
				id : updateId,
				fileName : newName
			}, function(json) {
				if (json.isSuccess == "false") {
					alert(json.errMsg);
				} else if (json.isSuccess == "true") {
					reloadFileList();
				}
			});
		});
		// 重命名取消
		$(".fa-times").click(function() {
			$(this).parent().prev().prev().removeClass("hidden");
			$(this).parent().prev().addClass("hidden");
			$(this).parent().addClass("hidden");
		});
		// 更换页面背景
		var xDialog = new XDialog({
			renderTo : "#xDialogIn"
		});
		$("body").click(function(event) {
			xDialog.hide();
		});
		$("#changeBG").click(function(event) {
			event.stopPropagation();
			xDialog.show({
				title : "选择皮肤",
				url : "jsp/diskSystem/background.jsp",
				bottom : "true",
				width : "40%",
				height : util.isLTIE10() ? 500 : 400
			});
		});
		// 退出
		$("#btnExit").click(function() {
			// 调用后台方法清空session中的user标记
			$.post("exit.action", function(json) {
				if (json.isSuccess == "true")
					location.href = $("base").attr("href") + "jsp/login.jsp";
			});
		});
		// 个人资料修改
		$("#personalData").click(function() {
			location.href = $("base").attr("href") + "jsp/center.jsp";
		});

	}
};
// 上传文件
function postGoodsInfo(allFileNameStr) {
	$.post("addFile.action", {
		fileName : allFileNameStr.split(",")[0],
		fileSize : allFileNameStr.split(",")[1],
		fileType : allFileNameStr.split(",")[2]
	}, function(json) {
		if (json.isSuccess == "true") {
			$("#dialog-upload").removeClass("hidden");
			$("#dialog-upload").dialog({
				modal : true,
				buttons : {
					Ok : function() {
						$(this).dialog("close");
					}
				}
			});
			reloadFileList();
		} else {
			alert(json.errMsg);
		}
	});
}
// 文件选中后显示分享+下载+删除+重命名按钮
function showBtns() {
	if ($("input:checkbox:checked").length > 0) {
		if (util.isLTIE10()) {
			$(".btnMenu").removeClass("hidden");
		} else {
			$(".btnMenu").removeClass("hidden");
			setTimeout(function() {
				$("#share").css("transform", "scale(1,1)");
			}, 200);
			setTimeout(function() {
				$("#download").css("transform", "scale(1,1)");
			}, 250);
			setTimeout(function() {
				$("#btnDel").css("transform", "scale(1,1)");
			}, 300);
			setTimeout(function() {
				$("#btnUpdate").css("transform", "scale(1,1)");
			}, 350);
		}
	} else {
		if (util.isLTIE10()) {
			$(".btnMenu").addClass("hidden");
		} else {
			// $(".btnMenu").css("transform", "scale(0,0)");
			setTimeout(function() {
				$("#share").css("transform", "scale(0,0)");
			}, 200);
			setTimeout(function() {
				$("#download").css("transform", "scale(0,0)");
			}, 250);
			setTimeout(function() {
				$("#btnDel").css("transform", "scale(0,0)");
			}, 300);
			setTimeout(function() {
				$("#btnUpdate").css("transform", "scale(0,0)");
			}, 350);
			setTimeout(function() {
				$(".btnMenu").addClass("hidden");
			}, 400);
		}
	}
}
// 重新加载文件信息
function reloadFileList() {
	var con = "";
	var userId = location.search.split("=")[1];
	if (userId != "") {
		con += " USERID ='" + $("#shopName").attr("userId") + "' AND ";
	}
	con = "WHERE" + con + "1=1";
	$("#fileList").html("");
	filesInfo.init({
		renderTo : "#fileList",
		dataSource : "getFilesByPage.action",
		ajaxData : {
			condition : con
		}
	});
}
// 搜索框
function loadFileBySearch() {
	// $("#fileList").html("");
	var con = "";
	var txtSltFile = $("#searchBox").val();
	if (txtSltFile != "")
		con += "USERID ='" + $("#shopName").attr("userId") + "' AND FILENAME LIKE '%" + txtSltFile + "%' OR F.CREATETIME LIKE '%" + txtSltFile + "%' AND ";
	con = "WHERE " + con + " 1=1";
	filesInfo.init({
		renderTo : "#fileList",
		dataSource : "getFilesByPage.action",
		ajaxData : {
			condition : con
		}
	});
}
function updateSize() {
	$("#tableDiv").height($(window).height() - 200);
}