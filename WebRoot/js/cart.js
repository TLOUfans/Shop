$(function() {
	grid4Cart.init({
		renderTo : "#cartGrid",
		column : [ {
			name : "编号",
			alias : "id",
			hide : "true"
		}, {
			name : "全选",
			alias : "goods",
			align : "center",
			formatter : function(cellValue) {
				var html = "";
				html += "<img class='goodsImg' src='img/" + cellValue.smImgs[0].url + "' url='img/" + cellValue.smImgs[0].url + "'/>";
				return html;
			}
		}, {
			name : "商品",
			alias : "goods",
			formatter : function(cellValue) {
				var html = "";
				html += "<span class='txtGoodsName' goodsId='" + cellValue.id + "'>" + cellValue.name + "</span>";
				return html;
			}
		}, {
			name : "单价",
			alias : "goods",
			align : "right",
			formatter : function(cellValue) {
				var html = "";
				html += "<span>￥" + cellValue.price.replace(/^\s\s*/, '').replace(/\s\s*$/, '') + "</span>";
				return html;
			}
		}, {
			name : "购买数量",
			alias : "goodsNum",
			align : "center",
			formatter : function(cellValue) {
				var html = "";
				if (cellValue > 99)
					cellValue = 99;
				html += "<div class='goodsNumArea' style='position:relative;'><span class='minusBtn'>-</span><input type='text' value='" + cellValue + "' class='goodsNumInput' maxlength='2'/><span class='addBtn'>+</span><div class='errNum hidden'>库存不足</div></div>";
				return html;
			}
		} ],
		dataSource : "queryCartByUserId.action",
		onClickRow : function() {

		},
		onLoad : function() {
			dialog.init();
		}
	});
});