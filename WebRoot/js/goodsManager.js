$(function() {
	// 调用下拉菜单的初始化方法，传入json对象
	ddl.init({
		renderTo : "#select_container",
		mapping : {
			key : "id",
			value : "menu"
		},
		dataSource : "getTypeMenu.action",
		defaultSelected : -1,
		defaultItems : [ {
			id : "-1",
			menu : "全部"
		} ],
		onLoad : function() {
			loadGrid();
		}
	});
	ddl.init({
		renderTo : "#numDdl",
		dataSource : [ {
			key : ">",
			value : "大于"
		}, {
			key : "=",
			value : "等于"
		}, {
			key : "<",
			value : "小于"
		} ],
		defaultSelected : -1,
		defaultItems : [ {
			key : "-1",
			value : "请选择"
		} ]
	});
	ddl.init({
		renderTo : "#priceDdl",
		dataSource : [ {
			key : ">",
			value : "大于"
		}, {
			key : "=",
			value : "等于"
		}, {
			key : "<",
			value : "小于"
		} ],
		defaultSelected : -1,
		defaultItems : [ {
			key : "-1",
			value : "请选择"
		} ]
	});
	ddl.init({
		renderTo : "#salesDdl",
		dataSource : [ {
			key : ">",
			value : "大于"
		}, {
			key : "=",
			value : "等于"
		}, {
			key : "<",
			value : "小于"
		} ],
		defaultSelected : -1,
		defaultItems : [ {
			key : "-1",
			value : "请选择"
		} ]
	});

	$("#btnFind").click(function() {
		// 生成表格
		loadGrid();
	});

	$("#btnAdd").click(function() {
		top.dialog.show({
			title : "商品添加",
			url : "jsp/dialog/addGoods.jsp",
			width : 950,
			height : 600
		});
	});
	$("#btnDel").click(function() {
		if ($(this).hasClass("unClick")) {
			return;
		} else {
			top.dialog.show({
				title : "商品删除",
				url : "jsp/dialog/delGoods.jsp",
				width : 380,
				height : 280
			});
		}
	});
	$("#btnEdit").click(function() {
		if ($(this).hasClass("unClick")) {
			return;
		} else {
			var tr = $("#grid .selectRow");
			var editObj = {};
			$("td", tr).each(function() {
				var alias = $(this).attr("alias");
				editObj[alias] = $(this).attr("originalvalue");
				top.editObj = editObj;
			});
			top.dialog.show({
				title : "编辑商品",
				url : "jsp/dialog/editGoods.jsp",
				width : 950,
				height : 600
			});
		}
	});
});

function loadGrid() {
	var con = "";
	var goodsName = $("#goodsName").val();
	if (goodsName != "") {
		con += "G.NAME LIKE '%" + goodsName + "%' AND ";
	}
	var type = $("#select_container .ddlItemSelected").attr("key");
	if (type != "-1") {
		con += "T.ID = '" + type + "' AND ";
	}
	var userName = $("#userName").val();
	if (userName != "") {
		con += "U.NAME LIKE '%" + userName + "%' AND ";
	}
	var price = $("#price").val();
	var priceKey = $("#priceDdl .ddlItemSelected").attr("key");
	if (priceKey != "-1" && price != "") {
		con += "PRICE " + priceKey + " '" + price + "' AND ";
	}
	var num = $("#num").val();
	var numKey = $("#numDdl .ddlItemSelected").attr("key");
	if (numKey != "-1" && num != "") {
		con += "G.NUM" + numKey + " '" + num + "' AND ";
	}
	var sales = $("sales").val();
	var salesKey = $("#salesDdl .ddlItemSelected").attr("key");
	if (salesKey != "-1" && sales != "") {
		con += "G.SALES" + salesKey + " '" + sales + "' AND ";
	}
	con = "WHERE " + con + " 1=1";
	// 调用生成表格的初始化方法，传入json对象
	grid.init({
		renderTo : "#gird_container",
		column : [ {
			name : "商品编号",
			alias : "id",
			hide : "true"
		}, {
			name : "商品名",
			alias : "name",
			formatter : function(cellValue) {
				return cellValue;
			}
		}, {
			name : "价格",
			alias : "price",
			align : "right"
		}, {
			name : "描述",
			alias : "des",
			formatter : function(cellValue) {
				return cellValue;
			}
		}, {
			name : "商家Id",
			alias : "userId",
			hide : "true"
		}, {
			name : "商家",
			alias : "userName"
		}, {
			name : "库存",
			alias : "num",
			align : "right"
		}, {
			name : "月销量",
			alias : "sales",
			align : "right"
		}, {
			name : "评价",
			alias : "tate",
			align : "right",
			hide : "true"
		}, {
			name : "类别Id",
			alias : "typeId",
			hide : "true"
		}, {
			name : "类别名称",
			alias : "typeName"
		}, {
			name : "创建时间",
			alias : "createTime",
			align : "center"
		}, {
			name : "图片",
			alias : "smImgs",
			align : "center",
			formatter : function(cellValue) {
				var html = "";
				if (cellValue.length > 4) {
					for ( var i = 0; i < 4; i++) {
						html += "<img class='goodsImg' src='img/" + cellValue[i].url + "' url='img/" + cellValue[i].url + "'/>";
					}
				} else {
					$(cellValue).each(function(i, o) {
						html += "<img class='goodsImg' src='img/" + this.url + "' url='img/" + this.url + "'/>";
					});
				}
				return html;
			},
			originalValueFormatter : function(cellValue) {
				var arr = [];
				$(cellValue).each(function() {
					arr.push(this.url);
				});
				return arr.join(",");
			}
		} ],
		dataSource : "queryAllGoods.action",
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
		load : function() {
			$(".goodsImg").hover(function(event) {
				$(".imgArea").removeClass("hidden");
				$(".imgArea>img").attr("src", $(this).attr("url"));
				$(".imgArea").css("top", event.pageY - 100).css("left", event.pageX - 250);
			}, function() {
				$(".imgArea").addClass("hidden");
			});
		},
		onPageChange : function() {
			$("#btnDel,#btnEdit").addClass("unClick");
		}
	});
}
