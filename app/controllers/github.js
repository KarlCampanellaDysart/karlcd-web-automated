var request = require('request');
var config = require('../config/config');
var NodeCache = require( "node-cache" );
var myCache = new NodeCache( { checkperiod: 1800 } );
var cheerio = require("cheerio");

// ommitted projects
var REPO_EXCEPTIONS = /(itp|git-lab|Callisto|Labs|cs201final-project|SampleRepo|hey|ee201-project)/g;

// all langs
var LANG_CHECK = /(^js$|^html$|^java$|^cpp$|^c$|^php$|^handlebars$|^css$|^v$|^s$|^h$|^m$|^py$)/g;

// libraries that I have used, not written
var POPULAR_LIBRARIES = /(jquery|bootstrap|Chart.js|require.js)/g;

var allRepos = function(callback) {

	var value = myCache.get('allRepos');

	//not found
	if(value === undefined){
		var baseUrl = 'https://api.github.com/user/repos';
		var options = {
			headers: { 
				'User-Agent': 'request',
				'Authorization': config.github_token
			},
    		url: baseUrl
		}
		 
		request(options, function(error, response, body) {

			var data = JSON.parse(body);
			var newData = [];

			for(var i=0;i<data.length;i++){
				if(data[i].name.search(REPO_EXCEPTIONS) === -1){ newData.push(data[i]); }
			}

			if (!error && response.statusCode == 200) { 
				myCache.set('allRepos', newData);
				callback(newData); 
			}
			else{ callback('error'); }
		});
	}

	//found
	else{ callback(value); }
};

var getReadmeForRepo = function(owner, repo, callback) {

	var value = myCache.get(repo+'_readme');

	if(value === undefined){
		var baseUrl = 'https://api.github.com/repos/'+ owner +'/'+ repo +'/readme';
		var options = {
			headers: { 
				'User-Agent': 'request',
				'Authorization': config.github_token 
			},
    		url: baseUrl
		};
		request(options, function(error, response, body) {
			if (!error && response.statusCode == 200) { 
				var newData = JSON.parse(body);
				var dl_url = newData.html_url;
				options.url = dl_url;

				request(options, function(error, response, body){
					$ = cheerio.load(body);
					var readme = $('#readme').html();
					myCache.set(repo+'_readme', readme);
					callback(readme);
				});
			}
			else{ callback('error'); }
		});
	}
	else{ callback(value); }
};

var getCommitWithSha = function(repo, name, sha, callback){

	var baseUrl = 'https://api.github.com/repos/'+ name +'/'+ repo +'/commits/'+ sha;
	var options = {
		headers: { 
			'User-Agent': 'request',
			'Authorization': config.github_token 
		},
		url: baseUrl
	};
	request(options, function(error, response, body) {
		if (!error && response.statusCode == 200) { 
			var newData = JSON.parse(body);
			callback(newData); 
		}
		else{ callback('error'); }
	});
};

var getAllCommitsForRepo = function(repo, name, page, callback) {

	var params = '?page='+page+'&author=KarlCampanellaDysart';
	if(repo === 'Mahlet-Manger'){
		params += '&sha=MahletManger_R1_SW';
	}

	var baseUrl = 'https://api.github.com/repos/'+ name +'/'+ repo +'/commits'+params;
	var options = {
		headers: { 
			'User-Agent': 'request',
			'Authorization': config.github_token 
		},
		url: baseUrl
	};

	request(options, function(error, response, body) {
		if (!error && response.statusCode == 200) { 
			var newData = JSON.parse(body);
			callback(newData); 
		}
		else{ callback('error'); }
	});
};

var analyzeFiles = function(files, callback){

	var numFiles = files.length;
	var fileCount = 0;
	var fileObject = {};

	for(var j=0;j<numFiles;j++){
					
		analyzeSingleFile(files[j], function(changeObj){

			if(changeObj !== undefined){
				
				// get parts
				var extention = changeObj.ex;
				var changes = changeObj.changes;

				// update the file object
				if(fileObject[extention] === undefined){
					fileObject[extention] = {};
					fileObject[extention].additions = changes.additions;
					fileObject[extention].deletions = changes.deletions;
				}
				else{
					fileObject[extention].additions += changes.additions;
					fileObject[extention].deletions += changes.deletions;
				}
			}

			// incrament count
			fileCount ++;

			// check if we are done
			if(fileCount === numFiles){ callback(fileObject); }
		});
	}
};

var analyzeSingleFile = function(file, callback){

	var filename = file.filename;

	//split into filename and file ending
	var namePartition = filename.split('.');
	var extention = namePartition && namePartition.length && namePartition[namePartition.length - 1];
	if(extention.search(LANG_CHECK) > -1 && filename.search(POPULAR_LIBRARIES) === -1){

		// examine the status of the file
		// check if we added a file, if so we need to count the lines manually
		if(file.status === 'added'){

			// make an api call to content_url
			var contents_url = file.contents_url;
			var options = {
				headers: { 'User-Agent': 'request', 'Authorization': config.github_token },
	    		url: contents_url
			}
			 
			request(options, function(error, response, body) {

				var data = JSON.parse(body);

				// make another call to the download url for inspection
				var download_url = data.download_url;
				options.url = download_url;
				request(options, function(error, response, body) {

					// body is text of the file
					var lineCount = 0;
					if(!error){
						for(var k=0;k<body.length;k++){
							if(body.charAt(k) === '\n'){ lineCount ++; }
						}
					}

					// additions are the number of new lines
					callback({ 
						ex: extention, 
						changes: { additions: lineCount, deletions: 0 }
					});
				});
			});
		}
		else if(file.status === 'removed'){

			// make an api call to content_url
			var contents_url = file.contents_url;
			var options = {
				headers: { 'User-Agent': 'request', 'Authorization': config.github_token },
	    		url: contents_url
			}
			 
			request(options, function(error, response, body) {

				var data = JSON.parse(body);

				// make another call to the download url for inspection
				var download_url = data.download_url;
				options.url = download_url;
				request(options, function(error, response, body) {
					
					// body is text of the file
					var lineCount = 0;
					if(!error){
						for(var k=0;k<body.length;k++){
							if(body.charAt(k) === '\n'){ lineCount ++; }
						}
					}

					// additions are the number of new lines
					callback({ 
						ex: extention, 
						changes: { additions: 0, deletions: lineCount }
					});
				});
			});
		}

		// file changed
		else{
			callback({
				ex: extention, 
				changes: { additions: file.additions, deletions: file.deletions }
			});
		}
	}
	else{
		callback(undefined);
	}
};

// export all of these functions
module.exports = {
	allRepos: allRepos,
	getReadmeForRepo: getReadmeForRepo,
	getCommitWithSha: getCommitWithSha,
	getAllCommitsForRepo: getAllCommitsForRepo,
	analyzeFiles: analyzeFiles,
	analyzeSingleFile: analyzeSingleFile
}
