$(function() {
	// 调用下拉菜单的初始化方法，传入json对象
	ddl.init({
		renderTo : "#starDdl",
		mapping : {
			key : "key",
			value : "value"
		},
		dataSource : [ {
			key : 1,
			value : "一星"
		}, {
			key : 2,
			value : "两星"
		}, {
			key : 3,
			value : "三星"
		}, {
			key : 4,
			value : "四星"
		}, {
			key : 5,
			value : "五星"
		} ],
		defaultSelected : -1,
		defaultItems : [ {
			key : "-1",
			value : "请选择"
		} ],
		onLoad : function() {
			// 生成表格
			loadGrid();
		}
	});

	$("#btnFind").click(function() {
		// 生成表格
		loadGrid();
	});
	
	$("#btnAdd").click(function() {
		if($(this).hasClass("unClick")) {
			return;
		}
		top.dialog.show({
			title : "用户添加",
			url : "jsp/dialog/addUser.jsp",
			width : 600,
			height : 485
		});
	}).addClass("unClick");
	$("#btnDel").click(function() {
		if ($(this).hasClass("unClick")) {
			return;
		} else {
			top.dialog.show({
				title : "评论删除",
				url : "jsp/dialog/delComment.jsp",
				width : 380,
				height : 280
			});
		}
	});
	$("#btnEdit").click(function() {
		if ($(this).hasClass("unClick")) {
			return;
		} else {
			top.dialog.show({
				title : "编辑用户",
				url : "jsp/dialog/editUser.jsp",
				width : 600,
				height : 485
			});
		}
	});
});

function loadGrid() {
	var con = "";
	var userName = $("#userName").val();
	if (userName != "") {
		con += "U.NAME LIKE '%" + userName + "%' AND ";
	}
	var grade = $("#starDdl .ddlItemSelected").attr("key");
	if (grade != "-1") {
		con += "C.GRADE = '" + grade + "' AND ";
	}
	var goodsName = $("#goodsName").val();
	if (goodsName != "") {
		con += "G.NAME LIKE '%" + goodsName + "%' AND ";
	}
	con = "WHERE " + con + " 1=1";
	// 调用生成表格的初始化方法，传入json对象
	grid.init({
		renderTo : "#gird_container",
		column : [ {
			name : "编号",
			alias : "id",
			hide : "true"
		}, {
			name : "商品",
			alias : "goods",
			formatter : function(cellValue) {
				var html = "";
				html += "<span id='" + cellValue.id + "'>" + cellValue.name + "</span>";
				return html;
			}
		}, {
			name : "内容",
			alias : "content"
		}, {
			name : "用户",
			alias : "user",
			formatter : function(cellValue) {
				var html = "";
				html += "<span id='" + cellValue.id + "'>" + cellValue.name + "</span>";
				return html;
			}
		}, {
			name : "星级",
			alias : "grade",
			align : "center",
			formatter : function(cellValue) {
				var html = "";
				for ( var i = 0; i < cellValue; i++) {
					html += "<span style='color:gold;'>★</span>";
				}
				return html;
			}
		}, {
			name : "用户头像",
			alias : "user",
			align : "center",
			formatter : function(cellValue) {
				var html = "";
				html += "<img src='img/" + cellValue.face + "' class='userFace'/>";
				return html;
			}
		}, {
			name : "创建时间",
			alias : "createTime",
			align : "center"
		} ],
		ajaxData : {
			condition : con
		},
		dataSource : "queryCommentByPage.action",
		onClickRow : function(flag) {
			if ($(".selectRow").length > 0) {
				$(".unClick").not("#btnEdit,#btnAdd").removeClass("unClick");
			} else {
				$("#btnDel,#btnEdit").addClass("unClick");
			}
		},
		onPageChange : function() {
			$("#btnDel,#btnEdit,#btnAdd").addClass("unClick");
		}
	});
}
