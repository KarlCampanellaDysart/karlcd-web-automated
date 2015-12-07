'use strict';

/**
 * @ngdoc function
 * @name angularSiteApp.controller:ReloadCtrl
 * @description
 * # ReloadCtrl
 * Controller of the angularSiteApp
 */
angular.module('angularSiteApp')
  .controller('ReloadCtrl', function ($scope, github, $http, Session) {

    github.getAllRepos().then(function(data){
      $scope.repos = data.data;
    });

    $scope.submit = function(name, owner){
      console.log(owner +' : '+ name);

      //update POST
      $http.post('/parse/'+ name +'/'+ owner, {
        token: Session.getId()
      }).then(function(data){
        console.log(data);
      });
    }
});