$(function() {
	// 弹出层dialog的初始化init方法
	dialog.init();

	// 动态生成菜单 的Json对象
	var menuArray = [ {
		name : "用户管理",
		url : "jsp/manager/userManager.jsp"
	}, {
		name : "商品管理",
		url : "jsp/manager/goodsManager.jsp"
	}, {
		name : "类型管理",
		url : "jsp/manager/typeManager.jsp"
	}, {
		name : "评论管理",
		url : "jsp/manager/commentManager.jsp"
	}, {
		name : "购物车管理",
		url : "jsp/manager/cartManager.jsp"
	}, {
		name : "订单管理",
		url : "jsp/manager/orderManager.jsp"
	} ];

	// 遍历菜单对象
	$(menuArray).each(function(i, o) {
		// 拼接
		var menuItem = $("<div class='menuItem'></div>").appendTo("#menuContainer");
		var leftBorder = $("<div class='leftBorder'></div>").appendTo(menuItem);
		var rightBorder = $("<div class='rightBorder'></div>").appendTo(menuItem);
		var menu = $("<div class='menu' url='" + o.url + "'>" + o.name + "</div>").appendTo(menuItem);
	});
	$("<div id='menuBG' class='hidden'></div>").appendTo("#menuContainer");

	// hover效果
	$("#menuContainer").hover(function() {
		$("#menuBG").removeClass("hidden");
	}, function() {
		$("#menuBG").addClass("hidden");
	});

	// 事件委托
	$(".menuItem").on({
		mouseenter : function() {
			$("#menuBG").css("top", $(this).index() * 43);
		}
	});

	// 点击事件
	$(".menuItem").click(function() {
		$(".select").removeClass("select");
		$(this).addClass("select");
		$("#mainFrame").attr("src", $(".menu", this).attr("url"));
		util.cookie.set("lastMenu", $(".menu", this).attr("url"));
	});

	var lastMenu = util.cookie.get("lastMenu");
	if (lastMenu != null && lastMenu != "") {
		$(".menu[url='" + lastMenu + "']").parent().click();
	} else {
		// 默认点击第一个菜单
		$(".menu:eq(0)").click();
	}

	$("#userName").mouseenter(function() {
		$(this).parent().next().removeClass("hidden");
	});
	$("#userDes").mouseleave(function() {
		$(this).addClass("hidden");
	});

	$("#userFaceArea").click(function() {
		dialog.show({
			title : "修改头像",
			url : "jsp/dialog/userFace.jsp",
			width : 300,
			height : 300
		});
	});

	$(window).resize(function() {
		updateSize();
	});
	$("#exitBtn").click(function() {
		$.post("exit.action", function(json) {
			if (json.isSuccess == "true")
				location.href = $("base").attr("href") + "jsp/login.jsp";
		});
	});
	updateSize();
});

function updateSize() {
	$("#mainFrame").height($(window).height() - 50);
}