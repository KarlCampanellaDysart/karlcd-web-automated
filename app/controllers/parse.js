var Parse = require('parse');
var config = require('../config/config');
var request = require('request');
var github = require('../controllers/github');
var mLab = require('mongolab-data-api')(config.MLAB_API_KEY);
var PROJECT = 'project';

var updateProjectWithData = function(repo, name, allCommits, res){

	var commitCount = 0;
	var commitMax = allCommits.length;
	var allCommitData = [];
	if (commitMax > 0) {
		for(var i=0;i<commitMax;i++){
			github.getCommitWithSha(repo, name, allCommits[i].sha, function(commit){
				
				// get files from commit
				var files = commit.files;
				if(files !== undefined){

					// analyze all of the files
					github.analyzeFiles(files, function(fileObject){

						//data we want to save about commits
						if (fileObject !== undefined) {
							allCommitData.push({
								url: commit.commit.url,
								total_changes: commit.stats,
								date: commit.commit.author.date,
								changes: fileObject
							}); 
						}
						
						//incrament commit+
						commitCount++;

						//check if last commit
						if(commitCount === commitMax){
							mLab.listDocuments({
								database: config.MLAB_DB_NAME,
								collectionName: PROJECT,
								query: JSON.stringify({name: repo}),
								findOne: true
							}, function (err, data) {
							    if (err || !data) {
							    	mLab.insertDocuments({
										database: config.MLAB_DB_NAME,
										collectionName: PROJECT,
										documents: {
											name: repo, 
											owner: name, 
											fileData: allCommitData, 
											updatedAt: new Date(),
											createAt: new Date()
										}
									}, function (err, data) {					
									    console.log(repo+' updated');
										res.json(repo+' updated');
									});
							    } else {
							    	mLab.updateDocuments({
										database: config.MLAB_DB_NAME,
										collectionName: PROJECT,
										data: {
											fileData: allCommitData,
											updatedAt: new Date()
										},
										query: JSON.stringify({_id: data._id})
									}, function (err, data) {					
									    console.log(repo+' updated');
					  					res.json(repo+' updated');
									});
							    }
							});
						}
					});
				} else commitCount++;
			});
		}
	} else {
		console.log(repo+' updated');
		res.json(repo+' updated');
	}
};

var getAllRepoCommits = function(repo, name, pageNumber, allBasicCommitData, res){
	github.getAllCommitsForRepo(repo, name, pageNumber, function(commits){
		
		// no more pages we are ready to update
		if(commits.length === 0) updateProjectWithData(repo, name, allBasicCommitData, res); 
		else if(!Array.isArray(commits)) console.log('something went wrong with the update'); 
		else  getAllRepoCommits(repo, name, ++pageNumber, allBasicCommitData.concat(commits), res); 
	});
}

var getProject = function(name, callback){
	mLab.listDocuments({
		database: config.MLAB_DB_NAME,
		collectionName: PROJECT,
		query: JSON.stringify({name: name}),
		findOne: true
	}, function (err, data) {
	    if (err || !data) {
	    	console.log(err);
	    	callback('error project does not exist in parse');
	    }
	    else callback(data);
	});
};

var getAllProjects = function (callback) {
	mLab.listDocuments({
		database: config.MLAB_DB_NAME,
		collectionName: 'project'
	}, function (err, data) {
	    if (err || data.length === 0) console.log(err);
	    else callback(data);
	});
}

module.exports = {
	getAllRepoCommits: getAllRepoCommits,
	updateProjectWithData: updateProjectWithData,
	getProject: getProject,
	getAllProjects: getAllProjects
};

