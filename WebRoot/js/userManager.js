$(function() {
	// 调用下拉菜单的初始化方法，传入json对象
	ddl.init({
		renderTo : "#select_container",
		mapping : {
			key : "id",
			value : "name"
		},
		dataSource : "data/sexData.txt",
		defaultSelected : -1,
		defaultItems : [ {
			id : "-1",
			name : "全部"
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
		top.dialog.show({
			title : "用户添加",
			url : "jsp/dialog/addUser.jsp",
			width : 600,
			height : 485
		});
	});

	$("#btnDel").click(function() {
		if ($(this).hasClass("unClick")) {
			return;
		} else {
			top.dialog.show({
				title : "用户删除",
				url : "jsp/dialog/delUser.jsp",
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
	var name = $("#name").val();
	if (name != "") {
		con += "NAME LIKE '%" + name + "%' AND ";
	}
	var sex = $("#select_container .ddlItemSelected").attr("key");
	if (sex != "-1") {
		if (sex == "1") {
			sex = "男";
		} else {
			sex = "女";
		}
		con += "SEX = '" + sex + "' AND ";
	}
	var loginName = $("#loginName").val();
	if (loginName != "") {
		con += "LOGINNAME LIKE '%" + loginName + "%' AND ";
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
			name : "登录名",
			alias : "loginName",
		}, {
			name : "密码",
			alias : "pwd",
		}, {
			name : "昵称",
			alias : "name",
		}, {
			name : "性别",
			alias : "sex",
			formatter : function(cellValue) {
				if (cellValue == "男") {
					cellValue = "<div class='boy' sex='1' >♂&nbsp;" + cellValue + "</div>";
				} else {
					cellValue = "<div class='girl' sex='0'>♀&nbsp;" + cellValue + "</div>";
				}
				return cellValue;
			}
		}, {
			name : "金钱",
			alias : "money",
			align : "right",
			formatter : function(cellValue) {
				var html = "";
				html += util.number.money(cellValue);
				return html;
			}
		}, {
			name : "创建时间",
			alias : "createTime",
			align : "center"
		}, {
			name : "头像",
			alias : "face",
			align : "center",
			formatter : function(cellValue) {
				var html = "";
				html += "<img class='userFace' src='img/" + cellValue + "'/>";
				return html;
			}
		} ],
		ajaxData : {
			condition : con
		},
		dataSource : "getAllUserByPage.action",
		onClickRow : function(flag) {
			if ($(".selectRow").length > 0) {
				$(".unClick").removeClass("unClick");
			} else {
				$("#btnDel,#btnEdit").addClass("unClick");
			}
		},
		onPageChange : function() {
			$("#btnDel,#btnEdit").addClass("unClick");
		}
	});
}
