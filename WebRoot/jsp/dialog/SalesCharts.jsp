<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">
<title>商品销量</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<link rel="stylesheet" href="css/common/common.css" type="text/css"></link>
<link rel="stylesheet" href="css/common/myddl.css" type="text/css"></link>
<script type="text/javascript" src="js/common/jquery-1.8.3.js"></script>
<script type="text/javascript" src="js/common/util.js"></script>
<script type="text/javascript" src="js/common/highcharts.js"></script>
<script type="text/javascript" src="js/common/exporting.js"></script>
<script type="text/javascript" src="js/common/myddl.js"></script>
<style type="text/css">
#container {
	float: left;
	width: calc(100% - 200px);
	box-sizing: border-box;
}

#typeMenu {
	float: left;
	width: 200px;
	box-sizing: border-box;
	border: 1px solid #e6e6e6;
	width: 200px;
	position: relative;
    top: 5px;
}

#typeMenu .ddlList {
	border: 1px solid #e6e6e6;
	left: -1px;
	z-index: 2;
}

@media screen and (max-width:720px) and (min-width:320px) {
	#container {
		float: none;
		width: 100%;
	}
	#typeMenu {
		float: none;
		position: absolute;
		font-size: 12px;
		top: 29px;
		width: 136px;
	}
	#typeMenu .ddlList {
		border: 1px solid #e6e6e6;
		left: -1px;
		z-index: 2;
		top: 26px !important;
	}
}

@media screen and (max-width:900px) and (min-width:720px) {
}
</style>
</head>

<body>
	<div id="container"></div>
	<div id="typeMenu"></div>
	<script type="text/javascript">
		var con = "";
		var option = {
			chart : {
				type : 'column'
			},
			title : {
				text : '京西商城商品销量'
			},
			subtitle : {
				text : 'Source: 京西商城'
			},
			xAxis : {
				type : 'category',
				labels : {
					rotation : 0,
					style : {
						fontSize : '13px',
						fontFamily : 'Verdana, sans-serif'
					}
				}
			},
			yAxis : {
				min : 0,
				title : {
					text : 'sales (件)'
				}
			},
			legend : {
				enabled : false
			},
			tooltip : {
				pointFormat : 'Sales in 2017: <b>{point.y:.1f} 件</b>'
			},
			series : [ {
				name : 'Population',
				data : [],
				dataLabels : {
					enabled : true,
					rotation : -90,
					color : '#FFFFFF',
					align : 'right',
					format : '{point.y:.1f}', // one decimal
					y : 10, // 10 pixels down from the top
					style : {
						fontSize : '13px',
						fontFamily : 'Verdana, sans-serif'
					}
				}
			} ]
		};
		$.post("queryRealAllGoods.action", {
			condition : con
		}, function(json) {
			$(json.rows).each(function() {
				option.series[0].data.push([ this.name, this.sales ]);
			});
			$('#container').highcharts(option);
			$(".highcharts-credits").remove();
		});
		new XDDL({
			renderTo : "#typeMenu",
			dataSource : "getTypeMenu.action",
			mapping : {
				key : "id",
				value : "menu"
			},
			defaultSelected : -1,
			defaultItems : [ {
				id : "-1",
				menu : "全部"
			} ],
			onClick : function(obj) {
				var key = $(obj).attr("key");
				if (key == -1) {
					con = "";
				} else {
					con = "WHERE G.TYPEMENUID = '" + key + "'";
				}
				$.post("queryRealAllGoods.action", {
					condition : con
				}, function(json) {
					option.series[0].data.length = 0;
					$(json.rows).each(function() {
						option.series[0].data.push([ this.name, this.sales ]);
					});
					$('#container').highcharts(option);
					$(".highcharts-credits").remove();
				});
			}
		});
		if (util.isLTIE10()) {
			$("#container").width($("#container").parent().width() - 200);
		}
	</script>
</body>
</html>
