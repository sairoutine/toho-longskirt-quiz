var m = require('mithril');

var Question = function() {
	return m.request({method: "GET", url: "/question"});
};


var Introduction = {
	controller: function() {},
	view: function() {
		return {tag: "div", attrs: {}, children: [
			"Pixivの東方プロジェクトの絵がランダムに表示されます。", {tag: "br", attrs: {}}, 
			"タグに「ロングスカート」がついているか当ててみましょう。", {tag: "br", attrs: {}}, 
			{tag: "a", attrs: {href:"/start", config:m.route}, children: ["Start"]}
		]};
	}
};

var Start = {
	controller: function() {
		this.model = new Question();
	},
	view: function(ctrl) {
		this.answer = function(e) {
			e.preventDefault();

			var user_answer = e.target.getAttribute('data');
			var is_long_skirt = ctrl.model().is_long_skirt;
			if(is_long_skirt == user_answer){
				alert('正解');
			}
			else{
				alert('不正解');
			}
			m.route('/start');
		};

		return {tag: "div", attrs: {}, children: [
			"ロングスカートタグが", {tag: "br", attrs: {}}, 
			{tag: "a", attrs: {onclick:this.answer, href:"#", data:"1"}, children: ["ついている"]}, "　", 
			{tag: "a", attrs: {onclick:this.answer, href:"#", data:"0"}, children: ["ついていない"]}, {tag: "br", attrs: {}}, 
			{tag: "br", attrs: {}}, 
			{tag: "img", attrs: {src: "/image?url=" + ctrl.model().illust_url}}, {tag: "br", attrs: {}}
		]};
	},

};



m.route(document.getElementById("root"), "/", {
	"/": Introduction,
	"/start": Start,
});
