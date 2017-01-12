'use strict';

/**
 * @ngdoc function
 * @name angularSiteApp.controller:WebCtrl
 * @description
 * # WebCtrl
 * Controller of the angularSiteApp
 */
angular.module('angularSiteApp')
.controller('WebCtrl', function ($scope, Gsheet) {
	Gsheet.getWeb().then(function(data){
    	$scope.courses = data.data;
    });
});
