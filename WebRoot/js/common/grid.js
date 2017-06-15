var grid = {
	// 初始化函数
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
		grid.getDataByDataSource(args);
	},
	reload : function(renderTo, pageSize, pageNum) {
		var args = $(renderTo).data("args");
		if (pageSize) {
			args.ajaxData.pageNum = pageNum;
		}
		if (pageNum) {
			args.ajaxData.pageSize = pageSize;
		}
		grid.init(args);
	},
	// 获取数据
	getDataByDataSource : function(args) {
		// 判断传入的数据是否是数组
		if (typeof (args.dataSource) == "string") {
			$.ajax({
				url : args.dataSource,
				type : "POST",
				dataType : "text",
				data : args.ajaxData,
				success : function(json) {
					args.data = eval("(" + json + ")");
					grid.build(args);
				}
			});
			// 判断传入的数据是否是字符串
		} else {
			grid.build(args);
		}
	},
	// 拼接节点，根据传来的参数设置值
	build : function(args) {
		$(args.renderTo).html("");
		var table = $("<table class='grid' id='grid' cellpadding='0' cellspacing='0'></table>").appendTo(args.renderTo);
		var thead = $("<thead></thead>").appendTo(table);
		var count = 0;
		$(args.column).each(function(i, col) {
			if (col.hide != "true" && col.hide != true)
				count++;
		});
		$(args.column).each(function(i3, col) {
			var th = $("<th class='gridTD'></th>").text(col.name).appendTo(thead);
			if (col.hide == "true") {
				th.addClass("hidden");
			} else {
				$(th).attr("style", "width:" + (100 / count + "%"));
			}
		});
		$(args.data.rows).each(function(i, row) {
			var tr = $("<tr class='gridTR' style='" + (1 / args.column.length + '%') + "'></tr>").appendTo(table);
			$(args.column).each(function(i2, col) {
				var cellValue = row[col.alias];
				var newValue = cellValue;
				if (col.formatter != null && $.isFunction(col.formatter)) {
					newValue = col.formatter(cellValue);
				}
				if (col.originalValueFormatter != null && $.isFunction(col.originalValueFormatter)) {
					cellValue = col.originalValueFormatter(cellValue);
				}
				var td = $("<td class='gridTD' alias='" + col.alias + "' originalValue='" + cellValue + "'>" + newValue + "</td>").appendTo(tr);
				if (col.hide == "true") {
					td.addClass("hidden");
				}
				if (col.align != null) {
					td.addClass("text" + col.align);
				}
			});
		});
		if (args.load != null && $.isFunction(args.load)) {
			args.load();
		}
		var pagerTable = $("<table class='pagerTable' cellpadding='0' cellspacing='0'></table>").appendTo(args.renderTo);
		var pagerTr = $("<tr></tr>").appendTo(pagerTable);
		var html = "";
		html += "<td width='100'>共<span class='itemCount'>" + args.data.total + "</span>项</td>";
		html += "<td width='70'>每页显示</td>";
		html += "<td width='80'><div class='pagerDdl'></div></td><td>项</td>";
		html += "<td width='80'><div class='pagePrev pagerBtn'>上一页</div></td>";
		html += "<td width='80' style='text-align:center;'><span class='currentPage'>" + args.ajaxData.pageNum + "</span>/<span class='totalPage'>" + Math.ceil(args.data.total / args.ajaxData.pageSize) + "</span></td>";
		html += "<td width='80'><div class='pageNext pagerBtn'>下一页</div></td>";
		$(pagerTr).html(html);
		grid.eventBind(args);
	},
	eventBind : function(args) {
		ddl.init({
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
				grid.reload(args.renderTo, $(".pagerDdl .ddlItemSelected", args.renderTo).attr("key"), 1);
			}
		});
		$(args.renderTo).children("table").first().find("tbody>tr").click(function() {
			var flag = true;
			if ($(this).hasClass("selectRow")) {
				$(this).removeClass("selectRow");
				flag = false;
			} else {
				$("tr", args.renderTo).removeClass("selectRow");
				$(this).addClass("selectRow");
				flag = true;
			}
			if (args.onClickRow != null && $.isFunction(args.onClickRow))
				args.onClickRow(flag);
		});
		$(".pageNext", args.renderTo).click(function() {
			var currentPage = $(".currentPage", args.renderTo).text();
			var maxPage = $(".totalPage").text();
			var page = +currentPage + 1;
			page = page > maxPage ? maxPage : page;
			$(".currentPage", args.renderTo).text(page);
			grid.reload(args.renderTo, $(".pagerDdl .ddlItemSelected", $(args.renderTo)).attr("key"), page);
			if (args.onPageChange != null && $.isFunction(args.onPageChange)) {
				args.onPageChange();
			}
		});
		$(".pagePrev", args.renderTo).click(function() {
			var currentPage = $(".currentPage", args.renderTo).text();
			var page = +currentPage - 1;
			page = page < 1 ? 1 : page;
			$(".currentPage", args.renderTo).text(page);
			grid.reload(args.renderTo, $(".pagerDdl .ddlItemSelected", $(args.renderTo)).attr("key"), page);
			if (args.onPageChange != null && $.isFunction(args.onPageChange)) {
				args.onPageChange();
			}
		});
	}
};