//下拉菜单
var ddl = {
	// 下拉菜单初始化
	init : function(args) {
		// 如果没有传入映射关系
		if (args.mapping == null) {
			// 设置默认映射关系
			args.mapping = {
				key : "key",
				value : "value"
			};
		}
		// 初始化ajaxData属性
		if (args.ajaxData == null) {
			// 设置默认值后防止报错
			args.ajaxData = {};
		}
		// 弹出位置偏移量
		if (args.offset == null) {
			args.offset = 0;
		}
		if (args.direction == null) {
			args.direction = "down";
		}
		args.direction = args.direction == "down" ? "top" : "bottom";
		// 把参数保存在div上面
		$(args.renderTo).data("args", args);
		// 根据传入的数据源类型，判断是否发起ajax请求
		ddl.getDataByDataSource(args);
	},
	// 根据传入的数据源类型，判断是否发起ajax请求
	getDataByDataSource : function(args) {
		// 如果数据源是一个字符串，表示是一个url地址
		if (typeof args.dataSource == "string") {
			// 使用ajax发起请求
			$.ajax({
				url : args.dataSource,
				type : "POST",
				dataType : "text",
				// 发送请求是传递到后台的参数
				data : args.ajaxData,
				success : function(json) {
					// 把json转成js对象
					var obj = eval("(" + json + ")");
					// 把请求到的JSON转成数组后赋值给dataSource属性
					args.dataSource = obj;
					// 生成下拉菜单HTML
					ddl.build(args);
				}
			});
		} else if ($.isArray(args.dataSource)) {// 如果数据源是一个数组
			// 生成下拉菜单HTML
			ddl.build(args);
		}
	},
	// 生成下拉菜单HTML
	build : function(args) {
		var renderTo = $(args.renderTo);
		$(renderTo).addClass("ddl");
		var ddlTxt = $("<div class='ddlTxt' unselectable='on'></div>").appendTo(renderTo);
		var ddlArrow = $("<div class='ddlArrow'></div>").appendTo(renderTo);
		var ddlList = $("<ul class='ddlList hidden'>").appendTo(renderTo);
		// 遍历默认加载项生成菜单项
		$(args.defaultItems).each(function(i, t) {
			$("<li class='ddlItem' key='" + t[args.mapping.key] + "' unselectable='on'>" + t[args.mapping.value] + "</li>").appendTo(ddlList);
		});
		// 遍历数据源生成菜单项
		$(args.dataSource).each(function(i, t) {
			$("<li class='ddlItem' key='" + this[args.mapping.key] + "' unselectable='on'>" + this[args.mapping.value] + "</li>").appendTo(ddlList);
		});
		// 如果存在默认选中项
		if (args.defaultSelected != null) {
			$(ddlTxt).text($(".ddlItem[key='" + args.defaultSelected + "']", ddlList).addClass("ddlItemSelected").text());
		} else {
			$(ddlTxt).text($(".ddlItem:eq(0)", ddlList).addClass("ddlItemSelected").text());
		}
		// 下拉菜单事件绑定
		ddl.eventBind(args);
	},
	// 下拉菜单事件绑定
	eventBind : function(args) {
		var renderTo = $(args.renderTo);
		// 下拉菜单点击展开
		$(".ddlTxt", renderTo).click(function(event) {
			var render = $($(renderTo).selector);
			// 如果下拉菜单隐藏?显示下拉菜单:隐藏下拉菜单
			$(".ddlList", render).hasClass("hidden") ? ddl.show(renderTo) : ddl.hide(renderTo);
			// 展开当前下拉菜单时，应该收起页面上所有的其他下拉菜单
			$(render).attr("flag", "true");
			// 隐藏其他下拉菜单
			ddl.hide($(".ddl:not([flag='true'])"));
			$(render).removeAttr("flag");
			// 阻止事件冒泡
			event.stopPropagation();
		});
		// 菜单项点击
		$(".ddlItem", renderTo).click(function(event) {
			var render = $($(renderTo).selector);
			ddl.selectItem(render, this);
			$(this).addClass("ddlItemSelected");
			ddl.hide(render);
			// 如果用户传入onClick属性同时该属性的值是一个方法
			if (args.onClick != null && $.isFunction(args.onClick))
				args.onClick(this);
			// 选中指定的菜单项
			event.stopPropagation();
		});
		// 点击其他位置，由body触发收起
		$("body").click(function() {
			$(".ddl").each(function() {
				ddl.hide(this);
			});
		});
		// 如果用户传入onLoad属性同时该属性的值是一个方法
		if (args.onLoad != null && $.isFunction(args.onLoad))
			args.onLoad();
	},
	// 显示下拉菜单
	show : function(renderTo) {
		var args = $(renderTo).data("args");
		// 设置下拉菜单弹出部分滑动开始时的起点位置，在字符串左侧使用+可以强制把字符串转成数值类型
		$(".ddlList", renderTo).css(args.direction, 29 + +args.offset);
		// 先显示元素
		$(".ddlList", renderTo).removeClass("hidden");
		// 判断当前浏览器是否小于IE10
		if (util.isLTIE10()) {
			// 设置初始透明样式filter，否则animate无法实现动画效果
			$(".ddlList", renderTo).css("opacity", 0);
			// 如果是IE10之前的版本，使用jq的animate实现动画
			// $(".ddlList", renderTo).animate({
			// top : 28,
			// opacity : 1
			// }, "fast");
			var style = {
				opacity : 1
			};
			// 变量不能当成键值对的 键来使用
			style[args.direction] = 28 + +args.offset;
			$(".ddlList", renderTo).animate(style, "fast");
		} else {
			setTimeout(function() {
				// 使用CSS3实现动画
				$(".ddlList", renderTo).css(args.direction, 29 + +args.offset).css("opacity", 1);
			}, 1);
		}
	},
	// 隐藏下拉菜单
	hide : function(renderTo) {
		// 如果无法直接获取，通过selector重新查找该元素后再获取
		var args = $(renderTo).data("args") ? $(renderTo).data("args") : $($(renderTo).selector).data("args");
		// 判断当前浏览器是否小于IE10
		if (util.isLTIE10()) {
			// 如果是IE10之前的版本，使用jq的animate实现动画
			$(".ddlList", renderTo).animate({
				top : 20,
				opacity : 0
			}, "fast");
		} else {
			setTimeout(function() {
				// 使用CSS3实现动画:向上收起
				$(".ddlList", renderTo).css(args.direction, 20 + +args.offset).css("opacity", 0);
			}, 1);
		}
		// 250ms动画结束后隐藏元素
		setTimeout(function() {
			$(".ddlList", renderTo).addClass("hidden");
		}, 250);
	},
	// 选中指定的菜单项
	selectItem : function(renderTo, ddlItem) {
		// 移除所有菜单项的选中效果
		$(".ddlItemSelected", renderTo).removeClass("ddlItemSelected");
		// 给当前点击的菜单增加选中效果
		$(ddlItem).addClass("ddlItemSelected");
		// 设置文本框中显示的文字
		$(".ddlTxt", renderTo).text($(ddlItem).text());
	}
};

// ===============下拉列表代码重构================
function XDDL(args) {
	// 参数检测
	try {
		if (args.renderTo == undefined || args.dataSource == undefined)
			throw "缺失必要参数";
		if ($(args.renderTo).length == 0)
			throw "renderTo元素不存在";
		if (args.dataSource == "")
			throw "dataSource不能为空";
	} catch (e) {
		alert("下拉列表初始化失败，原因：" + e);
		return;
	}
	// 初始化
	this.init(args);
}

// 下拉列表初始化
XDDL.prototype.init = function(args) {
	// 初始化参数
	this.renderTo = $(args.renderTo);
	this.dataSource = args.dataSource;
	// 如果没有传入映射关系,设置默认映射关系
	this.mapping = args.mapping == undefined ? {
		key : "key",
		value : "value"
	} : args.mapping;
	// 如果没有传入ajaxData属性，设置默认值防止报错
	this.ajaxData = args.ajaxData == undefined ? {} : args.ajaxData;
	// 如果没有传入默认加载项如“全部”，设置默认值防止报错
	this.defaultItems = args.defaultItems == undefined ? null : args.defaultItems;
	// 如果没有传入默认选中项，设置默认值防止报错
	this.defaultSelected = args.defaultSelected == undefined ? null : args.defaultSelected;
	// 如果没有传入弹出位置偏移量，设置默认值防止报错
	this.offset = args.offset == undefined ? 0 : args.offset;
	// 如果没有传入下拉列表弹出方向，设置默认值防止报错
	this.direction = args.direction == undefined ? "down" : args.offset;
	// 把弹出方向转为css属性名称
	this.direction = this.direction == "down" ? "top" : "bottom";
	// 如果用户传入onClick属性同时该属性的值是一个方法
	this.onClick = $.isFunction(args.onClick) ? args.onClick : function() {
	};
	// 如果用户传入onLoad属性同时该属性的值是一个方法
	this.onLoad = $.isFunction(args.onLoad) ? args.onLoad : function() {
	};
	this.onGetData = args.onGetData;
	this.renderTo.data("this", this);
	// 准备数据源
	this.getDataByDataSource();
};

// 根据数据源类型，判断是否发起ajax请求
XDDL.prototype.getDataByDataSource = function() {
	var t = this;
	// 如果数据源是一个字符串，表示是一个url地址
	if (typeof t.dataSource == "string")
		// 发起请求
		$.post(this.dataSource, this.ajaxData, function(obj) {
			// 把请求到的JSON转成数组后赋值给dataSource属性
			t.dataSource = obj;
			if(t.onGetData!=null && $.isFunction(t.onGetData)) {
				var data = t.onGetData(t.dataSource);
				t.dataSource = data;
			}
			// 生成下拉列表HTML
			t.build();
		});
	else if ($.isArray(t.dataSource))// 如果数据源是一个数组
		// 生成下拉列表HTML
		t.build();
};

// 生成页面元素
XDDL.prototype.build = function() {
	$(this.renderTo).addClass("ddl");
	var ddlTxt = $("<div class='ddlTxt' unselectable='on'></div>").appendTo(this.renderTo);
	var ddlArrow = $("<div class='ddlArrow'></div>").appendTo(this.renderTo);
	var ddlList = $("<ul class='ddlList hidden'>").appendTo(this.renderTo);
	// 映射关系
	var k = this.mapping.key;
	var v = this.mapping.value;
	// 遍历默认加载项生成菜单项
	$(this.defaultItems).each(function(i, t) {
		$("<li class='ddlItem' key='" + t[k] + "' unselectable='on'>" + t[v] + "</li>").appendTo(ddlList);
	});
	// 遍历数据源生成菜单项
	$(this.dataSource).each(function(i, t) {
		$("<li class='ddlItem' key='" + t[k] + "' unselectable='on'>" + t[v] + "</li>").appendTo(ddlList);
	});
	// 如果存在默认选中项
	if (this.defaultSelected != null) {
		$(ddlTxt).text($(".ddlItem[key='" + this.defaultSelected + "']", ddlList).addClass("ddlItemSelected").text());
	} else {
		$(ddlTxt).text($(".ddlItem:eq(0)", ddlList).addClass("ddlItemSelected").text());
	}
	// 下拉列表事件绑定
	this.eventBind();
};

// 事件绑定
XDDL.prototype.eventBind = function() {
	var t = this;
	// 下拉列表点击展开
	$(t.renderTo).click(function(event) {
		// 如果下拉列表隐藏?显示下拉列表:隐藏下拉列表
		$(".ddlList", t.renderTo).hasClass("hidden") ? t.show() : t.hide();
		// 展开当前下拉列表时，应该收起页面上所有的其他下拉列表
		$(t.renderTo).attr("flag", "true");
		// 隐藏其他下拉列表
		$(".ddl:not([flag='true'])").each(function() {
			$(this).data("this").hide();
		});
		$(t.renderTo).removeAttr("flag");
		// 阻止事件冒泡
		event.stopPropagation();
	});
	// 菜单项点击
	$(".ddlItem", t.renderTo).click(function(event) {
		// 选中指定的菜单项
		t.select(this);
		// 隐藏下拉列表
		t.hide();
		// 触发点击事件
		t.onClick(this);
		// 阻止事件冒泡
		event.stopPropagation();
	});
	// 点击其他位置，由body触发收起
	$("body").click(function() {
		$(".ddl").each(function() {
			$(this).data("this").hide();
		});
	});
	// 加载完成
	t.onLoad();
};

// 设置选中项
XDDL.prototype.select = function(selectedItem) {
	// 移除所有菜单项的选中效果
	$(".ddlItemSelected", this.renderTo).removeClass("ddlItemSelected");
	// 给当前点击的菜单增加选中效果
	$(selectedItem).addClass("ddlItemSelected");
	// 设置文本框中显示的文字
	$(".ddlTxt", this.renderTo).text($(selectedItem).text());
};

// 显示弹出层
XDDL.prototype.show = function() {
	var t = this;
	// 设置下拉列表弹出部分滑动开始时的起点位置，在字符串左侧使用+可以强制把字符串转成数值类型
	$(".ddlList", t.renderTo).css(t.direction, 29 + +t.offset - 10);
	// 先显示元素
	$(".ddlList", t.renderTo).removeClass("hidden");
	// 判断当前浏览器是否小于IE10
	if (util.isLTIE10()) {
		// 设置初始透明样式filter，否则animate无法实现动画效果
		$(".ddlList", t.renderTo).css("opacity", 0);
		// 如果是IE10之前的版本，使用jq的animate实现动画
		var style = {
			opacity : 1
		};
		// 先声明style对象，通过[]给对象添加属性，获取的是t.direction的值
		style[t.direction] = 28 + +t.offset;
		$(".ddlList", t.renderTo).animate(style, "fast");
	} else {
		setTimeout(function() {
			// 使用CSS3实现动画
			$(".ddlList", t.renderTo).css(t.direction, 29 + +t.offset).css("opacity", 1);
		}, 1);
	}
};

// 隐藏弹出层
XDDL.prototype.hide = function() {
	var t = this;
	// 判断当前浏览器是否小于IE10
	if (util.isLTIE10()) {
		// 如果是IE10之前的版本，使用jq的animate实现动画
		var style = {
			opacity : 0
		};
		// 先声明style对象，通过[]给对象添加属性，获取的是args.direction的值
		style[t.direction] = 20 + +t.offset;
		$(".ddlList", this.renderTo).animate(style, "fast");
	} else {
		setTimeout(function() {
			// 使用CSS3实现动画:向上收起
			$(".ddlList", t.renderTo).css(t.direction, 20 + +t.offset).css("opacity", 0);
		}, 1);
	}
	// 250ms动画结束后隐藏元素
	setTimeout(function() {
		$(".ddlList", t.renderTo).addClass("hidden");
	}, 250);
};