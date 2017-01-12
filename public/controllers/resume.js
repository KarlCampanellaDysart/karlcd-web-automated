'use strict';

/**
 * @ngdoc function
 * @name angularSiteApp.controller:ResumeCtrl
 * @description
 * # ResumeCtrl
 * Controller of the angularSiteApp
 */
angular.module('angularSiteApp')
.controller('ResumeCtrl', function ($scope, Gsheet, parse) {


  	// activate tooltips and popovers
	$(function(){ $('[data-toggle="tooltip"]').tooltip() });
	$(function(){ $('[data-toggle="popover"]').popover() });

	// more UI setup and animation for accordion
	var sectionIds = ['academics', 'experience', 'hackathons', 'languages'];
	$scope.accordionClick = function(section){
		for(var i=0;i<sectionIds.length;i++){
			if(sectionIds[i] === section){ $('#' + sectionIds[i]).collapse('show') }
			else{ $('#' + sectionIds[i]).collapse('hide') }
		}
	}

	$scope.computeLastComma = function(last){
		if(last){ $scope.comma = ''; }
		else{ $scope.comma = ','; }
	}

	// getting data for courses
	Gsheet.getCourses().then(function(data){
    	$scope.courses = data.data;
    });

	// getting all experience and parsing the input
	Gsheet.getExperience().then(function(data){

		var allExperience = data.data;

		for(var i=0;i<allExperience.length;i++){

			var points = allExperience[i]['mainandsub-pointsofexperience'].replace( /\r?\n|\r/g, '');
			allExperience[i].points = [];

			var allMainPoints = points.split('(end-p)');

			for(var j=0;j<allMainPoints.length-1;j++){

				var allSubPoints = allMainPoints[j].split('(end-sp)');
				var title = allSubPoints[0];
				var subPoints = [];

				// create new array for subpoints
				for(var k=1;k<allSubPoints.length-1;k++){ subPoints.push(allSubPoints[k]); }

				allExperience[i].points.push({
					title: title,
					subPoints: subPoints
				});
			}
		}

		$scope.experiences = allExperience;
	});

	// getting all hackathons and parsing the input
	Gsheet.getHackathons().then(function(data){

		var allExperience = data.data;

		for(var i=0;i<allExperience.length;i++){

			var points = allExperience[i]['hackathonpointsandsub-points'].replace( /\r?\n|\r/g, '');
			allExperience[i].points = [];

			var allMainPoints = points.split('(end-p)');

			for(var j=0;j<allMainPoints.length-1;j++){

				var allSubPoints = allMainPoints[j].split('(end-sp)');
				var title = allSubPoints[0];
				var subPoints = [];

				// create new array for subpoints
				for(var k=1;k<allSubPoints.length-1;k++){ subPoints.push(allSubPoints[k]); }

				allExperience[i].points.push({
					title: title,
					subPoints: subPoints
				});
			}
		}

		$scope.hackathons = allExperience;
	});
    
	// get data from all of the projects
	parse.getAllProjects().then(function(data){

		var langObject = {};

		// tally up data on all projects
		for(var i=0;i<data.data.length;i++){
        
            // make naming easier
            var project = data.data[i];        

			// set up graph datas
            for(var j=0;j<project.fileData.length;j++){

        		// go through individual changes and tally
        		for(var k in project.fileData[j].changes){
        			if(langObject[k] !== undefined){
        				langObject[k].num += project.fileData[j].changes[k].additions;
        				langObject[k].num -= project.fileData[j].changes[k].deletions;

        				// add project name as key in project object
        				if(langObject[k].project[project.name] === undefined){
        					langObject[k].project[project.name] = 0;
        				}
        			}
        			else{
        				langObject[k] = {};
        				langObject[k].project = {};
        				langObject[k].project[project.name] = 0;
        				langObject[k].num = project.fileData[j].changes[k].additions;
        				langObject[k].num -= project.fileData[j].changes[k].deletions;
        			}
        		}
        	}

        	if(langObject['cpp'] !== undefined && langObject['h'] !== undefined){
        		langObject['cpp'].num += langObject['h'].num;
        		langObject['h'] = undefined;
        	}
        	else if(langObject['m'] !== undefined && langObject['h'] !== undefined){
        		langObject['m'].num += langObject['h'].num;
        		langObject['h'] = undefined;
        	}
        }

        // set up more metadata
        var allLangs = [];
    	for(var j in langObject){

			// make chart data
			if(langObject[j] !== undefined){
				var num = 0;
				if(langObject[j].num > 0){ num = langObject[j].num; }

				var projects = [];
				for(var k in langObject[j].project){
	    			projects.push(k);
	    		}
	    		allLangs.push({
	    			projects: projects,
	    			lang: j,
	    			num: num
	    		});
    		}	
    	}

        $scope.langs = allLangs;
	});
});
