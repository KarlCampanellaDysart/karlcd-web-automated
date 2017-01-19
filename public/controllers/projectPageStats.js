'use strict';

/**
 * @ngdoc function
 * @name angularSiteApp.controller:ProjectPageStatsCtrl
 * @description
 * # ProjectPageStatsCtrl
 * Controller of the angularSiteApp
 */
angular.module('angularSiteApp')
.controller('ProjectPageStatsCtrl', function ($scope, $filter, mlab, $routeParams, github) {

	// options for date format
	var options = { 
        year: '2-digit', 
        month: '2-digit', 
        day: '2-digit',
        timeZone: 'UTC'
    };
			      
	// setup name and filter function
	var projectName = $routeParams.project;
	$scope.name = projectName;
	var orderBy = $filter('orderBy');

	// get our project
	mlab.getProject(projectName).then(function(data){

    	// make naming easier
    	var project = data.data;        

    	// set metadate
    	$scope.lastUpdate = (new Date(Date.parse(project.updatedAt))).toLocaleDateString('en-US', options)
    	$scope.totalCommits = project.fileData.length;
    	

    	// order the file data by date
    	project.fileData = orderBy(project.fileData, 'date', false);

    	// scope for the charts
    	$scope.adChart = {};
    	$scope.adChart.labels = [];
		$scope.adChart.series = ['additions', 'deletions'];
		$scope.adChart.data = [[],[]];

		// all of our lanuage charts
		$scope.langTimeCharts = [];
		

		// optional options
		$scope.options = {};
		
		// set up graph data
		var langObject = {};
    	for(var j=0;j<project.fileData.length;j++){

    		// go through individual changes and tally
    		for(var k in project.fileData[j].changes){
    			if(langObject[k] !== undefined){
    				langObject[k] += project.fileData[j].changes[k].additions;
    				langObject[k] -= project.fileData[j].changes[k].deletions;
    			}
    			else{
    				langObject[k] = project.fileData[j].changes[k].additions;
    				langObject[k] -= project.fileData[j].changes[k].deletions;
    			}
    		}

    		// update add del chart data
    		var changes = project.fileData[j].changes
			$scope.adChart.labels.push((new Date(Date.parse(project.fileData[j].date))).toLocaleDateString('en-US', options));

			$scope.adChart.data[0].push(project.fileData[j].total_changes.additions);
			$scope.adChart.data[1].push(project.fileData[j].total_changes.deletions);
    	}

    	// set up more metadata
    	var allLangs = [];
    	var count = 0;
    	for(var j in langObject){

			// make chart data
			var num = 0;
			if(langObject[j] > 0){ num = langObject[j]; }
    		allLangs.push({
    			lang: j,
    			num: num
    		});

    		// setup lang charts
    		$scope.langTimeCharts[count++] = {
    			type: j,
    			labels: [],
    			data: [[],[]],
    			series: ['additions', 'deletions']
    		}; 
    	}

    	// set the series to all of the languages
    	$scope.allLangs = allLangs;

		// go through file data
		for(var j=0;j<project.fileData.length;j++){

			for(var k=0;k<allLangs.length;k++){

				// setup all lables the same
				$scope.langTimeCharts[k].labels.push((new Date(Date.parse(project.fileData[j].date))).toLocaleDateString('en-US', options));

				if(project.fileData[j].changes[allLangs[k].lang] !== undefined){
					$scope.langTimeCharts[k].data[0].push(project.fileData[j].changes[allLangs[k].lang].additions);
					$scope.langTimeCharts[k].data[1].push(project.fileData[j].changes[allLangs[k].lang].deletions);
				}
				else{
					$scope.langTimeCharts[k].data[0].push(0);
					$scope.langTimeCharts[k].data[1].push(0);
				}
			}               		
    	}
	});
});
