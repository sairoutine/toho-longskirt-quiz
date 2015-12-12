"use strict";

var request   = require('request');
var Promise   = require('bluebird');

var Github = function(){
	this.access_token = null;
	this.refresh_token = null;
};

Github.prototype.auth = function(options) {
	var self = this;

	var username = options.username;
	var password = options.password;

	if(!username || !password) { throw new Error('username and password is required'); }
	var auth_url = 'https://oauth.secure.pixiv.net/auth/token';
	var data = {
		'client_id': 'bYGKuGVw91e0NMfPGp44euvGt59s',
		'client_secret': 'HP3RmkgAmEGro0gn1x9ioawQE8WMfvLXDz3ZqxpK',
		'grant_type': 'password',
		'username': username,
		'password': password,
	};

	return new Promise(function(resolve, reject) {
		request.post(auth_url, {form: data}, function (err, res, body) {
			if(err) { return reject(err); }
			if(res.statusCode !== 200) { return reject(new Error('not returned 200 response')); }

			var token = JSON.parse(body);
			self.access_token = token.response.access_token;
			self.refresh_token = token.response.refresh_token;

			//var match = res.headers['set-cookie'][0].match(/PHPSESSID=([0-9a-zA-Z\_\-]+);/);
			//if(match.length < 1) { return reject(new Error("Can't get phpsessid")); }
			//self.sess_id = match[1];
			resolve();
		});
	});
};


Github.prototype.search = function(options) {
	var search_url = 'https://public-api.secure.pixiv.net/v1/search/works.json';

	var req_params = {
		uri: search_url,
		headers: {
			"Authorization": "Bearer " + this.access_token,
			//'Referer': 'http://spapi.pixiv.net/',
			//'User-Agent': 'PixivIOSApp/5.8.3',
			//'Cookie': 'PHPSESSID=' + this.sess_id,
		},
		qs: options,
	};
	
	return new Promise(function(resolve, reject) {
		request.get(req_params, function (err, res, body) {
			if(err) { return reject(err); }
			if(res.statusCode !== 200) { return reject(new Error('not returned 200 response: ' + res.statusCode)); }

			var data = JSON.parse(body);
			resolve(data);
		});
	});
};

Github.prototype.work = function(id, options) {
	var search_url = 'https://public-api.secure.pixiv.net/v1/works/' + id;

	var req_params = {
		uri: search_url,
		headers: {
			"Authorization": "Bearer " + this.access_token,
			//'Referer': 'http://spapi.pixiv.net/',
			//'User-Agent': 'PixivIOSApp/5.8.3',
			//'Cookie': 'PHPSESSID=' + this.sess_id,
		},
		qs: options,
	};
	
	return new Promise(function(resolve, reject) {
		request.get(req_params, function (err, res, body) {
			if(err) { return reject(err); }
			if(res.statusCode !== 200) { return reject(new Error('not returned 200 response: ' + res.statusCode)); }

			var data = JSON.parse(body);
			resolve(data);
		});
	});
};


module.exports = Github;
