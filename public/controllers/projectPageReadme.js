'use strict';

/**
 * @ngdoc function
 * @name angularSiteApp.controller:ProjectPageReadmeCtrl
 * @description
 * # ProjectPageReadmeCtrl
 * Controller of the angularSiteApp
 */
angular.module('angularSiteApp')
.controller('ProjectPageReadmeCtrl', function ($scope, parse, $routeParams, github) {
      $scope.resolve = false;
	var projectName = $routeParams.project;
	$scope.name = projectName;
	parse.getProject(projectName).then(function(data){
      	$scope.project = data.data; 
      	github.getReadme($scope.project.owner, $scope.project.name).then(function(data){
      		$scope.readme = data.data; 	
                  $scope.resolve = true;
		});
	});
});
