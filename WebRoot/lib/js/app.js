requirejs.config({
	baseUrl : '',
	paths : {
		jq : 'lib/js/jquery',
		bs : 'lib/js/bootstrap',
		util : 'js/common/util',
		article : 'lib/js/article',
		write : "lib/js/write"
	},
	shim : {
		bs : {
			deps : [ 'jq' ]
		},
		util : {
			deps : [ 'jq' ]
		},
		article : {
			deps : [ 'util' ]
		},
		write : {
			deps : [ 'jq' ]
		}
	}
});

require([ 'article', 'write' ], function(Article, Write) {
	var article = new Article({
		renderTo : "#articleContainer",
		dataSource : []
	});
	article.init();
	var write = new Write({
		renderTo : "#writeContainer",
		dataSource : []
	});
	write.init();
});