var mlab = require('../controllers/mlab');

module.exports = function(app){
	app.post('/login', function(req, res) {
		var username = req.body.username;
		var password = req.body.password;
		mlab.verifyUsernameWithPassword(username, password, function(data){
			if (data.success) {
				data.token = process.env.app_auth_token;
				res.json(data);
			} else {
				res.json(data);
			}
		});
	});
};
