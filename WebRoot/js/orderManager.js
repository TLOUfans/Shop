$(function() {
	// 调用下拉菜单的初始化方法，传入json对象
	ddl.init({
		renderTo : "#statusDdl",
		mapping : {
			key : "key",
			value : "value"
		},
		dataSource : [ {
			key : 0,
			value : "失效"
		}, {
			key : 1,
			value : "待付款"
		}, {
			key : 2,
			value : "待收货"
		}, {
			key : 3,
			value : "待评价"
		} , {
			key : 4,
			value : "已完成"
		}],
		defaultSelected : -1,
		defaultItems : [ {
			key : "-1",
			value : "请选择"
		} ]
	});

	ddl.init({
		renderTo : "#payWayDdl",
		mapping : {
			key : "key",
			value : "value"
		},
		dataSource : [ {
			key : 1,
			value : "在线支付"
		}, {
			key : 2,
			value : "货到付款"
		}, {
			key : 3,
			value : "白条支付"
		}, {
			key : 4,
			value : "微信支付"
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
				url : "jsp/dialog/delOrder.jsp",
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
	var orderNum = $("#orderNum").val();
	if (orderNum != "") {
		con += "ORDERNUM = " + orderNum + " AND ";
	}
	var sellerName = $("#sellerName").val();
	if (sellerName != "") {
		con += "USERNAME LIKE '%" + sellerName + "%' AND ";
	}
	var status = $("#statusDdl .ddlItemSelected").attr("key");
	if (status != "-1") {
		con += "STATUS = '" + status + "' AND ";
	}
	var payWay = $("#payWayDdl .ddlItemSelected").text();
	if (payWay != "请选择") {
		con += "PAYWAY = '" + payWay + "' AND ";
	}
	con = "WHERE " + con + " 1=1";
	// 调用生成表格的初始化方法，传入json对象
	grid.init({
		renderTo : "#gird_container",
		column : [ {
			name : "订单id",
			alias : "id",
			hide : "true"
		}, {
			name : "订单编号",
			alias : "orderNum",
			align : "right",
		}, {
			name : "商品id",
			alias : "goodsList",
			hide : "true",
			formatter : function(cellValue) {
				html = "";
				$(cellValue).each(function() {

				});
				return html;
			}
		}, {
			name : "商品",
			alias : "orderGoodsList",
			formatter : function(cellValue) {
				var html = "";
				$(cellValue).each(function() {
					html += "<div style='overflow:hidden;padding: 3px 0;'>";
					html += "<div style='float:left;'><img src='img/" + this.goods.smImgs[0].url + "' width='50px'/></div>";
					html += "<div style='float:left;margin:13px 0px 21px 60px;'>x" + this.goodsNum + "</div>";
					html += "</div>";
					html += "<div style='margin-bottom:5px;font-size:13px;'>" + this.goods.name + "</div>";
				});
				return html;
			}
		}, {
			name : "状态",
			alias : "status",
			align : "center",
			formatter : function(cellValue) {
				var html = "";
				if (cellValue == 1) {
					html += "<span>待付款</span>";
				} else if (cellValue == 2) {
					html += "<span>待收货 </span>";
				} else if (cellValue == 3) {
					html += "<span>待评价 </span>";
				} else if (cellValue == 0) {
					html += "<span>失效订单 </span>";
				} else if (cellValue == 4) {
					html += "<span>已完成 </span>";
				}
				return html;
			}
		}, {
			name : "付款方式",
			alias : "payWay",
			align : "center",
		}, {
			name : "总价",
			alias : "totalMoney",
			align : "right",
			formatter : function(cellValue) {
				var html = "";
				html += "<span>" + util.number.money(cellValue) + "</span>";
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
		}, {
			name : "开始时间",
			alias : "beginTime",
			align : "center"
		}, {
			name : "结束时间",
			alias : "endTime",
			align : "center",
			formatter : function(cellValue) {
				var html = "";
				if (cellValue == null) {
					html += "该订单还未完成";
				} else {
					html += cellValue;
				}
				return html;
			}
		} ],
		dataSource : "queryOrderByPage.action",
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
