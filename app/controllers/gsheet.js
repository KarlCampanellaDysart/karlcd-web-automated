var GoogleSpreadsheet = require("google-spreadsheet");

var blogSheet = new GoogleSpreadsheet('1wBJJUex3wKExlvsh0rMAmerDeUJzYkd_9TRTG_mTqHs');
var courseSheet = new GoogleSpreadsheet('1Pn-rsweDmpBARnzdQ2AQecCsmu3u4k_LZKzq3ybDEZU');
var experienceSheet = new GoogleSpreadsheet('1XUx17QpwwiNmocWygjLwom-f1CouNk8_FDN4RT7QL1s');
var hackathonSheet = new GoogleSpreadsheet('1R6R2S-G6hEh0xQI4ODX_72kxx9g9W0bCs3NgBk-ma8c');
var skillSheet = new GoogleSpreadsheet('1Y5tmiYDmLao5FwTXzVLqVjzTPLDFSD8lRkFBMI_LBXQ');
var webSheet = new GoogleSpreadsheet('1HkJsawMML8qWTrxIlsI5t9HfdeJLQrWk5b1Wbe0Dvt0');

// oAuth credentials
var creds = require('./../config/karlcd-web-52a20a887ee7.json');

var getAllBlogPosts = function(callback){
	blogSheet.useServiceAccountAuth(creds, function(err){
	    blogSheet.getInfo(function(err, sheet_info){
	        var sheet2 = sheet_info.worksheets[0];
	        sheet2.getRows(function(err, rows){ callback(rows); });
	    });
	});
};

var getAllCourses = function(callback){
	courseSheet.useServiceAccountAuth(creds, function(err){
	    courseSheet.getInfo(function(err, sheet_info){
	        var sheet2 = sheet_info.worksheets[0];
	        sheet2.getRows(function(err, rows){ callback(rows); });
	    });
	});
};

var getAllExperiences = function(callback){
	experienceSheet.useServiceAccountAuth(creds, function(err){
	    experienceSheet.getInfo(function(err, sheet_info){
	        var sheet2 = sheet_info.worksheets[0];
	        sheet2.getRows(function(err, rows){ callback(rows); });
	    });
	});
};

var getAllHackathons = function(callback){
	hackathonSheet.useServiceAccountAuth(creds, function(err){
	    hackathonSheet.getInfo(function(err, sheet_info){
	        var sheet2 = sheet_info.worksheets[0];
	        sheet2.getRows(function(err, rows){ callback(rows); });
	    });
	});
};

var getAllSkills = function(callback){
	skillSheet.useServiceAccountAuth(creds, function(err){
	    skillSheet.getInfo(function(err, sheet_info){
	        var sheet2 = sheet_info.worksheets[0];
	        sheet2.getRows(function(err, rows){ callback(rows); });
	    });
	});
};

var getAllWeb = function(callback){
	webSheet.useServiceAccountAuth(creds, function(err){
	    webSheet.getInfo(function(err, sheet_info){
	        var sheet2 = sheet_info.worksheets[0];
	        sheet2.getRows(function(err, rows){ callback(rows); });
	    });
	});
};

module.exports = {
	getAllBlogPosts: getAllBlogPosts,
	getAllCourses: getAllCourses,
	getAllExperiences: getAllExperiences,
	getAllHackathons: getAllHackathons,
	getAllSkills: getAllSkills,
	getAllWeb: getAllWeb
};