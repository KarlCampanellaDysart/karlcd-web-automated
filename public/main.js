'use strict';

/**
 * @ngdoc overview
 * @name angularSiteApp
 * @description
 * # angularSiteApp
 *
 * Main module of the application.
 */
angular
  .module('angularSiteApp', [
    'ngRoute', 'chart.js'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'templates/about.html',
        controller: 'AboutCtrl'
      }) 
      .when('/projects', {
        templateUrl: 'templates/projects.html',
        controller: 'ProjectsCtrl'
      })
      .when('/resume', {
        templateUrl: 'templates/resume.html',
        controller: 'ResumeCtrl'
      })
      .when('/about', {
        templateUrl: 'templates/about.html',
        controller: 'AboutCtrl'
      })
      .when('/projects/:project/readme', {
        templateUrl: 'templates/projectPageReadme.html',
        controller: 'ProjectPageReadmeCtrl'
      })
       .when('/projects/:project/stats', {
        templateUrl: 'templates/projectPageStats.html',
        controller: 'ProjectPageStatsCtrl'
      })
      .when('/authenticate', {
        templateUrl: 'templates/authenticate.html',
        controller: 'AuthenticateCtrl',
      })
      .when('/blog', {
        templateUrl: 'templates/blog.html',
        controller: 'BlogCtrl',
      })
      .when('/reload', {
        templateUrl: 'templates/reload.html',
        controller: 'ReloadCtrl',
        access: {
            requiresLogin: true
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  });

angular.module('angularSiteApp').run(['$rootScope','$location', 'Session', function ($rootScope, $location, Session){
    $rootScope.$on('$routeChangeStart', function (event, next){
        var authNeeded = next.access && next.access.requiresLogin;
        if(authNeeded){        
            if(!Session.id){ $location.path('/'); }
        }
    });
}]);
