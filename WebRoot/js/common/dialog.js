var dialog = {
	init : function() {
		var dialogDiv = $("<div id='dialog' class='hidden'></div>").appendTo("body");
		var titleDiv = $("<div id='titleBar'></div>").appendTo(dialogDiv);
		var titleTxtDiv = $("<div id='titleTxt'></div>").appendTo(titleDiv);
		var btnDialogCloseDiv = $("<div id='btnDialogClose'>╳</div>").appendTo(titleDiv);
		var iFrameDiv = $("<iframe src='' id='dialogIframe' frameborder='0'></iframe>").appendTo(dialogDiv);
		var maskDiv = $("<div id='dialogMask' class='hidden'></div>").appendTo("body");
		$("#btnDialogClose").click(function() {
			dialog.hide();
		});
	},
	show : function(args) {
		top.$("#dialogIframe").attr("src", args.url);
		top.$("#dialog").css({
			width : args.width,
			height : args.height,
			marginLeft : -args.width / 2,
			marginTop : -args.height / 2
		});
		$("#titleTxt").text(args.title);
		top.$("#dialogIframe").css("height", args.height - 38);
		top.$("#dialog,#dialogMask").removeClass("hidden");
		if (args.onLoad != null) {
			args.onLoad();
		}
	},
	hide : function() {
		top.$("#dialog,#dialogMask").addClass("hidden");
	}
};

// ==============横屏风格的弹出层===================
function XDialog(args) {
	// 构造方法，把传经来的参数设置到属性
	this.renderTo = args.renderTo;
	// 初始化
	this.init();
}

// 初始化
XDialog.prototype.init = function() {
	// 初始化参数
	if (!this.renderTo)
		return;
	this.objRenderTo = $(this.renderTo);
	// 生成页面元素
	this.build();
};

// 生成页面元素
XDialog.prototype.build = function() {
	this.objRenderTo.removeClass().addClass("xdialog xdialogHidden hidden");
	var html = "<div class='xdialogContent'>";
	html += "<div class='xdialogTitle'></div>";
	// 判断框
	if (this.confirm) {

	} else {
		html += "<iframe class='xdialogIframe' src='' frameborder='0' name='chatIframe'></iframe>";
	}
	html += "</div>";
	this.objRenderTo.html(html);
	// 如果后面一个元素不是遮罩层
	if (!this.objRenderTo.next().hasClass("xdialogMask"))
		$("<div class='xdialogMask hidden'></div>").insertAfter(this.objRenderTo);
	this.eventBind();
};

// 弹出层事件绑定
XDialog.prototype.eventBind = function() {
	
};

// 显示弹出层
XDialog.prototype.show = function(args) {
	// 设置弹出层中的iframe地址
	$(".xdialogIframe", this.objRenderTo).attr("src", args.url);
	// 获取浏览器窗口的高度、宽度
	var h = top.$(top.window).height();
	var dialogTop;
	if(args.bottom == "true"){
		dialogTop = h - args.height;
	}else{
		dialogTop = h / 2 - args.height / 2;
	}
	// 定位弹出层
	$(this.objRenderTo).css("top", dialogTop);
	$(".xdialogContent", this.objRenderTo).css("width", args.width);
	$(".xdialogIframe", this.objRenderTo).css("height", args.height);
	// 显示弹出层遮罩层
	$(".xdialogMask").removeClass("hidden");
	// 设置弹出层标题
	$(".xdialogTitle", this.objRenderTo).text(args.title);
	// 显示弹出层
	this.objRenderTo.removeClass("hidden");
	var t = this.objRenderTo;
	if (util.isLTIE10()) {
		// 浏览器版本低于IE10时使用jquery实现动画
		$(".xdialogMask").css("opacity", "0");
		$(t).height(0).css("top", h / 2).removeClass("hidden xdialogHidden");
		t.animate({
			height : args.height,
			top : dialogTop,
			opacity : 1
		});
		$(".xdialogMask").animate({
			opacity : 0.2
		});
	} else {
		// 使用CSS3样式实现动画
		setTimeout(function() {
			t.removeClass("xdialogHidden");
			$(".xdialogMask").css("opacity", "0.2");
		}, 0);
	}
	if (args.onLoad && $.isFunction(args.onLoad)) {
		args.onLoad();
	}
};

// 隐藏弹出层
XDialog.prototype.hide = function(args) {
	var t = this.objRenderTo;
	var h = $(window).height();
	// 隐藏弹出层遮罩层
	if (util.isLTIE10()) {
		// 浏览器版本低于IE10时使用jquery实现动画
		t.animate({
			opacity : 0,
			height : 0,
			top : h / 2
		}, "slow");
		$(".xdialogMask").animate({
			opacity : 0
		});
		setTimeout(function() {
			t.addClass("hidden");
			$(".xdialogMask").addClass("hidden");
		}, 250);
	} else {
		// 使用CSS3样式实现动画
		t.addClass("xdialogHidden");
		$(".xdialogMask").css("opacity", "0");
		setTimeout(function() {
			t.addClass("hidden");
			$(".xdialogMask").addClass("hidden");
		}, 500);
	}
};