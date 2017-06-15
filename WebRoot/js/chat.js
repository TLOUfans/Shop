$(function() {
	var userId = $("#logoContainer").attr("userid");
	var friendId = "";
	var goodsId = "";
	if(top.window.frames['chatIframe'].contentWindow) {
		friendId = util.string.getQueryString("friendId");
		goodsId = util.string.getQueryString("goodsId");
	} else {
		friendId = util.string.getQueryString("friendId");
		goodsId = util.string.getQueryString("goodsId");
	}
	if(goodsId != "" && goodsId != null){
		$.post("queryGoodsById.action",{
			id : goodsId
		},function(json){
			$.post("addChat.action", {
				content : "<div><img src='img/"+ json.smImgs[0].url +"' width=100'/></div><div class='goodsName'>"+json.name+"</div>",
				receiverId : friendId
			}, function(json) {
				if (json.isSuccess == "true") {
					getChat("#messageList", condition);
				} else {
					alert(json.errMsg);
				}
			});
		});
	}
	if(top.sessionStorage.downloadPath != "null" && top.sessionStorage.downloadPath != "undefined"){
		$.post("addChat.action", {
			content : "<div><a href='"+ top.sessionStorage.downloadPath +"'target='_blank'>"+ top.sessionStorage.downloadPath +"</a></div>",
			receiverId : friendId
		}, function(json) {
			if (json.isSuccess == "true") {
			} else {
				alert(json.errMsg);
			}
			top.sessionStorage.downloadPath = null;
		});
	}
	$("#messageTxt").focus().keydown(function(event) {
		if (event.which == 13 && event.ctrlKey) {
			$("#sendBtn").click();
		}
	});
	$.post("queryById.action", {
		userId : friendId
	}, function(json) {
		$("<img alt='' src='img/" + json.face + "' width='30' height='30'>").appendTo("#logoContainer");
		$("<span id='logoUsername'>" + json.name + "宝宝</span>").appendTo("#logoContainer");
	});
	$('.toolEmotion').qqFace({
		assign : 'messageTxt', // 给输入框赋值
		path : 'img/arclist/' // 表情图片存放的路径
	});
	var color = "";
	$(".toolColor").colpick({
		flat : true,
		layout : 'hex',
		submit : 0,
		onChange :function(obj,resColor){
			color = resColor;
			$("#messageTxt").css("color",color);
		}
	});
	$(".toolColor").children().addClass("hidden");
	$(".toolColor").click(function(event) {
		$(this).children().removeClass("hidden");
		if($(".controlEmotion").hasClass("click")) {
			$(".controlEmotion").removeClass("click");
			$("#facebox").click();
		}
		event.stopPropagation();
	});
	$("body").click(function() {
		if($(".controlEmotion").hasClass("click") && !$(".toolColor").children().hasClass("hidden")) {
			return;
		}
		$(".controlEmotion").removeClass("click");
		$(".toolColor").children().addClass("hidden");
		$(".exContainer").removeClass("exchangeShow");
	});
	$("#exchangeM").click(function(event){
		$(".exContainer").addClass("exchangeShow");
		event.stopPropagation();
	});
	$(".exContainer").click(function(event){
		event.stopPropagation();
	});
	$(".exBtn").click(function(event){
		$(".exContainer").removeClass("exchangeShow");
		var money = $(".putMoney").val();
		$(".putMoney").val("");
		if(/^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/.test(money)){
			$.post("updateMoneyByExchange.action",{
				money : money,
				friendId : friendId
			},function(json){
				if(json.isSuccess == "true"){
					$.post("addChat.action", {
						content : "<div class='exMsgT'><div class='exIcon'><i class='fa fa-exchange fa-2x'></i></div><div class='exCount'><span>转账金额</span><span>"+ money +"元</sapn></div></div><div class='exMsgB'>转账</div>",
						receiverId : friendId
					}, function(json) {
						if (json.isSuccess == "true") {
						} else {
							alert(json.errMsg);
						}
					});
				}else{
					alert("转账失败");
				}
			});
		}else{
			alert("转账失败");
		}
	});
	$(".controlEmotion").click(function(event) {
		if ($("#facebox")[0] == null) {
			$(this).addClass("click");
			$(".toolEmotion").click();
			if (!$(".toolColor").children().hasClass("hidden")) {
				$(".toolColor").children().addClass("hidden");
			}
		} else {
			$(this).removeClass("click");
		}
		event.stopPropagation();
	});
	var fontWeight = "";
	$(".toolBold").click(function(){
		if($(this).hasClass("getBold")){
			$(this).removeClass("getBold");
			$("#messageTxt").css("font-weight","normal");
		}else{
			$(this).addClass("getBold");
			$("#messageTxt").css("font-weight","bold");
		}
	});
	var condition = $(".msgLine:last-child")[0] == null ? " WHERE USERID='" + userId + "' AND RECEIVERID='" + friendId + "' OR USERID='" + friendId + "' AND RECEIVERID='" + userId + "'" : " WHERE (USERID='" + userId + "' AND RECEIVERID='" + friendId + "' OR USERID='" + friendId + "' AND RECEIVERID='" + userId + "') AND C.CREATETIME > (SELECT CREATETIME FROM T_CHAT WHERE ID='" + $(".msgLine:last-child").attr("chatid") + "')";
	getChat("#messageList", condition);
	$("#sendBtn").click(function() {
		var content = $("#messageTxt").val();
		if (content.trim() == "" || content == null) {
			return;
		}
		if ($(this).hasClass("sending")) {
			return;
		}
		$(this).addClass("sending");
		var receiverId = friendId;
		if (receiverId != null) {
			condition = $(".msgLine:last-child")[0] == null ? " WHERE USERID='" + userId + "' AND RECEIVERID='" + receiverId + "'" : " WHERE USERID='" + userId + "' AND RECEIVERID='" + receiverId + "' AND C.CREATETIME > (SELECT CREATETIME FROM T_CHAT WHERE ID='" + $(".msgLine:last-child").attr("chatid") + "')";
		}
		if($(".toolBold").hasClass("getBold")){
			fontWeight = "font-weight:bold;";
		} else {
			fontWeight = "";
		}
		$.post("addChat.action", {
			content : "<span style='color:#"+color+";"+ fontWeight +"'>"+ replace_em(content) +"</span>",
			receiverId : receiverId
		}, function(json) {
			if (json.isSuccess == "true") {
				$("#messageTxt").val("");
				getChat("#messageList", condition);
			} else {
				alert(json.errMsg);
			}
		});
		setTimeout(function() {
			$("#sendBtn").removeClass("sending");
		}, 1000);
	});
	
	setInterval(function() {
		var userId = $("#logoContainer").attr("userid");
		var receiverId = friendId;
		if (receiverId != null) {
			condition = $(".msgLine:last-child")[0] == null ? " WHERE USERID='" + userId + "' AND RECEIVERID='" + receiverId + "' OR USERID='" + receiverId + "' AND RECEIVERID='" + userId + "'" : " WHERE (USERID='" + userId + "' AND RECEIVERID='" + receiverId + "' OR USERID='" + receiverId + "' AND RECEIVERID='" + userId + "') AND C.CREATETIME > (SELECT CREATETIME FROM T_CHAT WHERE ID='" + $(".msgLine:last-child").attr("chatid") + "')";
		} else {
			condition = $(".msgLine:last-child")[0] == null ? " WHERE RECEIVERID IS NULL" : " WHERE RECEIVERID IS NULL AND C.CREATETIME > (SELECT CREATETIME FROM T_CHAT WHERE ID='" + $(".msgLine:last-child").attr("chatid") + "')";
		}
		getChat("#messageList", condition);
	}, 1000);
});

function getChat(renderTo, condition) {
	$.post("queryAllChat.action", {
		condition : condition
	}, function(json) {
		$(json.rows).each(function() {
			var msgLine = $("<div class='msgLine' chatid='" + this.id + "'></div>").appendTo(renderTo);
			if (this.user.id == $("#logoContainer").attr("userid")) {
				msgLine.addClass("me");
				var userFaceContainer = $("<div class='userFaceContainer'><span class='userInfo'>" + this.user.name + "  " + this.createTime + "</span></div>").appendTo(msgLine);
				$("<img class='userFace' src='img/" + this.user.face + "' width='35' height='35'/>").appendTo(userFaceContainer);
			} else {
				var userFaceContainer = $("<div class='userFaceContainer'><img class='userFace' src='img/" + this.user.face + "' width='35' height='35'/></div>").appendTo(msgLine);
				$("<span class='userInfo'>" + this.user.name + "  " + this.createTime + "</span>").appendTo(userFaceContainer);
			}
			if (this.content.indexOf("[em_") > -1) {
				$("<div class='msgContent'></div>").html(replace_em(this.content)).appendTo(msgLine);
			} else {
				$("<div class='msgContent'></div>").html(this.content).appendTo(msgLine);
			}
			setTimeout(function(){
				$(".msgContent:last").addClass("msgContentBig");
			},1);
			setTimeout(function(){
				$(".msgContent:last").removeClass("msgContentBig");
			},251);
		});
		if ($("#autoScollBtn").prop("checked")) {
			$(renderTo).scrollTop($(renderTo)[0].scrollHeight);
		}
	});
}
function replace_em(str) {
	str = str.replace(/\</g, '&lt;');
	str = str.replace(/\>/g, '&gt;');
	str = str.replace(/\n/g, '<br/>');
	str = str.replace(/\[em_([0-9]*)\]/g, '<img src="img/arclist/$1.gif" border="0" />');
	return str;
} 

