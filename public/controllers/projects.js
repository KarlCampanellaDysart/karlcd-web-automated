'use strict';

/**
 * @ngdoc function
 * @name angularSiteApp.controller:ProjectsCtrl
 * @description
 * # ProjectsCtrl
 * Controller of the angularSiteApp
 */
angular.module('angularSiteApp')
  .controller('ProjectsCtrl', function ($scope, github) {

    github.getAllRepos().then(function(data){

        var options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            timeZone: 'UTC',
            timeZoneName: 'short'
        };
        
        for(var i=0;i<data.data.length;i++){
            data.data[i].created_at = (new Date(Date.parse(data.data[i].created_at))).toLocaleDateString('en-US', options);
            data.data[i].updated_at = (new Date(Date.parse(data.data[i].updated_at))).toLocaleDateString('en-US', options);
        }

        $scope.repos = data.data;
    });
});
