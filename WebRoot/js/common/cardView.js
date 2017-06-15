var cardView = {
	init : function(args) {
		cardView.getDataByDataSource(args);
	},
	getDataByDataSource : function(args) {
		// 判断传入的数据是否是数组
		if ($.isArray(args.dataSource)) {
			cardView.build(args);
			// 判断传入的数据是否是字符串
		} else if (typeof (args.dataSource) == "string") {
			$.ajax({
				url : args.dataSource,
				type : "POST",
				dataType : "text",
				data : args.ajaxData,
				success : function(json) {
					args.dataSource = eval("(" + json + ")");
					cardView.build(args);
				}
			});
		}
	},
	build : function(args) {
		var render = args.renderTo;
		$(render).addClass("cardView");
		$(args.dataSource).each(function() {
			var cardContainer = $("<div class='cardContainer'></div>").appendTo($(render));
			var img = $("<div class='img'></div>").appendTo(cardContainer);
			$("<img src='" + this.src + "' alt='' width='100%' height='100%' />").appendTo(img);
			var info = $("<div class='info'>").appendTo(cardContainer);
			$("<div class='baseInfo'>姓名:" + this.name + "</div>").appendTo(info);
			$("<div class='baseInfo'>性别:" + this.sex + "</div>").appendTo(info);
			$("<div class='baseInfo'>年龄:" + this.age + "</div>").appendTo(info);
			$("<div class='eamil'>邮箱:" + this.email + "</div>").appendTo(cardContainer);
			$("<div class='other'>备注:" + this.other + "</div>").appendTo(cardContainer);
		});
		cardView.evnetBind(args);
	},
	evnetBind : function(args) {
		var renderTo = args.renderTo;
//		$(".cardContainer", renderTo).click(function() {
//			$(this).toggleClass("selectZ");
//		});
		$(".baseInfo,.eamil,.other", renderTo).click(function(event) {
			$(this).toggleClass("selectX");
			event.stopPropagation();
		});
//		$(".other:last", renderTo).click(function(event) {
//			$(".cardContainer").toggleClass("selectY");
//			event.stopPropagation();
//		});
		//一呼百应
	}
};