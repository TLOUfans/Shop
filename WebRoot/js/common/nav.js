$(function() {
	cartSpan.init({
		renderTo : ".navCart",
		dataSource : "queryCartByUserId.action"
	});
	$("#vipDes").text("余额：" + util.number.money($(".navLogin").attr("userMoney")));
	$(".navLogin").mouseenter(function() {
		$("#userDes").removeClass("hidden");
	});
	$(".navLogin").mouseleave(function() {
		$("#userDes").addClass("hidden");
	});
	$("#exitBtn").click(function() {
		$.post("exit.action", function(json) {
			if (json.isSuccess == "true") {
				if(navigator.userAgent.indexOf("MSIE")>-1||navigator.userAgent.indexOf("rv:11")>-1) {
					location.href = "login.jsp";
				} else {
					location.href = "jsp/login.jsp";
				}
			} else {
				alert(json.errMsg);
			}
		});
	});
	$(".goodsType").click(function() {
		goodsList.init({
			renderTo : "#mylist",
			dataSource : "queryAllGoods.action"
		});
	});
	window.onscroll = function() {
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		if (scrollTop < 500) {
			$("#topBtn").css("opacity", "0");
		}
		if (scrollTop > 500) {
			$("#topBtn").css("opacity", "1");
		}
	};
	if (util.isLTIE10()) {
		$("#placeholder").removeClass("hidden");
		$("#searchInput").keyup(function() {
			if ($(this).val() != "") {
				$("#placeholder").addClass("hidden");
			} else {
				$("#placeholder").removeClass("hidden");
			}
		});
		$("#searchInput").focus(function(){
			$("#placeholder").addClass("hidden");
		});
		$("#searchInput").blur(function(){
			if($(this).val()=="") {
				$("#placeholder").removeClass("hidden");
			}
		});
		$("#placeholder").click(function(){
			$("#searchInput").focus();
		});
	}
	$("#topBtn").click(function() {
		$("html,body").animate({
			scrollTop : "0px"
		}, 400);
	});
});

var cartSpan = {
	init : function(args) {
		cartSpan.getDataByDataSource(args);
	},
	getDataByDataSource : function(args) {
		if (typeof args.dataSource == "string") {
			$.ajax({
				url : args.dataSource,
				type : "POST",
				data : {
					pageSize : 10,
					pageNum : 1
				},
				success : function(json) {
					args.data = json;
					cartSpan.build(args);
				}
			});
		} else {
			args.data = args.dataSource;
			cartSpan.build(args);
		}
	},
	build : function(args) {
		var renderTo = args.renderTo;
		$(renderTo).html("");
		if (args.data.total != null) {
			$("<span class='cartNum'>购物车&nbsp;" + args.data.total + "&nbsp;件</span>").appendTo(renderTo);
		}
		cartSpan.eventBind(args);
	},
	eventBind : function(args) {
		$("#searchBtn").click(function() {
			var goodsName = $(this).parent().prev().find("input").val();
			if (goodsName.trim() == "") {
				return;
			} else {
				window.open("jsp/goodsList.jsp?goodsName=" + escape(goodsName));
			}
		});
		$("#searchInput").focus(function() {
			$(this).keydown(function(event) {// 键盘按下事件
				// 如果按下的按键编号是13表示按下的是回车
				if (event.which == 13) {
					// 模拟点击登录按钮
					$("#searchBtn").click();
				}
			});
		});
	}
};