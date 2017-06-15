$(function() {
	$(".imgDiv").hover(function() {
		$(this).find(".imgName").removeClass("hidden");
	}, function() {
		$(this).find(".imgName").addClass("hidden");
	});
	$(".imgName").click(function() {
		imgURL = $(this).prev().find("img").attr("src");
		top.$("#main").css("color","#424E67");
		top.$("#main").find("#menuBG").css("background-color","#E4E9EC !important");
		if ($(this).hasClass("color")) {
			top.$("#main").css("color","#fff");
			top.$("#main").find("#menuBG").css("background-color","#88adc1 !important");
		}
		top.$("#main").css("background-image", "url(" + imgURL + ")");
		//cookie保存页面背景
		var user = top.$("#shopName").attr("userId");
		var backdrop = top.$("#main").css("background-image");
		var color = top.$("#main").css("color");
		var menuBG = top.$("#main").find("#menuBG").css("background-color");
		util.cookie.set(user, backdrop + "-" + color + "-" + menuBG);	
		
	});
});
