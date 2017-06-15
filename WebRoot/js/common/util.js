var util = {
	cookie : {
		set : function(name, value) {
			var days = 7;
			var exp = new Date();
			exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
			document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
		},
		get : function(name) {
			var arr = document.cookie.match(new RegExp("(^|)" + name + "=([^;]*)(;|$)"));
			if (arr != null)
				return unescape(arr[2]);
			return null;
		}
	},
	string : {
		// 全局替换
		replaceAll : function(s1, s2, s3) {
			return (s1 + "").replace(s2, s3);
		},
		// 正则验证
		validate : function(str, type) {
			var reg = "";
			var rules = {
				c : "\\u4e00-\\u9fa5",
				e : "A-Za-z",
				n : "0-9",
				m : "\\-",
				_ : "\\_",
				p : "\\. +，！（）(),"
			};
			if (str == "" || str == null || type == "" || type == null) {
				return false;
			}
			for ( var rule in rules) {
				if (type.indexOf(rule) > -1) {
					reg += rules[rule];
				}
			}
			return eval("/^[" + reg + "]*$/").test(str);
		},
		ieTrim : function(str) {
			return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
		},
		roundFun : function(numberRound, roundDigit) {
			if (numberRound >= 0) {
				var tempNumber = parseInt((numberRound * Math.pow(10, roundDigit) + 0.5)) / Math.pow(10, roundDigit);
				return tempNumber;
			} else {
				numberRound1 = -numberRound;
				var tempNumber = parseInt((numberRound1 * Math.pow(10, roundDigit) + 0.5)) / Math.pow(10, roundDigit);
				return -tempNumber;
			}
		},
		countSize : function(value) {
			if (null == value || value == '') {
				return "0 Bytes";
			}
			var unitArr = new Array("Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB");
			var index = 0;

			var srcsize = parseFloat(value);
			var quotient = srcsize;
			while (quotient > 1024) {
				index += 1;
				quotient = quotient / 1024;
			}
			return util.string.roundFun(quotient, 2) + "" + unitArr[index];
		},
		getQueryString : function(name) {
			var reg = new RegExp("(^|&)" + unescape(name) + "=([^&]*)(&|$)", "i");
			var r = window.location.search.substr(1).match(reg);
			if (r != null)
				return r[2];
			return null;
		}
	},
	isLTIE10 : function() {
		return $.browser.msie && $.browser.msie.version != "10.0";
	},
	isIE : function() {
		return navigator.userAgent.indexOf("MSIE") > -1 || navigator.userAgent.indexOf("rv:11") > -1;
	},
	isMobile : function() {
		var u = navigator.userAgent;
		return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 || !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
	},
	date : {
		afterSomeDay : function(day) {
			Date.prototype.Format = function(fmt) { // author: meizz
				var o = {
					"M+" : this.getMonth() + 1, // 月份
					"d+" : this.getDate(), // 日
					"h+" : this.getHours(), // 小时
					"m+" : this.getMinutes(), // 分
					"s+" : this.getSeconds(), // 秒
					"q+" : Math.floor((this.getMonth() + 3) / 3), // 季度
					"S" : this.getMilliseconds()
				// 毫秒
				};
				if (/(y+)/.test(fmt))
					fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
				for ( var k in o)
					if (new RegExp("(" + k + ")").test(fmt))
						fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
				return fmt;
			};
			var date = new Date();
			date.setTime(date.getTime() + (day * 24 * 60 * 60 * 1000));
			return date.Format("MM月dd日");
		}
	},
	number : {
		money : function(number) {
			Number.prototype.formatMoney = function(places, symbol, thousand, decimal) {
				places = !isNaN(places = Math.abs(places)) ? places : 2;
				symbol = symbol !== undefined ? symbol : "$";
				thousand = thousand || ",";
				decimal = decimal || ".";
				var number = this, negative = number < 0 ? "-" : "", i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "", j = (j = i.length) > 3 ? j % 3 : 0;
				return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
			};
			var number = new Number(number);
			return number.formatMoney(2, "￥");
		}
	},
	file : {
		preview : function(file, desArea) {
			if (file.files && file.files[0]) {
				var reader = new FileReader();
				reader.onload = function(event) {
					$("<img src='" + event.target.result + "'/>").prependTo($(desArea));
				};
				reader.readAsDataURL(file.files[0]);
			}
		}
	}
};