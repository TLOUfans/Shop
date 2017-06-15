var executeNum = 0;
$(function() {
	var orderId = location.search.split("=")[1];
	if (orderId == null) {
		location.href = "jsp/typeList.jsp";
	}
	var userId = $(".navLogin").attr("userId");
	var con = " WHERE USERID='" + userId + "' AND ID='" + orderId + "' AND STATUS=3 AND 1=1";
	commentModule.init({
		renderTo : "#commentContainer",
		dataSource : "queryOrderByPage.action",
		ajaxData : {
			condition : con,
			pageSize : 10,
			pageNum : 1
		}
	});
});

var commentModule = {
	init : function(args) {
		commentModule.getDataByDataSource(args);
	},
	getDataByDataSource : function(args) {
		if (typeof args.dataSource == "string") {
			$.ajax({
				url : args.dataSource,
				type : "POST",
				data : args.ajaxData,
				success : function(json) {
					var obj = json;
					args.data = obj;
					commentModule.build(args);
				}
			});
		} else {
			args.data = args.dataSource;
			commentModule.build(args);
		}
	},
	build : function(args) {
		var renderTo = args.renderTo;
		var order = args.data.rows[0];
		var titleArea = $("<div id='titleArea'></div>").appendTo(renderTo);
		$("<div id='title'>评价订单</div>").appendTo(titleArea);
		var orderDes = $("<div id='orderDes'></div>").appendTo(titleArea);
		$("<span>订单号：</span><span id='orderNum'>" + order.orderNum + "</span>").appendTo(orderDes);
		$("<span>" + order.beginTime + "</span>").appendTo(orderDes);
		// 遍历
		$(order.orderGoodsList).each(function(i, o) {
			var orderArea = $("<div class='orderArea'></div>").appendTo(renderTo);
			var goodDesArea = $("<div class='goodDesArea'></div>").appendTo(orderArea);
			var goodsImg = $("<div class='goodsImg'></div>").appendTo(goodDesArea);
			$("<img src='img/" + this.goods.smImgs[0].url + "' alt='' />").appendTo(goodsImg);
			$("<div class='goodsName'>" + this.goods.name + "</div>").appendTo(goodDesArea);
			$("<div class='goodsPirce'>" + util.number.money(this.goods.price) + "</div>").appendTo(goodDesArea);
			var commentArea = $("<div class='commentArea'></div>").appendTo(orderArea);
			var line1 = $("<div class='line'></div>").appendTo(commentArea);
			$("<div class='commenTxt'>商品满意度</div>").appendTo(line1);
			var grade = $("<div class='grade'></div>").appendTo(line1);
			$("<i class='fa fa-star-o gradeNum'></i>").appendTo(grade);
			$("<i class='fa fa-star-o gradeNum'></i>").appendTo(grade);
			$("<i class='fa fa-star-o gradeNum'></i>").appendTo(grade);
			$("<i class='fa fa-star-o gradeNum'></i>").appendTo(grade);
			$("<i class='fa fa-star-o gradeNum'></i>").appendTo(grade);
			var line2 = $("<div class='line'></div>").appendTo(commentArea);
			$("<div class='commenTxt'>评价晒单</div>").appendTo(line2);
			var commentContentContainer = $("<div class='commentContentContainer'></div>").appendTo(line2);
			$("<textarea name='' goodsId='" + this.goods.id + "' class='textarea' placeholder='商品是否给力？快来分享你的购买心得吧！！' maxlength='500'></textarea>").appendTo(commentContentContainer);
			var uploadBtnArea = $("<div class='uploadBtnArea'></div>").appendTo(commentArea);
			$("<input type='button' value='上传图片' class='uploadBtn'/>").appendTo(uploadBtnArea);
			var form = $("<form action='upload.action' method='post' enctype='multipart/form-data' target='uploadIframe'></form>").appendTo(uploadBtnArea);
			$("<input type='file' class='fileUpload hidden' name='fileUpload' fileNo='0'/>").appendTo(form);
			$("<iframe src='' frameborder='0' class='hidden' name='uploadIframe' id='uploadIframe'></iframe>").appendTo(uploadBtnArea);
		});
		var confirmBtnArea = $("<div id='confirmBtnArea'></div>").appendTo(renderTo);
		$("<input type='button' value='提交评价' id='confirmBtn'/>").appendTo(confirmBtnArea);
		commentModule.eventBind(args);
	},
	eventBind : function(args) {
		// 点击上传图片按钮
		$(".uploadBtn").click(function() {
			if ($(".commentImgArea", $(this).parents(".uploadBtnArea")).size() >= 5) {
				return;
			}
			if (util.isMobile()) {
				return;
			}
			$(this).next().find(".fileUpload:eq(0)").click();
		});
		$(".fileUpload").change(commentModule.changeFun);
		// 点击提交按钮
		$("#confirmBtn").click(function() {
			var count = 0;
			$(".textarea").each(function() {
				if ($(this).val() == "") {
					count++;
				}
			});
			$(".grade").each(function() {
				if ($(".gradeNum[class*='redStar']", this).length < 1) {
					count++;
				}
			});
			if (count != 0) {
				alert("您有商品未评价");
				return;
			}
			$("form").find(".fileUpload").each(function() {
				if ($(this).val() == "") {
					$(this).remove();
				}
			});
			$("form:eq(0)")[0].submit();
		});
		$(".grade .gradeNum").on({
			mouseenter : function() {
				if ($(this).parent().hasClass("starClicked")) {
					return;
				}
				$(".gradeNum:gt(" + $(this).index() + ")", $(this).parent()).attr("class", "fa fa-star-o gradeNum");
				$(".gradeNum:lt(" + ($(this).index() + 1) + ")", $(this).parent()).attr("class", "fa fa-star gradeNum redStar");
			},
			click : function() {
				$(".gradeNum:gt(" + $(this).index() + ")", $(this).parent()).attr("class", "fa fa-star-o gradeNum");
				$(".gradeNum:lt(" + ($(this).index() + 1) + ")", $(this).parent()).attr("class", "fa fa-star gradeNum redStar");
				$(this).parent().addClass("starClicked");
			}
		});
		$(".grade").mouseleave(function() {
			if ($(this).hasClass("starClicked")) {
				return;
			}
			$(".gradeNum", this).attr("class", "fa fa-star-o gradeNum");
		});
	},
	changeFun : function() {
		var divNo = $(".commentImgArea").size();
		var commentImgArea = $("<div class='commentImgArea' divNo='" + divNo + "'></div>").insertBefore($(this).parent().prev());
		commentImgArea.click(commentModule.removeImg);
		var imgDiv = $(this).parent().prev().prev()[0];
		util.file.preview(this, imgDiv);
		var fileNo = $(".fileUpload").size();
		var fileUpload = $("<input type='file' class='fileUpload hidden' name='fileUpload' fileNo='" + fileNo + "'/>").insertBefore(this);
		$(fileUpload).change(commentModule.changeFun);
	}
};

function postGoodsInfo(allImgInfo) {
	var allImgInfo = allImgInfo.replace(/[\[\]\ ]/ig, "");
	console.log(allImgInfo);
	var textArea = $(".textarea:eq(" + executeNum + ")");
	$.post("addComment.action", {
		content : textArea.val(),
		grade : textArea.parent().parent().prev().find(".gradeNum[class*='redStar']").length,
		goodsId : textArea.attr("goodsId"),
		allImgInfo : allImgInfo
	}, function(json) {
		if (json.isSuccess == "true") {
			executeNum++;
			$("form:eq(" + executeNum + ")").submit();
			var textareaNum = 0;
			textareaNum = $(".textarea").size();
			if (executeNum == textareaNum) {
				$.post("updateOrder.action", {
					id : location.search.split("=")[1],
					status : 4
				}, function(json) {
					if (json.isSuccess == "true") {
						if (navigator.userAgent.indexOf("MSIE") > -1 || navigator.userAgent.indexOf("rv:11") > -1) {
							location.href = "order.jsp";
						} else {
							location.href = "jsp/order.jsp";
						}
					} else {
						alert(json.errMsg);
					}
				});
			}
		} else {
			alert(json.errMsg);
			return;
		}
	});
}