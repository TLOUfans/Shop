$(function() {
	var condition = $(".msgLine:last-child")[0] == null ? "WHERE RECEIVERID IS NULL" : " WHERE RECEIVERID IS NULL AND C.CREATETIME > (SELECT CREATETIME FROM T_CHAT WHERE ID='" + $(".msgLine:last-child").attr("chatid") + "')";
	$("#messageTxt").focus().keydown(function(event) {
		if (event.which == 13 && event.ctrlKey) {
			$("#sendBtn").click();
		}
	});
	getChat("#messageList", condition);
	getActiveUsers();
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
	$("#sendBtn").click(function() {
		var content = $("#messageTxt").val();
		if (content.trim() == "" || content == null) {
			return;
		}
		if ($(this).hasClass("sending")) {
			return;
		}
		$(this).addClass("sending");
		var receiverId = $(".selectUserItem").attr("uid");
		var userId = $("#logoContainer").attr("userid");
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
	$(".userItem:first").addClass("selectUserItem");

	$("#exitBtn").click(function() {
		$.post("exit.action", function(json) {
			if (json.isSuccess == "true") {
				top.location.href = "jsp/login.jsp";
			} else {
				alert(json.errMsg);
			}
		});
	});

	setInterval(function() {
		var userId = $("#logoContainer").attr("userid");
		var receiverId = $(".selectUserItem").attr("uid");
		if (receiverId != null) {
			condition = $(".msgLine:last-child")[0] == null ? " WHERE USERID='" + userId + "' AND RECEIVERID='" + receiverId + "' OR USERID='" + receiverId + "' AND RECEIVERID='" + userId + "'" : " WHERE (USERID='" + userId + "' AND RECEIVERID='" + receiverId + "' OR USERID='" + receiverId + "' AND RECEIVERID='" + userId + "') AND C.CREATETIME > (SELECT CREATETIME FROM T_CHAT WHERE ID='" + $(".msgLine:last-child").attr("chatid") + "')";
		} else {
			condition = $(".msgLine:last-child")[0] == null ? " WHERE RECEIVERID IS NULL" : " WHERE RECEIVERID IS NULL AND C.CREATETIME > (SELECT CREATETIME FROM T_CHAT WHERE ID='" + $(".msgLine:last-child").attr("chatid") + "')";
		}
		getChat("#messageList", condition);
	}, 1000);
	setInterval(getActiveUsers, 5000);
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

function getActiveUsers() {
	$.post("getActiveUsers.action", function(json) {
		$("#userListTitle>span").text(json.length);
		$(".userItem").each(function(){
			var uid = $(this).attr("uid");
			var isHas = false;
			$(json).each(function(){
				if(uid == this.id) {
					isHas = true;
					return false;
				}
			});
			if(!isHas) {
				if($(this).text()!="公共聊天")
				$(this).remove();
			}
		});
		$(json).each(function() {
			if ($(".userItem[uid='" + this.id + "']").length > 0) {
				return true;
			}
			var userItemContainer = $("<div class='userItemContainer'>").appendTo("#userList");
			var userItem = $("<div class='userItem'></div>").attr("uid", this.id).appendTo(userItemContainer);
			$("<img src='img/" + this.face + "' />").appendTo(userItem);
			$("<span class='username'></span>").text(this.name).appendTo(userItem);
		});
		$(".userItem").unbind("click");
		$(".userItem").click(function() {
			$(".selectUserItem").removeClass("selectUserItem");
			$(this).addClass("selectUserItem");
			$("#messageList").children().remove();
			var receiverId = $(this).attr("uid");
			var userId = $("#logoContainer").attr("userid");
			if (receiverId != null) {
				condition = $(".msgLine:last-child")[0] == null ? " WHERE USERID='" + userId + "' AND RECEIVERID='" + receiverId + "' OR USERID='" + receiverId + "' AND RECEIVERID='" + userId + "'" : " WHERE (USERID='" + userId + "' AND RECEIVERID='" + receiverId + "' OR USERID='" + receiverId + "' AND RECEIVERID='" + userId + "') AND C.CREATETIME > (SELECT CREATETIME FROM T_CHAT WHERE ID='" + $(".msgLine:last-child").attr("chatid") + "')";
			} else {
				condition = $(".msgLine:last-child")[0] == null ? " WHERE RECEIVERID IS NULL" : " WHERE RECEIVERID IS NULL AND C.CREATETIME > (SELECT CREATETIME FROM T_CHAT WHERE ID='" + $(".msgLine:last-child").attr("chatid") + "')";
			}
			getChat("#messageList", condition);
		});
		$(".userItem").each(function() {
			if ($(this).attr("uid") == $("#logoContainer").attr("userid")) {
				$(this).remove();
			}
		});
	});
}
function replace_em(str) {
	str = str.replace(/\</g, '&lt;');
	str = str.replace(/\>/g, '&gt;');
	str = str.replace(/\n/g, '<br/>');
	str = str.replace(/\[em_([0-9]*)\]/g, '<img src="img/arclist/$1.gif" border="0" />');
	return str;
} 