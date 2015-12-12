'use strict';
var Pixiv = require('./lib/pixiv');

var pixiv = new Pixiv();

var id;

pixiv.auth({
	username: "",
	password: "",
})
.then(function() {
	return pixiv.search({
		q: '東方Project',
		page: 1,
		per_page: 25,
		mode: 'tag',
		period: 'all',
		order: 'desc',
		sort: 'date',
		types: 'illustration,manga',
	});
})
.then(function(data) {
	id = data.response[0].id;
	return pixiv.work(id);
})
.then(function(data) {
	console.log(data.response[0]);
})
.catch(function(err) {
	console.log(err);
});


