var typeList = {
	init : function(args) {
		typeList.getDataByDataSource(args);
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
					typeList.build(args);
				}
			});
		} else {
			args.data = args.dataSource;
			typeList.build(args);
		}
	},
	build : function(args) {
		var renderTo = args.renderTo;
		$(renderTo).addClass("typeList");
		var typeMenuBar = $(" <ul class='typeMenuBar'></ul>").appendTo(renderTo);
		$(args.data).each(function() {
			$("<li class='typeMenu'><span class='typeIcon'></span><span class='txtTypeMenu' id='" + this.id + "'>" + this.menu + "</span></li>").appendTo(typeMenuBar);
		});
		var typeItem = $("<div class='typeItem hidden'></div>").appendTo(renderTo);
		$(args.data).each(function(index, t) {
			var typeItemArea = $("<div class='typeItemArea" + index + " hidden typeItemArea'></div>").appendTo(typeItem);
			$(this.typeItemTitles).each(function(i, o) {
				var typeItemTitle = $("<div class='typeItemTitle'>" + this.itemTitle + "&gt;</div>").appendTo(typeItemArea);
				var typeItemContent = $("<div class='typeItemContent'></div>").appendTo(typeItemArea);
				$(this.items).each(function() {
					$("<span><a href='jsp/goodsList.jsp?typeId=" + t.id + "' target='_blank'>" + this.item + "</a></span>").appendTo(typeItemContent);
				});
			});
		});
		typeList.eventBind(args);
	},
	eventBind : function(args) {
		var renderTo = args.renderTo;
		$(".typeMenu", renderTo).on({
			mouseenter : function() {
				$(".typeMenu", renderTo).removeClass("selectMenu");
				$(this).addClass("selectMenu");
				$(".typeItemArea", renderTo).addClass("hidden");
				$(".typeItem", renderTo).addClass("hidden");
				$(".typeItemArea" + $(this).index(), renderTo).removeClass("hidden");
				$(".typeItem", renderTo).removeClass("hidden");
			}
		});
		$(".typeList").mouseleave(function() {
			$(".typeItemArea", renderTo).addClass("hidden");
			$(".typeItem", renderTo).addClass("hidden");
			$(".typeMenu", renderTo).removeClass("selectMenu");
		});
		$(".typeMenu").click(function() {
			window.open("jsp/goodsList.jsp?typeId=" + $(this).find(".txtTypeMenu").attr("id"));
		});
	}
};