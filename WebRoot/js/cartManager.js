$(function() {
	loadGrid();
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
				url : "jsp/dialog/delCart.jsp",
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
			name : "单价",
			alias : "goods",
			align : "right",
			formatter : function(cellValue) {
				var html = "";
				html += "<span>" + cellValue.price + "</span>";
				return html;
			}
		}, {
			name : "购买数量",
			alias : "goodsNum",
			align : "right"
		}, {
			name : "库存",
			alias : "goods",
			align : "right",
			formatter : function(cellValue) {
				var html = "";
				html += "<span>" + cellValue.num + "</span>";
				return html;
			}
		}, {
			name : "描述",
			alias : "goods",
			formatter : function(cellValue) {
				var html = "";
				html += "<span>" + cellValue.des + "</span>";
				return html;
			}
		}, {
			name : "商品图片",
			alias : "goods",
			align : "center",
			formatter : function(cellValue) {
				var html = "";
				if (cellValue.smImgs.length > 4) {
					for ( var i = 0; i < 4; i++) {
						html += "<img class='goodsImg' src='img/" + cellValue.smImgs[i].url + "' url='img/" + cellValue.smImgs[i].url + "'/>";
					}
				} else {
					$(cellValue.smImgs).each(function(i, o) {
						html += "<img class='goodsImg' src='img/" + this.url + "' url='img/" + this.url + "'/>";
					});
				}
				return html;
			}
		}, {
			name : "购买者",
			alias : "user",
			formatter : function(cellValue) {
				var html = "";
				html += "<span>" + cellValue.name + "</span>";
				return html;
			}
		} , {
			name : "加入时间",
			alias : "createTime"
		}],
		dataSource : "queryCartByPage.action",
		ajaxData : {
			condition : con
		},
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
