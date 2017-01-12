var parse = require('../controllers/parse');
var config = require('../config/config');

module.exports = function(app){
	app.post('/parse/:repo/:name', function(req, res) {
		if(req.body.token === config.login.auth_token){ parse.getAllRepoCommits(req.params.repo, req.params.name, 1, [], res); }
		else{ res.json('not authorized'); }
	});
	app.get('/parse/:name', function(req, res) {
		parse.getProject(req.params.name, function (data) {
			res.json(data);
		});
	});
	app.get('/parse', function(req, res) {
		parse.getAllProjects(function (data) {
			res.json(data);
		});
	});
};