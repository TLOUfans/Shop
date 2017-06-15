define(function() {
	function Article(args) {
		this.renderTo = args.renderTo;
		this.dataSource = args.dataSource;
	}
	Article.prototype.init = function() {
		this.getDataByDataSource();
	};
	Article.prototype.getDataByDataSource = function() {
		var obj = this;
		if (typeof this.dataSource == "string") {
			$.ajax({
				url : this.dataSource,
				type : "POST",
				dataType : "JSON",
				success : function(json) {
					obj.data = json;
					obj.bulid();
				}
			});
		} else {
			this.data = this.dataSource;
			this.bulid();
		}
	};
	Article.prototype.bulid = function() {
		var articleContent = $("<div class='articleContent'></div>");
		var txtContent = $("<div class='txtContent'></div>").appendTo(articleContent);
		var txtTopArea = $("<div class='txtTopArea'></div>").appendTo(txtContent);
		$("<span class='userFace'><img src='img/face01.jpg' alt=''/></span>").appendTo(txtTopArea);
		$("<span class='userName'>小明</span>").appendTo(txtTopArea);
		$("<span class='createTime'>12小时前</span>").appendTo(txtTopArea);
		var txtCenterArea = $("<div class='txtCenterArea'></div>").appendTo(txtContent);
		$("<div class='txtTitle'><a href='#'>也许，这样理解HTTPS更容易</a></div>").appendTo(txtCenterArea);
		$("<div class='text'>转自我自己的博客：https://showme.codes/2017-02-20/understand-https/ 摘要：本文尝试一步步还原HTTPS的设计过程，以理解为什...</div>").appendTo(txtCenterArea);
		var txtBottomArea = $("<div class='txtBottomArea'></div>").appendTo(txtContent);
		$("<span class='txtType'>程序员</span>").appendTo(txtBottomArea);
		$("<span class='viewNum'><i class='fa fa-eye'></i>&nbsp;553</span>").appendTo(txtBottomArea);
		$("<span class='commontNum'><i class='fa fa-comment'></i>&nbsp;3</span>").appendTo(txtBottomArea);
		var imgContent = $("<div class='imgContent'></div>").appendTo(articleContent);
		articleContent.appendTo(this.renderTo);
	};
	Article.prototype.eventBind = function() {

	};
	return Article;
});