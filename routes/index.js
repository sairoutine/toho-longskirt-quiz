var express = require('express');
var router = express.Router();

var get_question = require('../lib/get_question');
var request = require('request');

/* TOP PAGE. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET QUESTION. */
router.get('/question', function(req, res, next) {
	get_question()
	.then(function(data) {
		res.json(data);
	});
});

/* IMAGE ROUTER. */
router.get('/image', function(req, res, next) {
	var url = req.query.url;

	// TODO check url
	var options = {
		url: url,
		headers: {
			'Referer': 'http://www.pixiv.net/'
		}
	};

	request(options).pipe(res);
});




module.exports = router;
