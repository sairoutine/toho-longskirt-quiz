'use strict';
var Promise = require('bluebird');
var Pixiv = require('node-pixiv');
var pixiv = new Pixiv();

var username = process.env.username;
var password = process.env.password;

var get_question = function() {
	var return_data = {
		is_long_skirt: null,
		title: null,
		id: null,
		illust_url: null,
	};

	// 答えがロングスカートか否か
	return_data.is_long_skirt = Math.floor(Math.random() * 2);

	var query, max_rand;
	if(return_data.is_long_skirt) {
		max_rand = 500;
		query = '東方Project ロングスカート';
	}
	else {
		// タグの最大ページ数
		max_rand = 10000;
		query = '東方Project100users入り';
	}

	var question_rand = Math.floor(Math.random()*max_rand + 1);

	return pixiv.login({
		username: username,
		password: password,
	})
	.then(function() {
		return pixiv.search({
			q: query,
			page: question_rand,
			per_page: 1,
			mode: 'tag',
			period: 'all',
			order: 'desc',
			sort: 'date',
			types: 'illustration',
		});
	})
	.then(function(data) {
		return_data.id = data.response[0].id;
		return pixiv.work(return_data.id, {
			image_sizes: "medium"
		});
	})
	.then(function(data) {
		return_data.title      = data.response[0].title;
		return_data.illust_url = data.response[0].image_urls.medium;

		return Promise.resolve(return_data);
	});
};
//get_question().then(function(data) { console.log(data); });

module.exports = get_question;
