var gsheet = require('../controllers/gsheet');
var config = require('../config/config');

module.exports = function(app){

	app.get('/gsheet/posts', function(req, res) {
	    gsheet.getAllBlogPosts(function(data){ res.json(data); });
	});

	app.get('/gsheet/courses', function(req, res) {
	    gsheet.getAllCourses(function(data){ res.json(data); });
	});

	app.get('/gsheet/experience', function(req, res) {
	    gsheet.getAllExperiences(function(data){ res.json(data); });
	});

	app.get('/gsheet/hackathons', function(req, res) {
	    gsheet.getAllHackathons(function(data){ res.json(data); });
	});

	app.get('/gsheet/skills', function(req, res) {
	    gsheet.getAllSkills(function(data){ res.json(data); });
	});

	app.get('/gsheet/web', function(req, res) {
	    gsheet.getAllWeb(function(data){ res.json(data); });
	});
};
