$(function() {
	var ddl = new XDDL({
		renderTo : "#select_container",
		dataSource : [ {
			key : "1",
			value : "男"
		}, {
			key : "0",
			value : "女"
		} ],
		defaultSelected : "-1",
		defaultItems : [ {
			key : "-1",
			value : "--请选择--"
		} ],
		onLoad : function() {
			loadFriends();
		}
	});
	$(".btnArea>i").click(function() {
		loadFriends();
	});
	$("body").click(function(event){
		if(event.target.className == "groupList" || event.target.className == "groupItem" || event.target.className == "groupRadio" || event.target.className == "groupTitle"){
			return;
		}
		$(".groupList").addClass("hidden");
	});
});
var friendsCard = {
	init : function(args) {
		friendsCard.getDataByDataSource(args);
	},
	getDataByDataSource : function(args) {
		if (typeof args.dataSource == "string") {
			$.ajax({
				url : args.dataSource,
				type : "POST",
				data : args.ajaxData,
				success : function(json) {
					args.data = json;
					$.post("queryById.action",{
						userId  : $(".Container").attr("uid")
					},function(json){
						args.user = json;
						friendsCard.build(args);
					});
				}
			});
		} else {
			args.data = args.dataSource;
			friendsCard.build(args);
		}
	},
	build : function(args) {
		var renderTo = args.renderTo;
		$(renderTo).html("");
		$(args.data.rows).each(function() {
			var uid = $(".Container").attr("uid");
			if (this.id != uid) {
				var resultItem = $("<div class='resultItem'></div>").appendTo(renderTo);
				$("<div class='userFace'><img alt='炸了' src='img/" + this.face + "'></div>").appendTo(resultItem);
				var userInfo = $("<div class='userInfo'></div>").appendTo(resultItem);
				$("<div class='userName'><span>" + this.name + "</span></div>").appendTo(userInfo);
				var sexIcon = "";
				var bgColor = "";
				if (this.sex == "男") {
					sexIcon = "♂";
					bgColor = "#71B8FC";
				} else {
					sexIcon = "♀";
					bgColor = "#f99f9f";
				}
				$("<div class='sex'><div class='sexDiv' style='background-color:" + bgColor + "'><span>" + sexIcon + "</span></div></div>").appendTo(userInfo);
				var address = "";
				if (this.addresses[0] == null) {
					address = "未知";
				} else {
					address = this.addresses[0].area.split(" ")[1];
				}
				$("<div class='address' title='"+ address +"'><span>" + address + "</span></div>").appendTo(userInfo);
				var userIdArr = [];
				$(args.user.friends).each(function(i,t){
					userIdArr.push(t.id);
				});
				if (userIdArr.indexOf(this.id) > -1) {
					$("<div class='addFriend bgChange' friendId='" + this.id + "'><span>加好友</span></div>").appendTo(resultItem);
				} else {
					$("<div class='addFriend' friendId='" + this.id + "'><span>加好友</span></div>").appendTo(resultItem);
				}
			}
		});
		friendsCard.eventBind(args);
	},
	eventBind : function(args) {
		var friendId = "";
		var t = "";
		$(".addFriend").click(function(event){
			if ($(this).hasClass("bgChange")) {
				return;
			}
			$(".groupList").css("top", event.pageY).css("left", event.pageX);
			$(".groupList").removeClass("hidden");
			if(top.window.frames['chatIframe'].document.body.scrollWidth > 1000){
				$(".groupList").css("top", event.pageY).css("left", event.pageX - 119);
			}
			friendId = $(this).attr("friendId");
			t = $(this);
			event.stopPropagation();
		});
		$(".Btn").click(function(){
			$(".groupList").addClass("hidden");
			var tag = $(".groupRadio:checked").val();
			$.post("addFriend.action", {
				tag : tag,
				friendId : friendId
			}, function(json) {
				if (json.isSuccess == "true") {
					t.addClass("bgChange");;
				} else {
					alert(json.errMsg);
				}
			});
		});
	}
};

function loadFriends() {
	var con = "";
	var userName = $("#userName").val();
	if (userName != "")
		con += "NAME LIKE '%" + userName + "%' AND ";
	var sex = $("#select_container .ddlItemSelected").attr("key");
	if (sex != "-1") {
		if (sex == "1") {
			sex = "男";
		} else {
			sex = "女";
		}
		con += "SEX = '" + sex + "' AND ";
	}
	con = "WHERE " + con + " 1=1";
	friendsCard.init({
		renderTo : "#resultContainer",
		dataSource : "getAllUserByPage.action",
		ajaxData : {
			condition : con,
			pageNum : 1,
			pageSize : 100
		}
	});
}