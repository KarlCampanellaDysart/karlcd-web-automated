var Parse = require('parse-api').Parse;
var config = require('../config/config');
var request = require('request');
var github = require('../controllers/github');

var app = new Parse(config.APP_ID, config.MASTER_KEY);

var updateProjectWithData = function(repo, name, allCommits, res){

	var commitCount = 0;
	var commitMax = allCommits.length;
	var allCommitData = [];

	for(var i=0;i<commitMax;i++){
		github.getCommitWithSha(repo, name, allCommits[i].sha, function(commit, err){
			
			// get files from commit
			var files = commit.files;

			if(files !== undefined){

				// analyze all of the files
				github.analyzeFiles(files, function(fileObject){

					//data we want to save about commits
					allCommitData.push({
						url: commit.commit.url,
						total_changes: commit.stats,
						date: commit.commit.author.date,
						changes: fileObject
					}); 

					//incrament commit+
					commitCount++;

					//check if last commit
					if(commitCount === commitMax){
						app.find('project', { name: repo }, function (err, response) {
				  			if(err || response.results.length === 0){
								app.insert('project', { name: repo, owner: name, fileData: allCommitData }, function (err, response) {
									console.log(repo+' updated');
									res.json(repo+' updated');
								});
				  			}
				  			else{
				  				app.update('project', response.results[0].objectId, { fileData: allCommitData }, function (err, response) {
				  					console.log(repo+' updated');
				  					res.json(repo+' updated');
				  				});
				  			}
						});
					}
				});
			}	
		});
	}
};

var getAllRepoCommits = function(repo, name, pageNumber, allBasicCommitData, res){
	github.getAllCommitsForRepo(repo, name, pageNumber, function(commits){
		
		// no more pages we are ready to update
		if(commits.length === 0){ updateProjectWithData(repo, name, allBasicCommitData, res); }
		else if(!Array.isArray(commits)){ console.log('something went wrong with the update'); }
		else{  getAllRepoCommits(repo, name, ++pageNumber, allBasicCommitData.concat(commits), res); }
	});
}

var pullProjectMetadata = function(name, callback){
	app.find('project', { name: name }, function (err, response) {
		if(err || response.results.length === 0){ callback('error project does not exist in parse'); }
		else{ callback(response.results); }
	});
};

module.exports = {
	getAllRepoCommits: getAllRepoCommits,
	updateProjectWithData: updateProjectWithData,
	pullProjectMetadata: pullProjectMetadata
};

