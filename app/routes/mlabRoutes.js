var mlab = require('../controllers/mlab');

module.exports = function(app){
	app.post('/mlab/:repo/:name', function(req, res) {
		if (req.body.token === process.env.app_auth_token) { 
			mlab.getAllRepoCommits(req.params.repo, req.params.name, 1, [], res); 
		}
		else { 
			res.json('not authorized'); 
		}
	});
	app.get('/mlab/:name', function(req, res) {
		mlab.getProject(req.params.name, function (data) {
			res.json(data);
		});
	});
	app.get('/mlab', function(req, res) {
		mlab.getAllProjects(function (data) {
			res.json(data);
		});
	});
};