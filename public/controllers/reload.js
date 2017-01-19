'use strict';

/**
 * @ngdoc function
 * @name angularSiteApp.controller:ReloadCtrl
 * @description
 * # ReloadCtrl
 * Controller of the angularSiteApp
 */
angular.module('angularSiteApp')
  .controller('ReloadCtrl', function ($scope, github, $http, $cookies) {

    github.getAllRepos().then(function(data){
      $scope.repos = data.data;
    });

    $scope.submit = function(name, owner){

      //update POST
      $http.post('/mlab/'+ name +'/'+ owner, {
        token: $cookies.get('auth_token')
      }).then(function(data){
        console.log(data);
      });
    }
});