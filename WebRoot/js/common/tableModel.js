var tableModel = {
	init:function(){
		var table = $("<table class='grid hidden' id='grid' cellpadding='0' cellspacing='0'></table>").appendTo("body");
		var tr0 = "<tr class='gridTR'><td class='gridTD'>姓名</td><td class='gridTD'>年龄</td><td class='gridTD'>性别</td><td class='gridTD'>手机</td></tr>";
		var tr1 = "<tr class='gridTR'><td class='gridTD'>小明</td><td class='gridTD'>18</td><td class='gridTD'>男</td><td class='gridTD'>110</td></tr>";
		var tr2 = "<tr class='gridTR'><td class='gridTD'>小徐</td><td class='gridTD'>19</td><td class='gridTD'>女</td><td class='gridTD'>119</td></tr>";
		var tr3 = "<tr class='gridTR'><td class='gridTD'>小王</td><td class='gridTD'>20</td><td class='gridTD'>男</td><td class='gridTD'>119</td></tr>";
		$(tr0).appendTo(table);
		$(tr1).appendTo(table);
		$(tr2).appendTo(table);
		$(tr3).appendTo(table);
		$("#btnBulid").click(function(){
			tableModel.show();
		});
	},
	show:function(){
		top.$("#grid").removeClass("hidden");
	},
	hide:function(){
		top.$("#grid").addClass("hidden");
	}
};