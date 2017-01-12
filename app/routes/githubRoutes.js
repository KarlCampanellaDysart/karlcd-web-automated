var github = require('../controllers/github');
var parse = require('../controllers/parse');
var config = require('../config/config');

module.exports = function(app){

	app.get('/github/repos', function(req, res) {
	    github.allRepos(function(data){ res.json(data); });
	});

	app.get('/github/:owner/:repo/readme', function(req, res) {
	    github.getReadmeForRepo(req.params.owner, req.params.repo, function(data){ 
	    	res.json(data); 
	    });
	});
};
