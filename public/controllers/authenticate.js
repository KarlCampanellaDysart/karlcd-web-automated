'use strict';

/**
 * @ngdoc function
 * @name angularSiteApp.controller:AuthenticateCtrl
 * @description
 * # AuthenticateCtrl
 * Controller of the angularSiteApp
 */
angular.module('angularSiteApp')
  .controller('AuthenticateCtrl', function ($scope, $rootScope, Auth, $location) {

  	$scope.username = '';
  	$scope.password = '';

  	$scope.submit = function(username, password){
  		Auth.login(username, password).then(function (data){
	    	if(data === 'success'){ $location.path('/reload'); }
	    });
  	}  
});