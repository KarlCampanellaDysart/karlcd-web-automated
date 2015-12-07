var parse = require('../controllers/parse');
var config = require('../config/config');

module.exports = function(app){

	app.post('/parse/:repo/:name', function(req, res) {
		if(req.body.token === config.login.auth_token){ parse.getAllRepoCommits(req.params.repo, req.params.name, 1, [], res); }
		else{ res.json('not authorized'); }
	});
};


