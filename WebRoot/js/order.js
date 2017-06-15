var page = {
	pageSize : 10,
	pageNum : 2
};

$(function() {
	var userId = $(".navLogin").attr("userId");
	var con = " WHERE USERID='" + userId + "' AND 1=1";
	order.init({
		renderTo : "#orderContent",
		dataSource : "queryOrderByPage.action",
		ajaxData : {
			condition : con
		},
		onLoad : function() {
			dialog.init();
		}
	});
});

var order = {
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
		order.getDataByDataSource(args);
	},
	reload : function(renderTo, pageSize, pageNum) {
		var args = $(renderTo).data("args");
		args.ajaxData.pageNum = pageNum;
		args.ajaxData.pageSize = pageSize;
		order.init(args);
	},
	getDataByDataSource : function(args) {
		if (typeof args.dataSource == "string") {
			$.ajax({
				url : args.dataSource,
				type : "POST",
				dataType : "text",
				data : args.ajaxData,
				success : function(json) {
					var obj = eval("(" + json + ")");
					args.data = obj;
					order.build(args);
				}
			});
		} else {
			args.data = args.dataSource;
			order.build(args);
		}
	},
	build : function(args) {
		var renderTo = args.renderTo;
		$(renderTo).html("");
		var orderGrid = $("<table cellpadding='0' cellspacing='0' id='orderGrid'></table>").appendTo(renderTo);
		var thead = $("<thead></thead>").appendTo(orderGrid);
		var tr = $("<tr></tr>").appendTo(thead);
		$("<th class='orderGridTh' width='620px'>订单详情</th>").appendTo(tr);
		$("<th class='orderGridTh' width='150px'>收货人</th>").appendTo(tr);
		$("<th class='orderGridTh' width='150px'>金额</th>").appendTo(tr);
		$("<th class='orderGridTh' width='150px'>状态</th>").appendTo(tr);
		$("<th class='orderGridTh'>操作</th>").appendTo(tr);
		// 遍历
		$(args.data.rows).each(function(index, t) {
			var tbody = $("<tbody class='orderBody'></tbody>").appendTo(orderGrid);
			$("<tr><td class='blankRow' colspan='5'></td></tr>").appendTo(tbody);
			var tr2 = $("<tr></tr>").appendTo(tbody);
			var titleTd = $("<td class='titleTd' colspan='5'></td>").appendTo(tr2);
			$("<span class='beginTime'>" + this.beginTime + "</span>").appendTo(titleTd);
			$("<span class='orderNumTxt'>订单号： </span>").appendTo(titleTd);
			$("<span class='orderNum' orderId='" + this.id + "'>" + this.orderNum + "</span>").appendTo(titleTd);
			$("<span class='delTxt'>删除</span>").appendTo(titleTd);
			// 遍历
			var firstTr;
			var obj = t;
			$(this.orderGoodsList).each(function(i, o) {
				var tr3 = $("<tr></tr>").appendTo(tbody);
				if (i == 0) {
					firstTr = tr3;
				}
				var orderTd = $("<td class='orderTd'></td>").appendTo(tr3);
				var goodsContainer = $("<div class='goodsContainer'></div>").appendTo(orderTd);
				var goodsImg = $("<div class='goodsImg'></div>").appendTo(goodsContainer);
				$("<img src='img/" + this.goods.smImgs[0].url + "' alt='' />").appendTo(goodsImg);
				$("<div class='goodsName' price='" + this.goods.price + "' goodsNum='" + this.goodsNum + "'><a href='jsp/goodsDes.jsp?goodsId=" + this.goods.id + "' target='_blank'>" + this.goods.name + "</a></div>").appendTo(goodsContainer);
				$("<div class='goodsNum'>x" + this.goodsNum + "</div>").appendTo(goodsContainer);
				$("<div class='sellerName' sellerId='" + this.seller.id + "'>商家：" + this.seller.name + "</div>").appendTo(goodsContainer);
			});
			var receiverTd = $("<td class='orderTd' rowspan='" + obj.orderGoodsList.length + "'></td>").appendTo(firstTr);
			var receiver = $("<div class='receiver' title='" + this.address.area + "'>" + this.address.receiver + "</div>").appendTo(receiverTd);
			var userAddressInfo = $("<div class='userAddressInfo hidden'></div>").appendTo(receiver);
			$("<div class='receiverInfo'>" + this.address.receiver + "</div>").appendTo(userAddressInfo);
			$("<div class='areaInfo'>" + this.address.area + " " + this.address.areaDes + "</div>").appendTo(userAddressInfo);
			$("<div class='telrInfo'>" + this.address.tel + "</div>").appendTo(userAddressInfo);
			$("<td class='orderTd' rowspan='" + obj.orderGoodsList.length + "' ><div class='totalMoney' totalMoney='" + this.totalMoney + "'>总额 " + util.number.money(this.totalMoney) + "</div><div class='payWay'>" + this.payWay + "</div></td>").appendTo(firstTr);
			var status;
			var btn;
			if (this.status == 1) {
				status = "待付款";
				btn = $("<input type='button' value='付款' class='confirmBtn payBtn'/>");
			} else if (this.status == 2) {
				status = "待收货";
				btn = $("<input type='button' value='确认收货' class='confirmBtn receiveBtn'/>");
			} else if (this.status == 3) {
				status = "待评价";
				btn = $("<input type='button' value='评价晒单' class='confirmBtn commentBtn'/>");
			} else if (this.status == 4) {
				status = "已完成";
				btn = $("<input type='button' value='已完成' class='confirmBtn'/>");
			}
			$("<td class='orderTd' rowspan='" + obj.orderGoodsList.length + "'><div class='status'>" + status + " </div></td>").appendTo(firstTr);
			var opeartionTd = $("<td class='orderTd' rowspan='" + obj.orderGoodsList.length + "'></td>").appendTo(firstTr);
			var confirm = $("<div class='confirm'></div>").appendTo(opeartionTd);
			btn.appendTo(confirm);
		});
		// 分页
		var pagerTable = $("<table class='pagerTable' cellpadding='0' cellspacing='0'></table>").appendTo(args.renderTo);
		var pagerTr = $("<tr></tr>").appendTo(pagerTable);
		var html = "";
		html += "<td width='100'>共<span class='itemCount'>" + args.data.total + "</span>项</td>";
		html += "<td width='70'>每页显示</td>";
		html += "<td width='80'><div class='pagerDdl'></div></td><td>项</td>";
		html += "<td width='80'><div class='pagePrev pagerBtn'>上一页</div></td>";
		html += "<td width='80' style='text-align:center;'><span class='currentPage'>" + args.ajaxData.pageNum + "</span>/<span class='totalPage'>" + Math.ceil(args.data.total / args.ajaxData.pageSize) + "</span></td>";
		html += "<td width='80'><div class='pageNext pagerBtn'>下一页</div></td>";
		$(pagerTr).html(html);
		if (args.onLoad != null && $.isFunction(args.onLoad)) {
			args.onLoad();
		}
		order.eventBind(args);
	},
	eventBind : function(args) {
		var renderTo = args.renderTo;
		if(util.isMobile()) {
			$(".orderGridTh[width]").removeAttr("width");
		}
		$(window).scroll(function(){
			if(util.isMobile()) {
				if ($("body").hasClass("waiting")) {
					return;
				}
				if (order.checkscrollside("orderBody")) {
					$("body").addClass("waiting");
					var userId = $(".navLogin").attr("userId");
					var con = " WHERE USERID='" + userId + "' AND STATUS=" + $(".selectTitle").attr("tag") + " AND 1=1";
					if ($(".selectTitle").attr("tag") == 0) {
						var con = " WHERE USERID='" + userId + "' AND 1=1";
					}
					page.condition = con;
					$.post(args.dataSource, page, function(json) {
						var jsonObj = json;
						if (jsonObj.rows.length > 0) {
							page.pageNum++;
						}
						$(jsonObj.rows).each(function(index, t) {
							var tbody = $("<tbody class='orderBody'></tbody>").appendTo(orderGrid);
							$("<tr><td class='blankRow' colspan='5'></td></tr>").appendTo(tbody);
							var tr2 = $("<tr></tr>").appendTo(tbody);
							var titleTd = $("<td class='titleTd' colspan='5'></td>").appendTo(tr2);
							$("<span class='beginTime'>" + this.beginTime + "</span>").appendTo(titleTd);
							$("<span class='orderNumTxt'>订单号： </span>").appendTo(titleTd);
							$("<span class='orderNum' orderId='" + this.id + "'>" + this.orderNum + "</span>").appendTo(titleTd);
							$("<span class='delTxt'>删除</span>").appendTo(titleTd);
							// 遍历
							var firstTr;
							var obj = t;
							$(this.orderGoodsList).each(function(i, o) {
								var tr3 = $("<tr></tr>").appendTo(tbody);
								if (i == 0) {
									firstTr = tr3;
								}
								var orderTd = $("<td class='orderTd'></td>").appendTo(tr3);
								var goodsContainer = $("<div class='goodsContainer'></div>").appendTo(orderTd);
								var goodsImg = $("<div class='goodsImg'></div>").appendTo(goodsContainer);
								$("<img src='img/" + this.goods.smImgs[0].url + "' alt='' />").appendTo(goodsImg);
								$("<div class='goodsName' price='" + this.goods.price + "' goodsNum='" + this.goodsNum + "'><a href='jsp/goodsDes.jsp?goodsId=" + this.goods.id + "' target='_blank'>" + this.goods.name + "</a></div>").appendTo(goodsContainer);
								$("<div class='goodsNum'>x" + this.goodsNum + "</div>").appendTo(goodsContainer);
								$("<div class='sellerName' sellerId='" + this.seller.id + "'>商家：" + this.seller.name + "</div>").appendTo(goodsContainer);
							});
							var receiverTd = $("<td class='orderTd' rowspan='" + obj.orderGoodsList.length + "'></td>").appendTo(firstTr);
							var receiver = $("<div class='receiver' title='" + this.address.area + "'>" + this.address.receiver + "</div>").appendTo(receiverTd);
							var userAddressInfo = $("<div class='userAddressInfo hidden'></div>").appendTo(receiver);
							$("<div class='receiverInfo'>" + this.address.receiver + "</div>").appendTo(userAddressInfo);
							$("<div class='areaInfo'>" + this.address.area + " " + this.address.areaDes + "</div>").appendTo(userAddressInfo);
							$("<div class='telrInfo'>" + this.address.tel + "</div>").appendTo(userAddressInfo);
							$("<td class='orderTd' rowspan='" + obj.orderGoodsList.length + "' ><div class='totalMoney' totalMoney='" + this.totalMoney + "'>总额 " + util.number.money(this.totalMoney) + "</div><div class='payWay'>" + this.payWay + "</div></td>").appendTo(firstTr);
							var status;
							var btn;
							if (this.status == 1) {
								status = "待付款";
								btn = $("<input type='button' value='付款' class='confirmBtn payBtn'/>");
							} else if (this.status == 2) {
								status = "待收货";
								btn = $("<input type='button' value='确认收货' class='confirmBtn receiveBtn'/>");
							} else if (this.status == 3) {
								status = "待评价";
								btn = $("<input type='button' value='评价晒单' class='confirmBtn commentBtn'/>");
							} else if (this.status == 4) {
								status = "已完成";
								btn = $("<input type='button' value='已完成' class='confirmBtn'/>");
							}
							$("<td class='orderTd' rowspan='" + obj.orderGoodsList.length + "'><div class='status'>" + status + " </div></td>").appendTo(firstTr);
							var opeartionTd = $("<td class='orderTd' rowspan='" + obj.orderGoodsList.length + "'></td>").appendTo(firstTr);
							var confirm = $("<div class='confirm'></div>").appendTo(opeartionTd);
							btn.appendTo(confirm);
						});
						setTimeout(function() {
							$("body").removeClass("waiting");
						}, 2000);
					});
				}
			}
		});
		var xddl = new XDDL({
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
				order.reload(args.renderTo, $(".ddl .ddlItemSelected", args.renderTo).attr("key"), 1);
			}
		});
		$(".smallImgArea", renderTo).click(function() {
			var url = $(this).children().attr("url");
			$(this).parent(".smallImgAreaParent").prev().children().attr("src", url);
			$(".smallImgArea", $(this).parent()).removeClass("smallImgSelect");
			$(this).addClass("smallImgSelect");
		});
		$(".product", renderTo).hover(function() {
			$(this).addClass("touch");
		}, function() {
			$(this).removeClass("touch");
		});
		$(".largeImgArea", renderTo).click(function() {
			location.href = "jsp/goodsDes.jsp?goodsId=" + $(this).parent().attr("url");
		});
		$(".pageNext", args.renderTo).click(function() {
			var currentPage = $(".currentPage", args.renderTo).text();
			var maxPage = $(".totalPage").text();
			var page = +currentPage + 1;
			page = page > maxPage ? maxPage : page;
			$(".currentPage", args.renderTo).text(page);
			order.reload(args.renderTo, $(".ddl .ddlItemSelected", $(args.renderTo)).attr("key"), page);
		});
		$(".pagePrev", args.renderTo).click(function() {
			var currentPage = $(".currentPage", args.renderTo).text();
			var page = +currentPage - 1;
			page = page < 1 ? 1 : page;
			$(".currentPage", args.renderTo).text(page);
			order.reload(args.renderTo, $(".ddl .ddlItemSelected", $(args.renderTo)).attr("key"), page);
		});
		// 切换选项
		$(".orderStatusTitle").on("click", function() {
			$(".orderStatusTitle").removeClass("selectTitle");
			$(this).addClass("selectTitle");
			var userId = $(".navLogin").attr("userId");
			var con = " WHERE USERID='" + userId + "' AND STATUS=" + $(this).index() + " AND 1=1";
			if ($(this).index() == 0) {
				var userId = $(".navLogin").attr("userId");
				var con = " WHERE USERID='" + userId + "' AND 1=1";
			}
			$(".orderStatusTitle").unbind("click");
			order.init({
				renderTo : "#orderContent",
				dataSource : "queryOrderByPage.action",
				ajaxData : {
					condition : con
				}
			});
		});
		$(".receiver").hover(function() {
			$(this).children().removeClass("hidden");
		}, function() {
			$(this).children().addClass("hidden");
		});
		// 付款对话框
		$(".payBtn").click(function() {
			$(".payBtn").removeClass("clickedBtn");
			$(this).addClass("clickedBtn");
			dialog.show({
				title : "付款",
				url : "jsp/dialog/payDialog.jsp",
				width : 380,
				height : 250
			});
		});
		// 收货按钮
		$(".receiveBtn").click(function() {
			var id = $(this).parent().parent().parent().parent().find(".orderNum").attr("orderId");
			$.post("updateOrder.action", {
				id : id,
				status : 3
			}, function(json) {
				if (json.isSuccess == "true") {
					var userId = $(".navLogin").attr("userId");
					var con = " WHERE USERID='" + userId + "' AND STATUS=3 AND 1=1";
					top.$(".selectTitle").removeClass("selectTitle");
					top.$(".orderStatusTitle:eq(3)").addClass("selectTitle");
					order.init({
						renderTo : "#orderContent",
						dataSource : "queryOrderByPage.action",
						ajaxData : {
							condition : con
						}
					});
				} else {
					alert(json.errMsg);
				}
			});
		});
		// 评价按钮
		$(".commentBtn").click(function() {
			if (navigator.userAgent.indexOf("MSIE") > -1 || navigator.userAgent.indexOf("rv:11") > -1) {
				location.href = "comment.jsp?orderId=" + $(this).parents("tbody").find(".orderNum").attr("orderId");
			} else {
				location.href = "jsp/comment.jsp?orderId=" + $(this).parents("tbody").find(".orderNum").attr("orderId");
			}
		});
		$("#dialogMask").height($("body").height());
		document.documentElement.style.overflowY = 'scroll';
	},
	checkscrollside : function(clsName) {
		var $lastBox = $('.' + clsName).last();
		lastBoxH = $lastBox.offset().top - $lastBox.height() / 2;
		scrollTop = $(window).scrollTop();
		bodyH = $("body").scrollTop() + 100;
		return lastBoxH < bodyH ? true : false;
	}
};