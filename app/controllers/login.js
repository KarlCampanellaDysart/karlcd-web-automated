var config = require('../config/config');

var verify = function(username, password, callback){
	if(username === config.login.username && password === config.login.password){ callback(config.login.auth_token); }  
	else{ callback('failure'); }
}

module.exports = {
	verify: verify
};