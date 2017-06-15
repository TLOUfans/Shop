$(function() {
	count.init({
		renderTo : "#count"
	});
});

var count = {
	init : function(args) {
		count.build(args);
	},
	build : function(args) {
		var renderTo = args.renderTo;
		$(renderTo).addClass("count");
		var inputArea = $("<div class='inputArea'></div>").appendTo(renderTo);
		$("<input type='text' name='' id='countInput' maxLength='2'/>").appendTo(inputArea);
		var operateArea = $("<div class='operateArea'></div>").appendTo(inputArea);
		$("<span class='addbtn opearteBtn'>+</span>").appendTo(operateArea);
		$("<span class='minusBtn opearteBtn'>-</span>").appendTo(operateArea);
		count.eventBind(args);
	},
	eventBind : function(args) {
		$("#countInput").val("1");
		$(".addbtn").click(function() {
			$("#countInput").val(+$("#countInput").val() + 1);
		});
		$(".minusBtn").click(function() {
			if (+$("#countInput").val() - 1 > 0)
				$("#countInput").val(+$("#countInput").val() - 1);
		});
		$("#countInput").keyup(function() {
			var regExp = new RegExp("^[0-9]*$");
			if (regExp.test($("#countInput").val())) {

			} else {
				$(this).val($(this).val().replace(/[^0-9]/ig, ""));
			}
			if ($("#countInput").val() == "0") {
				$(this).val("1");
			}
		});
		$("#countInput").blur(function() {
			if ($(this).val() == "") {
				$(this).val("1");
			}
		});
	}
};