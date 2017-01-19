'use strict';

/**
 * @ngdoc function
 * @name angularSiteApp.controller:DeauthenticateCtrl
 * @description
 * # DeauthenticateCtrl
 * Controller of the angularSiteApp
 */
angular.module('angularSiteApp')
  .controller('DeauthenticateCtrl', function ($rootScope, $location, $cookies) {
  	$cookies.remove('auth_token');
  	$rootScope.authenticated = false;
  	$location.path('/'); 
});