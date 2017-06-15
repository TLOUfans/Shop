var grid4Cart = {
	// 初始化函数
	init : function(args) {
		if (args.ajaxData == null) {
			args.ajaxData = {
				pageSize : 10,
				pageNum : 1
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
		grid4Cart.getDataByDataSource(args);
	},
	reload : function(renderTo, pageSize, pageNum) {
		var args = $(renderTo).data("args");
		if (pageSize) {
			args.ajaxData.pageNum = pageNum;
		}
		if (pageNum) {
			args.ajaxData.pageSize = pageSize;
		}
		grid4Cart.init(args);
	},
	// 获取数据
	getDataByDataSource : function(args) {
		// 判断传入的数据是否是数组
		if (typeof (args.dataSource) == "string") {
			$.ajax({
				url : args.dataSource,
				type : "POST",
				dataType : "text",
				data : args.ajaxData,
				success : function(json) {
					args.data = eval("(" + json + ")");
					grid4Cart.build(args);
				}
			});
			// 判断传入的数据是否是字符串
		} else {
			grid4Cart.build(args);
		}
	},
	// 拼接节点，根据传来的参数设置值
	build : function(args) {
		$(args.renderTo).html("");
		var table = $("<table class='grid' id='grid' cellpadding='0' cellspacing='0'></table>");
		var thead = $("<thead></thead>").appendTo(table);
		var count = 0;
		if (!util.isMobile()) {
			$(args.column).each(function(i3, col) {
				var th = $("<th class='gridTH'></th>").text(col.name).appendTo(thead);
				if (col.hide == "true") {
					th.addClass("hidden");
				}
			});
			$("<th class='gridTH'></th>").text("小计").appendTo(thead);
			$("<th class='gridTH'></th>").text("操作").appendTo(thead);
			if (args.data.rows.length == 0) {
				var tr = $("<tr class='gridTR'></tr>").appendTo(table);
				$("<td class='gridTD' style='text-align:center' colspan=" + $(args.column).length + 1 + ">购物车里空空如也,还不快去购物~</td>").appendTo(tr);
			}
			$(args.data.rows).each(function(i, row) {
				var tr = $("<tr class='gridTR' style='" + (1 / args.column.length + '%') + "'></tr>").appendTo(table);
				$(args.column).each(function(i2, col) {
					var cellValue = row[col.alias];
					var newValue = cellValue;
					if (col.formatter != null && $.isFunction(col.formatter)) {
						newValue = col.formatter(cellValue);
					}
					if (col.originalValueFormatter != null && $.isFunction(col.originalValueFormatter)) {
						cellValue = col.originalValueFormatter(cellValue);
					}
					var td = $("<td class='gridTD' alias='" + col.alias + "' originalValue='" + cellValue + "'>" + newValue + "</td>").appendTo(tr);
					if (col.hide == "true") {
						td.addClass("hidden");
					}
					if (col.align != null) {
						td.addClass("text" + col.align);
					}
				});
				$("<td class='gridTD textright fontWeight' isChecked='" + row.checked + "' num='" + row.goods.num + "'>" + util.number.money(row.goods.price.replace(",", "") * (row.goodsNum = row.goodsNum > 99 ? 99 : row.goodsNum)) + "</td>").appendTo(tr);
				$("<td class='gridTD textcenter'><span class='txtDel'>" + "删除" + "</span></td>").appendTo(tr);
			});
			table.appendTo(args.renderTo);
			if (args.load != null && $.isFunction(args.load)) {
				args.load();
			}
		} else {
			if (args.data.rows.length == 0) {
				var tr = $("<tr class='gridTR'></tr>").appendTo(table);
				$("<td class='gridTD' style='text-align:center' colspan=" + $(args.column).length + 1 + ">购物车里空空如也,还不快去购物~</td>").appendTo(tr);
			}
			$(args.data.rows).each(function(i, row) {
				var tr = $("<tr class='gridTR'></tr>").appendTo(table);
				$("<td class='gridTD hidden'>" + this.id + "</td>").appendTo(tr);
				var selectedTd;
				if (this.checked) {
					selectedTd = $("<td class='gridTD'><input type='checkbox' class='checkItem' checked='checked'/></td>").appendTo(tr);
				} else {
					$("<td class='gridTD'><input type='checkbox' class='checkItem'/></td>").appendTo(tr);
				}
				$("<td class='gridTD'><img class='goodsImg' src='img/" + this.goods.smImgs[0].url + "' url='img/" + this.goods.smImgs[0].url + "'/></td>").appendTo(tr);
				var gridTD = $("<td class='gridTD'><span class='txtGoodsName' goodsId='" + this.goods.id + "'>" + this.goods.name + "</span></td>").appendTo(tr);
				$("<span style='display:inline-block;margin-top:10px;'>￥" + this.goods.price.replace(/^\s\s*/, '').replace(/\s\s*$/, '') + "</span>").appendTo(gridTD);
				$("<div class='goodsNumArea' style='position:relative;float: right;margin-top:10px;'><span class='minusBtn'>-</span><input type='text' disabled value='" + this.goodsNum + "' class='goodsNumInput' maxlength='2'/><span class='addBtn'>+</span><div class='errNum hidden'>库存不足</div></div>").appendTo(gridTD);
				$("<td class='gridTD textright fontWeight hidden' isChecked='" + row.checked + "' num='" + row.goods.num + "'>" + util.number.money(row.goods.price.replace(",", "") * (row.goodsNum = row.goodsNum > 99 ? 99 : row.goodsNum)) + "</td>").appendTo(tr);
				$("<td class='gridTD textcenter hidden'><span class='txtDel'>" + "删除" + "</span></td>").appendTo(tr);
				if (selectedTd != null) {
					selectedTd.parent().find("td").css("background-color", "#FFF4E8");
				}
			});
			table.appendTo(args.renderTo);
			if (args.load != null && $.isFunction(args.load)) {
				args.load();
			}
		}
		var cartAccount = $("<div id='cartAccount'></div>").appendTo(args.renderTo);
		var cartAccountArea = $("<div id='cartAccountArea'></div>").appendTo(cartAccount);
		$("<span id='delSelectedGoods'>删除选中商品</span>").appendTo(cartAccountArea);
		$("<span id='selectedBoxFirst'>已选择</span>").appendTo(cartAccountArea);
		$("<span id='selectedGoodsNum'>&nbsp;0&nbsp;</span>").appendTo(cartAccountArea);
		$("<span id='selectedBoxLast'>件商品</span>").appendTo(cartAccountArea);
		$("<span id='totalMoneyTxt'>总价:</span>").appendTo(cartAccountArea);
		$("<span id='totalMoney'>￥0.00</span>").appendTo(cartAccountArea);
		$("<span id='goAccount'>去结算</span>").appendTo(cartAccount);
		if (args.onLoad != null && $.isFunction(args.onLoad)) {
			args.onLoad();
		}
		grid4Cart.eventBind(args);
	},
	eventBind : function(args) {
		ddl.init({
			renderTo : args.renderTo + " .pagerDdl",
			dataSource : [ {
				key : 10,
				value : 10
			}, {
				key : 20,
				value : 20
			}, {
				key : 30,
				value : 30
			}, {
				key : 40,
				value : 40
			}, {
				key : 50,
				value : 50
			} ],
			direction : "up",
			offset : -4,
			defaultSelected : args.ajaxData.pageSize,
			onClick : function() {
				// 回调
				grid4Cart.reload(args.renderTo, $(".pagerDdl .ddlItemSelected", args.renderTo).attr("key"), 1);
			}
		});
		$(window).resize(function() {
			if(!util.isIE()) {
				grid4Cart.init({
					renderTo : "#cartGrid",
					dataSource : "queryCartByUserId.action"
				});
			}
		});
		$(args.renderTo).children("table").first().find("tbody>tr").click(function() {
			var flag = true;
			if ($(this).hasClass("selectRow")) {
				$(this).removeClass("selectRow");
				flag = false;
			} else {
				$("tr", args.renderTo).removeClass("selectRow");
				$(this).addClass("selectRow");
				flag = true;
			}
			if (args.onClickRow != null && $.isFunction(args.onClickRow))
				args.onClickRow(flag);
		});
		$(args.renderTo).find("th:eq(3)").css("text-align", "right");
		$(args.renderTo).find("th:eq(4)").css("text-align", "center");
		$(args.renderTo).find("th:eq(5)").css("text-align", "right");
		$(args.renderTo).find("th:eq(6)").css("text-align", "center");
		if (!util.isMobile()) {
			$("<input type='checkbox' id='checkAll'>").prependTo("th:eq(1)", args.renderTo);
			$("<input type='checkbox' class='checkItem'>").prependTo($("#grid tr").find("td:eq(1)"));
		}
		$("#grid tr").find("td:eq(5)").each(function() {
			if ($(this).attr("isChecked") == 1) {
				$(this).parent().find("td:eq(1) input").prop("checked", true);
				$(this).parent().find("td").css("background-color", "#FFF4E8");
			}
		});
		$("#grid tr").find("td:eq(1)").css("text-align", "left");
		$("#checkAll").click(function() {
			if ($(this).prop("checked")) {
				$(".checkItem").prop("checked", true);
				$("#grid td").css("background-color", "#FFF4E8");
				$("#selectedGoodsNum").html("&nbsp;" + args.data.rows.length + "&nbsp;");
				var totalMoney = 0;
				$("#grid tr").find("td:eq(5)").each(function() {
					totalMoney += +$(this).text().replace(/[^0-9.]/ig, "");
				});
				$("#totalMoney").text(util.number.money(totalMoney));
				$(".checkItem").each(function() {
					$.post("updateCartGoodsNum.action", {
						goodsId : $(this).parent().next().find("span").attr("goodsId"),
						goodsNum : $(this).parent().parent().find("td:eq(4) input").val(),
						checked : 1
					}, function(json) {
						if (!json.isSuccess == "true") {
							alert(json.errMsg);
						}
					});
				});
			} else {
				$(".checkItem").prop("checked", false);
				$("#grid td").css("background-color", "#FFF");
				$("#selectedGoodsNum").html("&nbsp;" + 0 + "&nbsp;");
				$("#totalMoney").text("￥0.00");
				$(".checkItem").each(function() {
					$.post("updateCartGoodsNum.action", {
						goodsId : util.isMobile() ? $(this).parent().next().next().find("span").attr("goodsId") : $(this).parent().next().find("span").attr("goodsId"),
						goodsNum : util.isMobile() ? $(this).parent().next().next().find("input").val() : $(this).parent().parent().find("td:eq(4) input").val(),
						checked : 0
					}, function(json) {
						if (!json.isSuccess == "true") {
							alert(json.errMsg);
						}
					});
				});
			}
		});
		$(".minusBtn").click(function() {
			if ($(this).next().val() > 1) {
				$(this).next().val(+$(this).next().val() - 1);
				var newPrice = util.isMobile() ? +$(this).next().val() * +$(this).parent().prev().text().replace("￥", "").replace(",", "") : +$(this).next().val() * +$(this).parent().parent().prev().find("span").text().replace("￥", "").replace(",", "");
				$(this).parent().parent().next().text(util.number.money(newPrice));
				grid4Cart.getTotalNumAndMoney();
				var isChecked;
				if ($(this).parent().parent().parent().find("td:eq(1) input").prop("checked")) {
					isChecked = 1;
				} else {
					isChecked = 0;
				}
				$.post("updateCartGoodsNum.action", {
					goodsId : util.isMobile() ? $(this).parent().parent().find(".txtGoodsName").attr("goodsid") : $(this).parent().parent().parent().find("td:eq(2) span").attr("goodsId"),
					goodsNum : $(this).next().val(),
					checked : isChecked
				}, function(json) {
					if (!json.isSuccess == "true") {
						alert(json.errMsg);
					}
				});
				// 减少购买数量后后判断是否出现库存不足的情况
				$(".goodsNumInput").each(function() {
					var num = +$(this).parent().parent().next().attr("num");
					if (+$(this).val() <= num) {
						$(this).next().next().addClass("hidden");
					}
				});
			}
		});
		$(".addBtn").click(function() {
			if ($(this).prev().val() < 99) {
				if (+$(this).prev().val() < +$(this).parent().parent().next().attr("num")) {
					$(this).prev().val(+$(this).prev().val() + 1);
					var newPrice = util.isMobile() ? +$(this).prev().val() * +$(this).parent().prev().text().replace("￥", "").replace(",", "") : +$(this).prev().val() * +$(this).parent().parent().prev().find("span").text().replace("￥", "").replace(",", "");
					$(this).parent().parent().next().text(util.number.money(newPrice));
					grid4Cart.getTotalNumAndMoney();
					var isChecked;
					if ($(this).parent().parent().parent().find("td:eq(1) input").prop("checked")) {
						isChecked = 1;
					} else {
						isChecked = 0;
					}
					$.post("updateCartGoodsNum.action", {
						goodsId : util.isMobile() ? $(this).parent().parent().find(".txtGoodsName").attr("goodsid") : $(this).parent().parent().parent().find("td:eq(2) span").attr("goodsId"),
						goodsNum : $(this).prev().val(),
						checked : isChecked
					}, function(json) {
						if (!json.isSuccess == "true") {
							alert(json.errMsg);
						}
					});
				}
			}
		});
		$(".goodsNumInput").blur(function() {
			if ($(this).val() == "0") {
				$(this).val("1");
			}
			if ($(this).val() == "") {
				$(this).val("1");
			}
			if (+$(this).val() > +$(this).parent().parent().next().attr("num")) {
				$(this).val($(this).parent().parent().next().attr("num"));
			}
			var newPrice = +$(this).val() * +$(this).parent().parent().prev().find("span").text().replace("￥", "").replace(",", "");
			$(this).parent().parent().next().text(util.number.money(newPrice));
			grid4Cart.getTotalNumAndMoney();
			var isChecked;
			if ($(this).parent().parent().parent().find("td:eq(1) input").prop("checked")) {
				isChecked = 1;
			} else {
				isChecked = 0;
			}
			$.post("updateCartGoodsNum.action", {
				goodsId : $(this).parent().parent().parent().find("td:eq(2) span").attr("goodsId"),
				goodsNum : $(this).val(),
				checked : isChecked
			}, function(json) {
				if (!json.isSuccess == "true") {
					alert(json.errMsg);
				}
			});
			// 失去焦点后后后判断是否出现库存不足的情况
			$(".goodsNumInput").each(function() {
				var num = +$(this).parent().parent().next().attr("num");
				if (+$(this).val() > num) {
					$(this).next().next().removeClass("hidden");
				} else {
					$(this).next().next().addClass("hidden");
				}
			});
		});
		$(".goodsNumInput").keyup(function() {
			var regExp = new RegExp("^[0-9]*$");
			if (!regExp.test($("#countInput").val())) {
				$(this).val($(this).val().replace(/[^0-9]/ig, ""));
			}
			if ($("#countInput").val() == "0") {
				$(this).val("1");
			}
		});
		// 页面加载完毕后判断是否出现库存不足的情况
		$(".goodsNumInput").each(function() {
			var num = +$(this).parent().parent().next().attr("num");
			if (+$(this).val() > num) {
				$(this).next().next().removeClass("hidden");
			}
		});
		$(".checkItem").click(function() {
			if (!$(this).prop("checked")) {
				$(this).parent().parent().find("td").css("background-color", "#FFF");
				$.post("updateCartGoodsNum.action", {
					goodsId : util.isMobile() ? $(this).parent().next().next().find(".txtGoodsName").attr("goodsid") : $(this).parent().parent().find("td:eq(2) span").attr("goodsId"),
					goodsNum : util.isMobile() ? $(this).parent().next().next().find("input").val() : $(this).parent().parent().find("td:eq(4) input").val(),
					checked : 0
				}, function(json) {
					if (!json.isSuccess == "true") {
						alert(json.errMsg);
					}
				});
			} else {
				$(this).parent().parent().find("td").css("background-color", "#FFF4E8");
				$.post("updateCartGoodsNum.action", {
					goodsId : util.isMobile() ? $(this).parent().next().next().find(".txtGoodsName").attr("goodsid") : $(this).parent().parent().find("td:eq(2) span").attr("goodsId"),
					goodsNum : util.isMobile() ? $(this).parent().next().next().find("input").val() : $(this).parent().parent().find("td:eq(4) input").val(),
					checked : 1
				}, function(json) {
					if (!json.isSuccess == "true") {
						alert(json.errMsg);
					}
				});
			}
			grid4Cart.getTotalNumAndMoney();
		});
		$(".txtDel").click(function() {
			$(".txtDel").removeClass(".selectedDel");
			$(this).addClass("selectedDel");
			dialog.show({
				title : "删除",
				url : "jsp/dialog/delUserCart.jsp",
				width : 380,
				height : 220
			});
		});
		$("#delSelectedGoods").click(function() {
			if ($(".checkItem:checked").size() == 0) {
				alert("至少选择一个商品");
				return;
			}
			dialog.show({
				title : "删除选中商品",
				url : "jsp/dialog/delSelectCart.jsp",
				width : 380,
				height : 220
			});
		});
		grid4Cart.getTotalNumAndMoney();
		$(".txtGoodsName").click(function() {
			location.href = "jsp/goodsDes.jsp?goodsId=" + $(this).attr("goodsId");
		});
		$("#goAccount").click(function() {
			if ($(".checkItem:checked").size() == 0) {
				alert("至少选择一个商品");
				return;
			}
			var count = 0;
			$(".checkItem:checked").each(function() {
				if ($(this).parent().parent().find(".errNum").hasClass("hidden")) {
					count++;
				}
			});
			if (count != $(".checkItem:checked").size()) {
				alert("所选择的商品库存不足");
				return;
			}
			if (navigator.userAgent.indexOf("MSIE") > -1 || navigator.userAgent.indexOf("rv:11") > -1) {
				location.href = "balance.jsp";
			} else {
				location.href = "jsp/balance.jsp";
			}
		});
		$("#dialogMask").height($("body").height());
		$(".gridTH").width("140");
	},
	getTotalNumAndMoney : function() {
		var count = 0;
		var totalMoney = 0;
		$(".checkItem").each(function() {
			if ($(this).prop("checked")) {
				count++;
				totalMoney += util.isMobile() ? +$(this).parent().parent().find("td:eq(4)").text().replace(/[^0-9.]/ig, "") : +$(this).parent().parent().find("td:eq(5)").text().replace(/[^0-9.]/ig, "");
			}
		});
		$("#selectedGoodsNum").html("&nbsp;" + count + "&nbsp;");
		$("#totalMoney").text(util.number.money(totalMoney));
	}
};