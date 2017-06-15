define(function() {
	function Write(args) {
		this.renderTo = args.renderTo;
		this.dataSource = args.dataSource;
	}
	Write.prototype.init = function() {
		this.getDataByDataSource();
	};
	Write.prototype.getDataByDataSource = function() {
		if (typeof this.dataSouce == "string") {
			var obj = this;
			$.ajax({
				url : this.dataSource,
				type : "POST",
				dataType : "JSON",
				success : function(json) {
					obj.data = json;
					obj.build();
				}
			});
		} else {
			this.data = this.dataSource;
			this.build();
		}
	};
	Write.prototype.build = function() {
		var menuContent = $("<div id='menuContent'></div>");
		$("<div class='newBtn'><i class='fa fa-plus-circle'></i>&nbsp;&nbsp;新建文章</div>").appendTo(menuContent);
		$("<div class='articleBtn'><i class='fa fa-sticky-note'></i>&nbsp;&nbsp;未命名标题</div>").appendTo(menuContent);
		$("<div class='articleBtn'><i class='fa fa-sticky-note'></i>&nbsp;&nbsp;未命名标题</div>").appendTo(menuContent);
		menuContent.prependTo(this.renderTo);
		this.eventBind();
	};
	Write.prototype.eventBind = function() {
		$(".articleBtn:first").addClass("selectedArticle");
		$(".articleBtn").click(function() {
			$(".selectedArticle").removeClass("selectedArticle");
			$(this).addClass("selectedArticle");
		});
	};
	return Write;
});