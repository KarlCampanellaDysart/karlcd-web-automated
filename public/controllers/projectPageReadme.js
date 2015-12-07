'use strict';

/**
 * @ngdoc function
 * @name angularSiteApp.controller:ProjectPageReadmeCtrl
 * @description
 * # ProjectPageReadmeCtrl
 * Controller of the angularSiteApp
 */
angular.module('angularSiteApp')
.controller('ProjectPageReadmeCtrl', function ($scope, Parse, $routeParams, github) {

	var projectName = $routeParams.project;
	$scope.name = projectName;
	Parse.getAllProjects().then(function(data){
		for(var i=0;i<data.data.results.length;i++){
                  if(data.data.results[i].name === projectName){
                  	$scope.project = data.data.results[i]; 
                  	github.getReadme($scope.project.owner, $scope.project.name).then(function(data){
                  		if(data.data === 'error'){
                  			$scope.readme = '<strong class="warning">readme does not exist for repo</strong>';
                  		}
                  		else if(data.data === ''){
                  			$scope.readme = '<strong>repo is private and readme is not available</strong>';
                  		}
                  		else{ $scope.readme = data.data; }		
      			});
                  }
            }
	});
});
