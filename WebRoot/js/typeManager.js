$(function() {
	// 调用下拉菜单的初始化方法，传入json对象
	ddl.init({
		renderTo : "#select_container",
		mapping : {
			key : "id",
			value : "no"
		},
		dataSource : "getTypeMenu.action",
		defaultSelected : -1,
		defaultItems : [ {
			id : "-1",
			no : "全部"
		} ],
		onLoad:function(){
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
			title : "添加类别",
			url : "jsp/dialog/addType.jsp",
			width : 600,
			height : 300
		});
	});
	$("#btnDel").click(function() {
		if ($(this).hasClass("unClick")) {
			return;
		} else {
			top.dialog.show({
				title : "删除类别",
				url : "jsp/dialog/delType.jsp",
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
				title : "编辑类别",
				url : "jsp/dialog/editType.jsp",
				width : 600,
				height : 280
			});
		}
	});
});

function loadGrid() {
	var con = "";
	var type = $("#type").val();
	if (type != "") {
		con += "MENU LIKE '%" + type + "%' AND ";
	}
	var no = $("#select_container .ddlItemSelected").text();
	if (no != "全部") {
		con += "NO = '" + no + "' AND ";
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
			name : "类别编号",
			alias : "no",
			align : "right"
		}, {
			name : "商品类别",
			alias : "menu",
		}, {
			name : "创建时间",
			alias : "createTime",
			align : "center"
		} ],
		dataSource : "getTypeMenuByPager.action",
		paging : [ {
			name : "首页"
		}, {
			name : "上一页"
		}, {
			name : "下一页"
		}, {
			name : "尾页"
		} ],
		page : {
			count : 100,
			pageSize : 10
		},
		ajaxData : {
			condition : con
		},
		onClickRow : function() {
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
