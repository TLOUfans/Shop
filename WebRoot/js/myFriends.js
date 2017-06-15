$(function(){
	loadMyFriends($(".title:first")[0]);
	$(".title:first").children(".title_text").next().addClass("hidden");
	$(".title").click(function(){
		if($(this).next().hasClass("heightEq0")){
			$(".resultContainer").addClass("heightEq0");
			$(this).next().removeClass("heightEq0");
			$(".title").children(".title_text").next().removeClass("hidden");
			$(this).children(".title_text").next().addClass("hidden");
			loadMyFriends(this);
		}else{
			$(this).next().addClass("heightEq0");
			$(this).children(".title_text").next().removeClass("hidden");
		}
	});
});

var myFriends = {
		init : function(args){
			myFriends.getDataByDataSource(args);
		},
		getDataByDataSource : function(args){
			if(typeof args.dataSource == "string"){
				$.ajax({
					url : args.dataSource,
					type : "POST",
					data : args.ajaxData,
					success : function(json){
						var obj = json;
						args.data = obj;
						myFriends.build(args);
					}
				});
			} else {
				args.data = args.dataSource;
				myFriends.build(args);
			}
		},
		build : function(args){
			var renderTo = args.renderTo;
			$(renderTo).html("");
			if(args.data.rows[0] != null){
				$(args.data.rows[0].friend).each(function(){
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
					$("<div class='money'><span>余额：￥</span><span>" + this.money + "</span></div>").appendTo(userInfo);
					$("<div class='toChat'><span>聊天</span></div>").appendTo(resultItem);
					$("<div class='deleteFriend' friendId='" + this.id + "'><span>删除</span></div>").appendTo(resultItem);
				});
			}
			myFriends.eventBind();
		},
		eventBind : function(){
			$(".deleteFriend").click(function(){
				var t = $(this);
				$.post("deleteFriend.action",{
					friendId : $(this).attr("friendId")
				},function(json){
					if(json.isSuccess == "true"){
						t.parent().remove();
					}else{
						alert("删除好友失败");
					}
				});
			});
			$(".toChat").click(function(event){
					var friendId = $(this).next().attr("friendId");
					location.href = "jsp/chat.jsp?friendId=" + friendId;
			});
		}
};

function loadMyFriends(t){
	var tag = $(t).attr("tag");
	var uid = $(".Container").attr("uid");
	con = "WHERE T2.ID = '"+ uid + "' AND T1.TAG = "+ tag;
	myFriends.init({
		renderTo : $(t).next(),
		dataSource : "queryByGroup.action",
		ajaxData : {
			condition : con,
			pageNum : 1,
			pageSize : 10
		}
	});
}
