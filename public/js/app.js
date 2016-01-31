var m = require('mithril');

var Question = function() {
	return m.request({method: "GET", url: "/question"});
};


var Introduction = {
	controller: function() {
		this.loading = m.prop();	
	},
	view: function(ctrl) {
		var start = function(e) {
			e.preventDefault();

			ctrl.loading("Now Loading...");

			setTimeout(function(){ m.route('/start');  },1);
		};

		return {tag: "div", attrs: {}, children: [
			"Pixivの東方プロジェクトの絵がランダムに表示されます。", {tag: "br", attrs: {}}, 
			"タグに「ロングスカート」がついているか当ててみましょう。", {tag: "br", attrs: {}}, 
			{tag: "a", attrs: {href:"#", onclick:start, data:"10"}, children: ["Start"]}, 
			{tag: "div", attrs: {}, children: [ ctrl.loading(), " "]}
		]};
	}
};

var Start = {
	controller: function() {
		this.model = new Question();
		this.loading = m.prop();	
	},
	view: function(ctrl) {
		var answer = function(e) {
			e.preventDefault();

			var user_answer = e.target.getAttribute('data');
			var is_long_skirt = ctrl.model().is_long_skirt;

			var answer = is_long_skirt == user_answer ? "正解" : "不正解";

			if(is_long_skirt){
				alert(answer + '：ロングスカートタグがついてました');
			}
			else{
				alert(answer + '：ロングスカートタグはついてません');
			}
			ctrl.loading("Now Loading...");

			setTimeout(function(){
				m.route('/start');
			},1);
		};

		return {tag: "div", attrs: {}, children: [
			"ロングスカートタグが", {tag: "br", attrs: {}}, 
			{tag: "a", attrs: {onclick:answer, href:"#", data:"1"}, children: ["ついている"]}, "　", 
			{tag: "a", attrs: {onclick:answer, href:"#", data:"0"}, children: ["ついていない"]}, {tag: "br", attrs: {}}, 
			{tag: "div", attrs: {}, children: [ ctrl.loading(), " "]}, 
			{tag: "br", attrs: {}}, 
			{tag: "img", attrs: {src: "/image?url=" + ctrl.model().illust_url}}, {tag: "br", attrs: {}}
		]};
	},

};



m.route(document.getElementById("root"), "/", {
	"/": Introduction,
	"/start": Start,
});
