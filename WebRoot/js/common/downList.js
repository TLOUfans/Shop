//封装下拉菜单
var downList = {
	// 初始化方法
	init : function(args) {
		if (args.mapping == null) {
			args.mapping = {
				key : "key",
				value : "value"
			};
		}
		downList.getDataByDataSource(args);
	},
	// 获取数据
	getDataByDataSource : function(args) {
		// 传递来的是字符串
		if (typeof (args.dataSource) == "string") {
			$.ajax({
				url : args.dataSource,
				type : "POST",
				dataType : "text",
				success : function(json) {
					args.dataSource = eval("(" + json + ")");
					downList.build(args);
				}
			});
			// 传递来的是数组
		} else if ($.isArray(args.dataSource)) {
			downList.build(args);
		}
	},
	// 拼接节点
	build : function(args) {
		var input_area = $("<div class='input_area'></div>").appendTo($(args.renderTo));
		var select_menu = $("<div class='select_menu' unselectable='on'>请选择...<sapn class='triangle'>▼</span></div>").appendTo(input_area);
		var select_list = $("<div class='select_list hidden'></div>").appendTo(input_area);
		$(args.dataSource).each(function(index, el) {
			var select_item = $("<div class='select_item' key='" + this[args.mapping.key] + "'></div>").text(this[args.mapping.value]).appendTo(select_list);
		});
		var select_bg = $("<div class='select_bg'></div>").appendTo(select_list);
		downList.eventBind(args);
	},
	// 绑定事件
	eventBind : function(args) {
		// 下拉菜单的点击事件
		$(".select_menu", args.renderTo).click(function(event) {
			if ($(this).next().hasClass("hidden")) {
				downList.show(this);
			} else {
				downList.hide(this);
			}
			$(this).attr("flag", "true");
			downList.hide($(".select_menu:not([flag='true'])"));
			$(this).removeAttr("flag", "true");
			// 阻止事件冒泡
			event.stopPropagation();
			// 为点击下拉菜单的兄弟元素的子元素添加点击事件
			$(this).next().children().click(function() {
				// 获取当前点中下拉项的文本内容，并修改下拉菜单的html内容
				$(this).parent().prev().html($(this).text() + "<sapn class='triangle'>▼</span>");
				downList.hide($(this).parent().prev());
			});
		});
		// 鼠标进入时显示背景色块并移动到鼠标位置
		$(".select_item", args.renderTo).on({
			mouseenter : function() {
				$(".select_bg", $(this).parent()).removeClass('hidden');
				if (util.isLTIE10()) {
					$(".select_bg", $(this).parent()).animate({
						top : $(this).index() * 30
					}, "fast");
				} else {
					$(".select_bg", $(this).parent()).css("top", $(this).index() * 30);
				}
			}
		});
		// 除插入节点外触发此点击事件
		$(document).on('click', function(event) {
			// if ($(event.target).closest(args.renderTo).length == 0) {
			// downList.hide(".select_menu");
			// }
			downList.hide(".select_menu");
		});
	},
	// 显示
	show : function(selectMenu) {
		// 显示
		$(".triangle", selectMenu).addClass("select");
		$(selectMenu).next().removeClass("hidden");
		$(".select_bg", $(selectMenu).next()).css('top', 0);
		if (util.isLTIE10()) {
			$(selectMenu).next().animate({
				top : 30,
				opacity : 1
			},'fast');
		} else {
			setTimeout(function() {
				$(selectMenu).next().css({
					top : 30,
					opacity : 1
				});
			}, 1);
		}
	},
	// 隐藏
	hide : function(selectMenu) {
		$(".triangle", selectMenu).removeClass("select");
		if (util.isLTIE10()) {
			$(selectMenu).next().animate({
				top : 20,
				opacity : 0
			},'fast');
		} else {
			$(selectMenu).next().css({
				top : 20,
				opacity : 0
			});
		}
		setTimeout(function() {
			$(selectMenu).next().addClass("hidden");
		}, 250);
	}
};