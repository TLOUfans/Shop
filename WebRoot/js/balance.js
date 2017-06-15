$(function() {
	var con = "";
	con += " AND C.CHECKED='1'";
	balance.init({
		renderTo : "#balanceArea",
		dataSource : "queryCartByUserId.action",
		ajaxData : {
			condition : con
		},
		onLoad : function() {
			dialog.init();
		}
	});
});

var balance = {
	init : function(args) {
		balance.getDataByDataSource(args);
	},
	getDataByDataSource : function(args) {
		if (typeof args.dataSource == "string") {
			$.ajax({
				url : args.dataSource,
				type : "POST",
				data : args.ajaxData,
				success : function(json) {
					args.data = json;
					if (args.data.total == 0) {
						location.href = "jsp/typeList.jsp";
					}
					balance.build(args);
				}
			});
		} else {
			args.data = args.dataSource;
			balance.build(args);
		}
	},
	build : function(args) {
		var renderTo = args.renderTo;
		$(renderTo).html("");
		$("<div id='balaceTitle'>结算页</div>").appendTo(renderTo);
		$("<div id='balaceLittleTitle'>填写并核对订单信息</div>").appendTo(renderTo);
		var receiverInfoContainer = $("<div id='receiverInfoContainer'></div>").appendTo(renderTo);
		var receiverInfoArea = $("<div id='receiverInfoArea' class='infoArea'></div>").appendTo(receiverInfoContainer);
		$("<div class='balanceTitle'>收货人信息<span id='addAddressBtn'>新增收货地址</span></div>").appendTo(receiverInfoArea);
		$(args.data.rows[0].user.addresses).each(function() {
			var receiverInfoDiv = $("<div class='receiverInfoDiv'></div>").appendTo(receiverInfoArea);
			var receiverInfoNameBorder = $("<div class='receiverInfoNameBorder'></div>").appendTo(receiverInfoDiv);
			$("<div class='receiverInfoName' addressId='" + this.id + "'>" + this.receiver + "</div>").appendTo(receiverInfoNameBorder);
			$("<div class='receiverInfo'>" + this.receiver + " <span>" + this.area + "</span> <span>" + this.areaDes + "</span> <span>" + this.tel + "</span><span class='delAddress hidden'>删除</span></div>").appendTo(receiverInfoDiv);
		});
		var payWayArea = $("<div id='payWayArea' class='infoArea'></div>").appendTo(receiverInfoContainer);
		$("<div class='balanceTitle'>支付方式</div>").appendTo(payWayArea);
		var payWayContainer = $("<div id='payWayContainer'></div>").appendTo(payWayArea);
		$("<div class='payWayBorder'><div class='payWay'>在线支付</div></div>").appendTo(payWayContainer);
		$("<div class='payWayBorder'><div class='payWay'>货到付款</div></div>").appendTo(payWayContainer);
		$("<div class='payWayBorder'><div class='payWay'>白条支付</div></div>").appendTo(payWayContainer);
		$("<div class='payWayBorder'><div class='payWay'>微信支付</div></div>").appendTo(payWayContainer);
		var inventoryArea = $("<div id='inventoryArea' class='infoArea'></div>").appendTo(receiverInfoContainer);
		$("<div class='balanceTitle'>送货清单</div>").appendTo(inventoryArea);
		var inventoryContainer = $("<div id='inventoryContainer'></div>").appendTo(inventoryArea);
		var dispatchArea = $("<div id='dispatchArea'></div>").appendTo(inventoryContainer);
		$("<div class='inventoryTitle'>配送方式</div>").appendTo(dispatchArea);
		$("<div id='express'>京西快递</div>").appendTo(dispatchArea);
		$("<div id='arriveTime'>到达时间：预计 " + util.date.afterSomeDay(1) + " 09:00-19:00 送达</div>").appendTo(dispatchArea);
		$("<div id='returnGoods'>退换无忧：15天内退换，可享1次上门取件</div>").appendTo(dispatchArea);
		var goodsInfoContainer = $("<div id='goodsInfoContainer'></div>").appendTo(inventoryContainer);
		// 遍历的地方
		var allCount = 0;
		$(args.data.rows).each(function() {
			var goodsInfoArea = $("<div class='goodsInfoArea'></div>").appendTo(goodsInfoContainer);
			$("<div class='inventoryTitle' sellerId='" + this.goods.userId + "'>商家：" + this.goods.userName + "</div>").appendTo(goodsInfoArea);
			var goodsInfoContent = $("<div class='goodsInfoContent'></div>").appendTo(goodsInfoArea);
			var goodsImg = $("<div class='goodsImg' cartId='" + this.id + "'></div>").appendTo(goodsInfoContent);
			$("<img src='img/" + this.goods.smImgs[0].url + "' alt='' />").appendTo(goodsImg);
			$("<div class='goodsName' goodsId='" + this.goods.id + "'>" + this.goods.name + "</div>").appendTo(goodsInfoContent);
			var goodsTxtContent = $("<div class='goodsTxtContent'></div>").appendTo(goodsInfoContent);
			$("<div class='goodsPrice' price='" + this.goods.price + "'>" + util.number.money(this.goods.price.replace(/[^0-9.]/ig, "")) + "</div>").appendTo(goodsTxtContent);
			$("<div class='goodsNum' goodsNum='" + this.goodsNum + "'>x" + this.goodsNum + "</div>").appendTo(goodsTxtContent);
			$("<div class='goodsStatus'>有货</div>").appendTo(goodsTxtContent);
			allCount += +this.goodsNum;
		});
		var balanceBottom = $("<div id='balanceBottom'></div>").appendTo(renderTo);
		$("<span id='balanceBottomTxt'>" + allCount + " 件商品，总商品金额： </span>").appendTo(balanceBottom);
		var totalMoney = 0;
		$(".goodsPrice").each(function() {
			totalMoney += +$(this).attr("price").replace(",", "") * +$(this).next().attr("goodsNum");
		});
		$("<span id='balanceBottomTxtMoney'>" + util.number.money(totalMoney) + "</span>").appendTo(balanceBottom);
		var balaceAccountArea = $("<div id='balaceAccountArea'></div>").appendTo(renderTo);
		var balaceAccountInfo = $("<div id='balaceAccountInfo'></div>").appendTo(balaceAccountArea);
		var totalMoneyArea = $("<div id='totalMoneyArea'></div>").appendTo(balaceAccountInfo);
		$("<span id='totalMoneyTxt'>应付总额：</span><span id='totalMoney'>" + util.number.money(totalMoney) + "</span>").appendTo(totalMoneyArea);
		var totalMoneyArea = $("<div id='totalMoneyArea'></div>").appendTo(balaceAccountInfo);
		$("<span id='totalAddress'></span>").appendTo(totalMoneyArea);
		$("<input type='button' value='返回购物车' id='goCartBtn' />").appendTo(balaceAccountArea);
		$("<input type='button' value='提交订单' id='goOrderBtn' />").appendTo(balaceAccountArea);
		if (args.onLoad != null && $.isFunction(args.onLoad)) {
			args.onLoad();
		}
		balance.eventBind(args, totalMoney);
	},
	eventBind : function(args, totalMoney) {
		$(".payWayBorder").removeClass("redBorder");
		$(".payWayBorder:first").addClass("redBorder").children().addClass("whiteBorder");
		$(".payWayBorder").click(function() {
			$(".payWayBorder").removeClass("redBorder").children().removeClass("whiteBorder");
			$(this).addClass("redBorder").children().addClass("whiteBorder");
		});
		balance.chooseFirstAddress();
		$(".receiverInfoNameBorder").click(function() {
			$(".receiverInfoNameBorder").removeClass("redBorder");
			$(".receiverInfoName").removeClass("whiteBorder");
			$(this).addClass("redBorder");
			$(this).children().addClass("whiteBorder");
			receiver = $(this).children().text();
			area = $(this).next().find("span:eq(0)").text();
			areaDes = $(this).next().find("span:eq(1)").text();
			tel = $(this).next().find("span:eq(2)").text();
			$("#totalAddress").html("寄送至： " + area + areaDes + "&nbsp;&nbsp;收货人：" + receiver + " " + tel);
			$(".receiverInfo").removeClass("receiverInfoBgc");
			$(this).next().addClass("receiverInfoBgc");
			$(".delAddress").addClass("hidden");
			$(this).next().find(".delAddress").removeClass("hidden");
		});
		$(".delAddress").click(function() {
			var obj = this;
			var addressId = $(this).parent().prev().find(".receiverInfoName").attr("addressId");
			var receiver = $(this).parent().prev().text();
			var area = $(this).parent().find("span:eq(0)").text();
			var areaDes = $(this).parent().find("span:eq(1)").text();
			var tel = $(this).parent().find("span:eq(2)").text();
			$.post("updateAddress.action", {
				addressId : addressId,
				receiver : receiver,
				area : area,
				areaDes : areaDes,
				tel : tel
			}, function(json) {
				if (!json.isSuccess == "true") {
					alert("删除地址失败");
				} else {
					$(obj).parent().parent().remove();
					balance.chooseFirstAddress();
				}
			});
		});
		$("#addAddressBtn").click(function() {
			if(util.isMobile()) {
				return;
			}
			dialog.show({
				title : "添加新地址",
				url : "jsp/dialog/address.jsp",
				width : 500,
				height : 510
			});
		});
		$("#goCartBtn").click(function() {
			if(navigator.userAgent.indexOf("MSIE") > -1 || navigator.userAgent.indexOf("rv:11") > -1) {
				location.href = "cart.jsp";
			} else {
				location.href = "jsp/cart.jsp";
			}
		});
		$("#dialogMask").height($("body").height());
		$("#goOrderBtn").click(function() {
			if ($(".receiverInfoNameBorder .whiteBorder")[0] == null) {
				alert("您还未填写地址");
				return;
			}
			var payWay = $(".payWay.whiteBorder").text();
			var goodsId = "";
			$(".goodsName").each(function() {
				goodsId += $(this).attr("goodsId") + ",";
			});
			var goodsNum = "";
			$(".goodsNum").each(function() {
				goodsNum += $(this).attr("goodsNum") + ",";
			});
			var cartId = "";
			$(".goodsImg").each(function() {
				cartId += $(this).attr("cartId") + ",";
			});
			$.post("addOrder.action", {
				totalMoney : totalMoney,
				payWay : payWay,
				goodsId : goodsId,
				goodsNum : goodsNum,
				cartId : cartId,
				addressId : $(".receiverInfoNameBorder .whiteBorder").attr("addressId")
			}, function(json) {
				if (json.isSuccess == "true") {
					if (navigator.userAgent.indexOf("MSIE") > -1 || navigator.userAgent.indexOf("rv:11") > -1) {
						location.href = "order.jsp";
					} else {
						location.href = "jsp/order.jsp";
					}
				} else {
					alert(json.errMsg);
				}
			});
		});
	},
	chooseFirstAddress : function() {
		$(".receiverInfoNameBorder:first").addClass("redBorder");
		$(".receiverInfoName:first").addClass("whiteBorder");
		$(".receiverInfo:first").addClass("receiverInfoBgc");
		$(".delAddress:first").removeClass("hidden");
		var receiver = $(".receiverInfoName:first").text();
		var area = $(".receiverInfoNameBorder:first").next().find("span:eq(0)").text();
		var areaDes = $(".receiverInfoNameBorder:first").next().find("span:eq(1)").text();
		var tel = $(".receiverInfoNameBorder:first").next().find("span:eq(2)").text();
		$("#totalAddress").html("寄送至： " + area + areaDes + "&nbsp;&nbsp;收货人：" + receiver + " " + tel);
	}
};