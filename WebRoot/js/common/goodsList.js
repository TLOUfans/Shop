var obj = {
	pageSize : 10,
	pageNum : 2
};

var goodsList = {
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
		goodsList.getDataByDataSource(args);
	},
	reload : function(renderTo, pageSize, pageNum) {
		var args = $(renderTo).data("args");
		args.ajaxData.pageNum = pageNum;
		args.ajaxData.pageSize = pageSize;
		goodsList.init(args);
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
					goodsList.build(args);
				}
			});
		} else {
			args.data = args.dataSource;
			goodsList.build(args);
		}
	},
	build : function(args) {
		var renderTo = args.renderTo;
		$(renderTo).html("");
		$(renderTo).addClass("goodsList");
		if (args.data.rows.length == 0) {
			$("<div style='text-align: center;font-weight: bold; color: #666;padding: 0 0 20px 0;'>该分类下没有商品~</div>").appendTo(renderTo);
		}
		$(args.data.rows).each(function(i, o) {
			var productArea = $("<div class='productArea'></div>").appendTo($(renderTo));
			var product = $("<div class='product' url=" + this.id + "></div>").appendTo(productArea);
			var largeImgArea = $("<div class='largeImgArea'></div>").appendTo(product);
			if (this.smImgs.length > 0) {
				$("<img src='img/" + this.smImgs[0].url + "' alt='' />").appendTo(largeImgArea);
			}
			var smallImgAreaParent = $("<div class='smallImgAreaParent'></div>").appendTo(product);
			$(this.smImgs).each(function() {
				var smallImgArea = $("<div class='smallImgArea'></div>").appendTo(smallImgAreaParent);
				$("<img src='img/" + this.url + "' url='img/" + this.url + "' alt='' />").appendTo(smallImgArea);
			});
			var priceArea = $("<div class='priceArea'>" + this.price + "</div>").appendTo(product);
			$("<span class='moneyIcon'>¥</span>").prependTo(priceArea);
			var productNameArea = $("<div class='productNameArea'></div>").appendTo(product);
			var totalName = this.name;
			$("<a href='jsp/goodsDes.jsp?goodsId=" + this.id + "' title='" + totalName + "'>" + this.name + "</a>").appendTo(productNameArea);
			var sellerArea = $("<div class='sellerArea'></div>").appendTo(product);
			$("<a href='#'>" + this.userName + "</a>").appendTo(sellerArea);
			var salesStatus = $("<div class='salesStatus'></div>").appendTo(product);
			var sales = $("<div class='sales'>成交量</div>").appendTo(salesStatus);
			$("<span class='salesNum' title='" + this.sales + "笔'>" + this.sales + "笔</span>").appendTo(sales);
			var evaluate = $("<div class='evaluate'>评价</div>").appendTo(salesStatus);
			$("<a href='jsp/goodsDes.jsp?goodsId=" + this.id + "' class='evaluateNum'>" + this.comments.length + "</a>").appendTo(evaluate);
			var tmallIcon = $("<div class='tmallIcon' userid='" + this.userId + "' goodsid='" + this.id + "'></div>").appendTo(salesStatus);
			$("<img src='img/aliIcon.png' alt='' />").appendTo(tmallIcon);
		});
		// 分页
		var pagerTable = $("<table class='pagerTable' cellpadding='0' cellspacing='0'></table>").appendTo(args.renderTo);
		var pagerTr = $("<tr></tr>").appendTo(pagerTable);
		var html = "";
		html += "<td width='100'>共<span class='itemCount'>" + args.data.total + "</span>项</td>";
		html += "<td width='70'>每页显示</td>";
		html += "<td width='80'><div class='pagerDdl'></div></td><td>项</td>";
		html += "<td width='80'><div class='pagePrev pagerBtn'>上一页</div></td>";
		html += "<td width='80'><span class='currentPage'>" + args.ajaxData.pageNum + "</span>/<span class='totalPage'>" + Math.ceil(args.data.total / args.ajaxData.pageSize) + "</span></td>";
		html += "<td width='80'><div class='pageNext pagerBtn'>下一页</div></td>";
		$(pagerTr).html(html);
		goodsList.eventBind(args);
	},
	eventBind : function(args) {
		var renderTo = args.renderTo;
		$(window).scroll(function() {
			if (util.isMobile()) {
				if ($("body").hasClass("waiting")) {
					return;
				}
				if (goodsList.checkscrollside("productArea")) {
					$("body").addClass("waiting");
					if (location.search != "") {
						var con = "";
						if (location.search.split("=")[0] == "?typeId") {
							var typeId = location.search.split("=")[1];
							con = " WHERE T.ID = '" + typeId + "' AND 1=1";
						}
						if (location.search.split("=")[0] == "?goodsName") {
							var goodsName = location.search.split("=")[1];
							if (goodsName == null || goodsName == "") {
								location.href = "jsp/typeList.jsp";
							}
							con = " WHERE G.NAME LIKE '%" + unescape(goodsName) + "%' AND 1=1";
						}
						obj.condition = con;
					}
					$.post(args.dataSource, obj, function(json) {
						var jsonObj = json;
						if (jsonObj.rows.length > 0) {
							obj.pageNum++;
						}
						$(jsonObj.rows).each(function(i, o) {
							var productArea = $("<div class='productArea'></div>").insertAfter($(".productArea:last"));
							var product = $("<div class='product' url=" + this.id + "></div>").appendTo(productArea);
							var largeImgArea = $("<div class='largeImgArea'></div>").appendTo(product);
							if (this.smImgs.length > 0) {
								$("<img src='img/" + this.smImgs[0].url + "' alt='' />").appendTo(largeImgArea);
							}
							var smallImgAreaParent = $("<div class='smallImgAreaParent'></div>").appendTo(product);
							$(this.smImgs).each(function() {
								var smallImgArea = $("<div class='smallImgArea'></div>").appendTo(smallImgAreaParent);
								$("<img src='img/" + this.url + "' url='img/" + this.url + "' alt='' />").appendTo(smallImgArea);
							});
							var priceArea = $("<div class='priceArea'>" + this.price + "</div>").appendTo(product);
							$("<span class='moneyIcon'>¥</span>").prependTo(priceArea);
							var productNameArea = $("<div class='productNameArea'></div>").appendTo(product);
							var totalName = this.name;
							$("<a href='jsp/goodsDes.jsp?goodsId=" + this.id + "' title='" + totalName + "'>" + this.name + "</a>").appendTo(productNameArea);
							var sellerArea = $("<div class='sellerArea'></div>").appendTo(product);
							$("<a href='#'>" + this.userName + "</a>").appendTo(sellerArea);
							var salesStatus = $("<div class='salesStatus'></div>").appendTo(product);
							var sales = $("<div class='sales'>成交量</div>").appendTo(salesStatus);
							$("<span class='salesNum' title='" + this.sales + "笔'>" + this.sales + "笔</span>").appendTo(sales);
							var evaluate = $("<div class='evaluate'>评价</div>").appendTo(salesStatus);
							$("<a href='jsp/goodsDes.jsp?goodsId=" + this.id + "' class='evaluateNum'>" + this.comments.length + "</a>").appendTo(evaluate);
							var tmallIcon = $("<div class='tmallIcon' userid='" + this.userId + "'></div>").appendTo(salesStatus);
							$("<img src='img/aliIcon.png' alt=''/>").appendTo(tmallIcon);
						});
						setTimeout(function() {
							$("body").removeClass("waiting");
						}, 2000);
					});
				}
			}
		});
		var xDdl = new XDDL({
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
			offset : 0,
			defaultSelected : args.ajaxData.pageSize,
			onClick : function() {
				// 回调
				goodsList.reload(args.renderTo, $(".ddl .ddlItemSelected", args.renderTo).attr("key"), 1);
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
		$("#mylist", $(renderTo).parent()).on("click", ".largeImgArea", function() {
			if (navigator.userAgent.indexOf("MSIE") > -1 || navigator.userAgent.indexOf("rv:11") > -1) {
				location.href = "goodsDes.jsp?goodsId=" + $(this).parent().attr("url");
			} else {
				location.href = "jsp/goodsDes.jsp?goodsId=" + $(this).parent().attr("url");
			}
		});
		$(".pageNext", args.renderTo).click(function() {
			var currentPage = $(".currentPage", args.renderTo).text();
			var maxPage = $(".totalPage").text();
			var page = +currentPage + 1;
			page = page > maxPage ? maxPage : page;
			$(".currentPage", args.renderTo).text(page);
			goodsList.reload(args.renderTo, $(".ddl .ddlItemSelected", $(args.renderTo)).attr("key"), page);
		});
		$(".pagePrev", args.renderTo).click(function() {
			var currentPage = $(".currentPage", args.renderTo).text();
			var page = +currentPage - 1;
			page = page < 1 ? 1 : page;
			$(".currentPage", args.renderTo).text(page);
			goodsList.reload(args.renderTo, $(".ddl .ddlItemSelected", $(args.renderTo)).attr("key"), page);
		});
		var xDialog = new XDialog({
			renderTo : "#xDialog"
		});
		$("body").click(function(event) {
			xDialog.hide();
		});
		$(".tmallIcon").click(function(event) {
			event.stopPropagation();
			var diglogH = util.isLTIE10() ? 700 : 600;
			var userId = $(this).attr("userid");
			var goodsId = $(this).attr("goodsid");
			xDialog.show({
				title : "",
				url : "jsp/chat.jsp?friendId=" + userId + "&goodsId=" + goodsId,
				width : "50%",
				height : diglogH
			});
		});
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