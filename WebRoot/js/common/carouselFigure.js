var carouselFigure = {
	init : function(args) {
		carouselFigure.getDataByDataSource(args);
	},
	getDataByDataSource : function(args) {
		if (typeof args.dataSource == "string") {
			var xhr = new XMLHttpRequest();
			xhr.open("POST", args.dataSource, true);
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhr.send(null);
			xhr.onreadystatechange = function() {
				if (xhr.status == 200 && xhr.readyState == 4) {
					var json = xhr.responseText;
					var obj = eval("(" + json + ")");
					args.data = obj;
					carouselFigure.build(args);
				}
			};
		} else {
			args.data = args.dataSource;
			carouselFigure.build(args);
		}
	},
	build : function(args) {
		var renderTo = args.renderTo;
		var renderToDiv = document.getElementById(renderTo);
		$(renderToDiv).addClass("carouselFigure");
		var table = document.createElement("table");
		renderToDiv.appendChild(table);
		var tr = document.createElement("tr");
		table.appendChild(tr);
		$(table).addClass("cfBody");
		table.setAttribute("cellspacing", 0);
		table.setAttribute("cellpadding", 0);
		var html = "";
		for ( var i = 0; i < args.data.length; i++) {
			html += "<td class='cfItem'><img src='" + args.data[i].imgSrc + "' alt=''></td>";
		}
		$(tr).html(html);
		var selectBar = document.createElement("div");
		renderToDiv.appendChild(selectBar);
		$(selectBar).addClass("selectBar");
		var html2 = "";
		for ( var i = 0; i < args.data.length; i++) {
			html2 += "<span class='selectButton'></span>";
		}
		selectBar.innerHTML = html2;
		var firstBtn = $(".selectButton")[0];
		$(firstBtn).addClass("selectBtnClick");
		carouselFigure.eventBind(args);
		if (args.onLoad != null && $.isFunction(args.onLoad)) {
			args.onLoad();
		}
	},
	eventBind : function(args) {
		// 获取选项卡的按钮
		var selectBtns = $(".selectButton");
		// 获取选项卡
		var selectBar = $(".selectBar")[0];
		// 获取轮播图
		var cfBody = $(".cfBody")[0];
		var index = 0;
		if(util.isLTIE10()) {
			$("#typeArea").height(500);
		}
		// 为选项卡绑定点击事件
		selectBar.onclick = function(event) {
			if($(".cfItem>img").width()!=0) {
				$(".cfItem>img").width($(".cfItem>img:eq(0)").width());
			}
			// 如果点击到的为选项卡按钮
			if (event.target.className == "selectButton") {
				// 遍历选项卡按钮
				for ( var i = 0; i < selectBtns.length; i++) {
					// 为所有的选项卡按钮移除选中效果
					$(selectBtns[i]).removeClass("selectBtnClick");
					// 获取点击的是为第几个选项卡按钮
					if (event.target == selectBtns[i]) {
						index = i;
					}
				}
				// 为触发事件的选项卡按钮添加选中样式
				$(event.target).addClass("selectBtnClick");
				// 移动轮播图
				if (util.isLTIE10()) {

				} else {
					cfBody.style.left = -$(".cfItem>img").width() * index;
				}
			}
			if(!util.isLTIE10()) {
				var img = $(".cfItem>img").get(index);
				RGBaster.colors(img, {
					success : function(payload) {
						$("#typeArea").css("background-color", payload.secondary).css("transition", "all 250ms");
					}
				});
			}
		};
		$(window).resize(function(){
			if(util.isMobile()) {
				$(".cfItem>img").width(screen.width);
			} else {
				$(".cfItem>img").width($(".cfItem>img")[0].naturalWidth);
			}
		});
		// 图片自动轮播
		window.setInterval(function() {
			if($(".cfItem>img").width()!=0) {
				$(".cfItem>img").width($(".cfItem>img:eq(0)").width());
			}
			if(!util.isLTIE10()) {
				var img = $(".cfItem>img").get(index);
				RGBaster.colors(img, {
					success : function(payload) {
						$("#typeArea").css("background-color", payload.secondary).css("transition", "all 250ms");
					}
				});
			}
			if (util.isLTIE10()) {
				$(cfBody).animate({
					left : -$(".cfItem>img").width() * index
				});
			} else {
				cfBody.style.left = -$(".cfItem>img").width() * index;
			}
			for ( var i = 0; i < selectBtns.length; i++) {
				// 为所有的选项卡按钮移除选中效果
				$(selectBtns[i]).removeClass("selectBtnClick");
			}
			$(selectBtns[index]).addClass("selectBtnClick");
			index++;
			if (index == args.data.length) {
				index = 0;
			}
		}, 2000);
	}
};
