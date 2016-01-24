var m = require('mithril');

var Question = function() {
	return m.request({method: "GET", url: "/question"});
};


var Introduction = {
	controller: function() {},
	view: function() {
		return <div>
			Pixivの東方プロジェクトの絵がランダムに表示されます。<br />
			タグに「ロングスカート」がついているか当ててみましょう。<br />
			<a href="/start" config={m.route}>Start</a>
		</div>;
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

			var answer = is_long_skirt == user_answer ? "正解" : "不正解";

			if(is_long_skirt){
				alert(answer + '：ロングスカートタグがついてました');
			}
			else{
				alert(answer + '：ロングスカートタグはついてません');
			}
			m.route('/start');
		};

		return <div>
			ロングスカートタグが<br />
			<a onclick={this.answer} href="#" data="1">ついている</a>　
			<a onclick={this.answer} href="#" data="0">ついていない</a><br />
			<br />
			<img src={ "/image?url=" + ctrl.model().illust_url  } /><br />
		</div>;
	},

};



m.route(document.getElementById("root"), "/", {
	"/": Introduction,
	"/start": Start,
});
