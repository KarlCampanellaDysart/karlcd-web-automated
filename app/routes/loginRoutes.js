var login = require('../controllers/login');
var config = require('../config/config');

module.exports = function(app){

	app.post('/login', function(req, res) {
		var username = req.body.username;
		var password = req.body.password;

		login.verify(username, password, function(data){
			res.json(data);
		});
	});
};
