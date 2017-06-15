var page = {
	condition : "WHERE G.ID='" + location.search.split("=")[1] + "' AND 1=1",
	pageSize : 10,
	pageNum : 2
};
$(function() {
	var id = location.search.split("=")[1];
	goodsModule.init({
		renderTo : "#goodsContainer",
		dataSource : "queryGoodsById.action",
		id : id
	});
	comment.init({
		renderTo : "#commentDiv",
		dataSource : "queryCommentByPage.action",
		ajaxData : {
			condition : "WHERE G.ID='" + id + "' AND 1=1"
		},
		onLoad : function() {
			$("#purchaseMask").height($("body").height());
		}
	});
});

var comment = {
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
		comment.getDataByDataSource(args);
	},
	reload : function(renderTo, pageSize, pageNum) {
		var args = $(renderTo).data("args");
		args.ajaxData.pageNum = pageNum;
		args.ajaxData.pageSize = pageSize;
		comment.init(args);
	},
	getDataByDataSource : function(args) {
		if (typeof args.dataSource == "string") {
			$.ajax({
				url : args.dataSource,
				type : "POST",
				data : args.ajaxData,
				success : function(json) {
					args.data = json;
					comment.build(args);
				}
			});
		} else {
			args.data = args.dataSource;
			comment.build(args);
		}
	},
	build : function(args) {
		var renderTo = args.renderTo;
		$(renderTo).html("");
		$("<a name='#commentTag'></a>").appendTo(renderTo);
		$("<div class='commentTitle'>商品评论</div>").appendTo(renderTo);
		if (args.data.rows.length == 0) {
			var contentArea = $("<div class='contentArea'></div>").appendTo(renderTo);
			var content = $("<div class='content' style='text-align:center;'>暂时还未有评论，快来抢沙发吧！！</div>").appendTo(contentArea);
			content.css("width","100%").css("padding-left", "0px");
		}
		$(args.data.rows).each(function() {
			var contentArea = $("<div class='contentArea'></div>").appendTo(renderTo);
			var star = "";
			for ( var i = 0; i < this.grade; i++) {
				star += "★";
			}
			$("<div class='star'><div>" + star + "</div><div class='createTime'>" + this.createTime + "</div><div class='goodsName'>" + this.goods.name + "</div></div>").appendTo(contentArea);
			var content = $("<div class='content'><div>" + this.content + "</div></div>").appendTo(contentArea);
			var imgDiv = $("<div class='imgDiv'></div>").appendTo(content);
			$(this.comImgs).each(function() {
				$("<div class='imgBorder'><img src='img/" + this.url + "'/></div>").appendTo(imgDiv);
			});
			$("<div class='userInfo'>" + "<img class='userFaceImg' src='img/" + this.user.face + "'/>" + this.user.name + "</div>").appendTo(contentArea);
		});
		// 分页
		var pagerTable = $("<table class='pagerTable' cellpadding='0' cellspacing='0'></table>").appendTo(args.renderTo);
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
		comment.eventBind(args);
	},
	eventBind : function(args) {
		var renderTo = args.renderTo;
		$(window).scroll(function(){
			if(util.isMobile()) {
				if ($("body").hasClass("waiting")) {
					return;
				}
				if (comment.checkscrollside("content")) {
					$("body").addClass("waiting");
					$.post(args.dataSource, page, function(json) {
						var jsonObj = json;
						if (jsonObj.rows.length > 0) {
							page.pageNum++;
						}
						$(jsonObj.rows).each(function() {
							var contentArea = $("<div class='contentArea'></div>").appendTo(renderTo);
							var star = "";
							for ( var i = 0; i < this.grade; i++) {
								star += "★";
							}
							$("<div class='star'><div>" + star + "</div><div class='createTime'>" + this.createTime + "</div><div class='goodsName'>" + this.goods.name + "</div></div>").appendTo(contentArea);
							var content = $("<div class='content'><div>" + this.content + "</div></div>").appendTo(contentArea);
							var imgDiv = $("<div class='imgDiv'></div>").appendTo(content);
							$(this.comImgs).each(function() {
								$("<div class='imgBorder'><img src='img/" + this.url + "'/></div>").appendTo(imgDiv);
							});
							$("<div class='userInfo'>" + "<img class='userFaceImg' src='img/" + this.user.face + "'/>" + this.user.name + "</div>").appendTo(contentArea);
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
				comment.reload(args.renderTo, $(".ddl .ddlItemSelected", args.renderTo).attr("key"), 1);
			}
		});
		$(".imgBorder").click(function() {
			if ($(this).find("img").hasClass("clickImg")) {
				if(util.isMobile()) {
					return;
				}
				$(this).find("img").removeClass("clickImg");
			} else {
				if(util.isMobile()) {
					return;
				}
				$(".clickImg").removeClass("clickImg");
				$(this).find("img").addClass("clickImg");
			}
		});
		$(".pageNext", args.renderTo).click(function() {
			var currentPage = $(".currentPage", args.renderTo).text();
			var maxPage = $(".totalPage").text();
			var page = +currentPage + 1;
			page = page > maxPage ? maxPage : page;
			$(".currentPage", args.renderTo).text(page);
			comment.reload(args.renderTo, $(".ddl .ddlItemSelected", $(args.renderTo)).attr("key"), page);
		});
		$(".pagePrev", args.renderTo).click(function() {
			var currentPage = $(".currentPage", args.renderTo).text();
			var page = +currentPage - 1;
			page = page < 1 ? 1 : page;
			$(".currentPage", args.renderTo).text(page);
			comment.reload(args.renderTo, $(".ddl .ddlItemSelected", $(args.renderTo)).attr("key"), page);
		});
	},
	checkscrollside : function(clsName) {
		var $lastBox = $('.' + clsName).last();
		lastBoxH = $lastBox.offset().top - $lastBox.height();
		scrollTop = $(window).scrollTop();
		bodyH = $("body").scrollTop() + 600;
		return lastBoxH < bodyH ? true : false;
	}
};

var goodsModule = {
	init : function(args) {
		goodsModule.getDataByDataSource(args);
	},
	getDataByDataSource : function(args) {
		if (typeof args.dataSource == "string") {
			$.ajax({
				url : args.dataSource,
				type : "POST",
				data : {
					id : args.id
				},
				success : function(json) {
					args.data = json;
					goodsModule.build(args);
				}
			});
		} else {
			args.data = args.dataSource;
			goodsModule.build(args);
		}
	},
	build : function(args) {
		var renderTo = args.renderTo;
		var goodsContent = $("<div class='goodsContent'></div>").appendTo(renderTo);
		$("<div class='typeTitle'>" + args.data.typeName + "&nbsp;&gt;</div>").appendTo(goodsContent);
		var goodsDes = $("<div class='goodsDes'></div>").appendTo(goodsContent);
		var goodsPic = $("<div class='goodsPic'></div>").appendTo(goodsDes);
		var bigGoodsPic = $("<div class='bigGoodsPic'></div>").appendTo(goodsPic);
		$("<img src='img/" + args.data.smImgs[0].url + "' alt='' />").appendTo(bigGoodsPic);
		var smallGoodsPic = $("<div class='smallGoodsPic'></div>").appendTo(goodsPic);
		// 遍历的地方
		$(args.data.smImgs).each(function() {
			var smallGoodsPicItem = $("<div class='smallGoodsPicItem'></div>").appendTo(smallGoodsPic);
			$("<img src='img/" + this.url + "' alt='' />").appendTo(smallGoodsPicItem);
		});
		// 遍历结束
		var tips = $("<div class='tips'></div>").appendTo(goodsPic);
		$("<b class='share'></b><em>分享</em>").appendTo(tips);
		$("<b class='heart'></b><em>关注商品</em>").appendTo(tips);
		$("<em class='report'>举报</em>").appendTo(tips);
		var goodsTxtContainer = $("<div class='goodsTxtContainer'></div>").appendTo(goodsDes);
		var goodsTxt = $("<div class='goodsTxt'></div>").appendTo(goodsTxtContainer);
		$("<div class='goodsTitle'>" + args.data.name + "</div>").appendTo(goodsTxt);
		$("<div class='goodsIntro'>" + args.data.des + "</div>").appendTo(goodsTxt);
		var num = args.data.num;
		if (num == 0) {
			num = "<span id='numSpan' style='color:#d21919;font-weight:bold'>暂时无货</span>";
		} else {
			num = "<span id='numSpan'>库存：" + args.data.num + "</span>";
		}
		$("<div class='goodsPrice goodstTxtItem'>价　　格：<span>￥" + args.data.price + "</span> (降价通知)" + num + "</div>").appendTo(goodsTxt);
		$("<div class='spport goodstTxtItem'>支　　持：以旧换新</div>").appendTo(goodsTxt);
		$("<div class='service goodstTxtItem'>服　　务：由 京西 发货，<span>" + args.data.userName + "京西官方旗舰店</span>&nbsp;&nbsp;提供售后服务。23:00前完成下单,预计明天(" + util.date.afterSomeDay(1) + ")送达</div>").appendTo(goodsTxt);
		$("<div class='freight goodstTxtItem'>运　　费：支持 99元免基础运费(10kg内)</div>").appendTo(goodsTxt);
		$("<div class='weight goodstTxtItem'>重　　量：2.2kg</div>").appendTo(goodsTxt);
		var purchaseArea = $("<div class='purchaseArea'></div>").appendTo(goodsTxt);
		$("<div id='countGoodsNum'></div>").appendTo(purchaseArea);
		$("<input type='button' value='加入购物车' id='cartAddBtn'/>").appendTo(purchaseArea);
		$("<div class='friendlyTips'>温馨提示：支持7天无理由退货&nbsp;&nbsp;&nbsp;套装价不享受单品及其他优惠</div>").appendTo(purchaseArea);
		count.init({
			renderTo : "#countGoodsNum"
		});
		var purchaseDialog = $("<div id='purchaseDialog' class='hidden'></div>").appendTo("body");
		var purchaseDialogTitle = $("<div id='purchaseDialogTitle' class=''>提示</div>").appendTo(purchaseDialog);
		$("<div id='purchaseDialogCloseBtn'>╳</div>").appendTo(purchaseDialogTitle);
		$("<div id='purchaseDialogContent'>商品已成功加入购物车！</div>").appendTo(purchaseDialog);
		var purchaseDialogBtnArea = $("<div id='purchaseDialogBtnArea'></div>").appendTo(purchaseDialog);
		$("<input type='button' id='stayBtn' value='查看商品详情'>").appendTo(purchaseDialogBtnArea);
		$("<input type='button' id='goCartBtn' value='去购物车结算  >'>").appendTo(purchaseDialogBtnArea);
		var purchaseMask = $("<div id='purchaseMask' class='hidden'></div>").appendTo("body");
		goodsModule.eventBind(args);
	},
	eventBind : function(args) {
		if (args.data.num == 0) {
			$("#cartAddBtn").addClass("disableBtn");
		}
		$(".smallGoodsPicItem:eq(0)").addClass("selectedImg");
		$(".smallGoodsPic img").mouseenter(function() {
			$(".smallGoodsPicItem").removeClass("selectedImg");
			$(this).parent().addClass("selectedImg");
			$(".bigGoodsPic>img").attr("src", $(this).attr("src"));
		});
		$("#purchaseDialogCloseBtn").click(function() {
			$("#purchaseDialog").addClass("hidden");
			$("#purchaseMask").addClass("hidden");
		});
		$("#stayBtn").click(function() {
			$("#purchaseDialogCloseBtn").click();
		});
		$("#goCartBtn").click(function() {
			if (navigator.userAgent.indexOf("MSIE") > -1 || navigator.userAgent.indexOf("rv:11") > -1) {
				location.href = "cart.jsp";
			} else {
				location.href = "jsp/cart.jsp";
			}
		});
		$("#cartAddBtn").click(function() {
			if ($(this).hasClass("disableBtn")) {
				return;
			}
			var goodsNum = $("#countInput").val();
			if ($(".navLogin").attr("userId") == null) {
				location.href = "jsp/login.jsp?goodsId=" + location.search.split("=")[1];
				return;
			}
			$.post("addCart.action", {
				goodsId : location.search.split("=")[1],
				goodsNum : goodsNum,
				checked : 1
			}, function(json) {
				if (json.isSuccess == "true") {
					$("#purchaseDialog").removeClass("hidden");
					$("#purchaseMask").removeClass("hidden");
					cartSpan.init({
						renderTo : ".navCart",
						dataSource : "queryCartByUserId.action"
					});
				} else {
					alert(json.errMsg);
				}
			});
		});
	}
};
