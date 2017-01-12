'use strict';

/**
 * @ngdoc function
 * @name angularSiteApp.controller:ProjectsCtrl
 * @description
 * # ProjectsCtrl
 * Controller of the angularSiteApp
 */
angular.module('angularSiteApp')
  .controller('ProjectsCtrl', function ($scope, Gsheet) {

    // getting data for courses
    Gsheet.getWeb().then(function(data){
        $scope.web = data.data;
    });
});
