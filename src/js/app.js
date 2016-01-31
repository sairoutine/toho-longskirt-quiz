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

		return <div>
			Pixivの東方プロジェクトの絵がランダムに表示されます。<br />
			タグに「ロングスカート」がついているか当ててみましょう。<br />
			<a href="#" onclick={start} data="10">Start</a>
			<div>{ ctrl.loading() } </div>
		</div>;
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

		return <div>
			ロングスカートタグが<br />
			<a onclick={answer} href="#" data="1">ついている</a>　
			<a onclick={answer} href="#" data="0">ついていない</a><br />
			<div>{ ctrl.loading() }&nbsp;</div>
			<br />
			<img src={ "/image?url=" + ctrl.model().illust_url  } /><br />
		</div>;
	},

};



m.route(document.getElementById("root"), "/", {
	"/": Introduction,
	"/start": Start,
});
