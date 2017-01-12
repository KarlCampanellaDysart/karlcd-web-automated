'use strict';

/**
 * @ngdoc function
 * @name angularSiteApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angularSiteApp
 */
angular.module('angularSiteApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.bio = {
      title: 'About Me...', 
      text: "My name is Karl Campanella-Dysart, 2012 graduate of George Mason high school, and a recent graduate from the University of Southern California. I love computer languages, learning about new technologies, and anything cutting edge. Besides computer things, I'm big into tennis and lifting weights. My two favorite bands are God is an Astronaut and Ratatat, and my favorite movie is Forest Gump."
    };

    $scope.interests = { 
    	title: 'My interests',
    	text: "I’ve developed an interest in the stock prediction problem and have been writing related software for the past 4 months. Specifically I’m working on a tool that can predict various stocks from various industries using data from several notable news sources and Twitter. The stock prediction problem using news draws upon a broad spectrum of topics in Computer Science/Statistics, including, but not limited to Sentiment Analysis and Data Mining. I’m also excited about home automation using IOT devices. I’ve enjoyed writing software to do miscellaneous tasks such as turning on and off lights, play youtube or Netflix videos, and check internet connected sensors."
    };
  });
