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
      text: "My name is Karl Campanella-Dysart, 2012 graduate of George Mason high school, a past computer science student at Boston College, and a current computer science student at the University of Southern California. I love computer languages, learning about new technologies, and anything cutting edge. Besides computer things, I'm big into tennis and lifting weights. My two favorite bands are God is an Astronaut and Ratatat, and my favorite movie is Forest Gump."
    };

    $scope.interests = { 
    	title: 'My interests',
    	text: "I've always been interested in application design mainly in ios and web development, but I also like to do software development in Java. I like both back-end and front-end development equally. Currently, I'm working with several different languages. I'm doing PHP development in Laravel and learning how to make scalable web applications. In addition, I'm taking an operating systems course, so I'm using a lot of C. We are building on top of the pintos OS. Throughout the semester we will have implemented priority thread scheduling/donation, user program integration with the kernel, a more complex file system, and virtual memory."
    };

    $scope.contact = {
      text: "Currently I am a rising senior studying Computer Science at University of Southern California. For this summer, I already have my work schedule layed out, but I am always looking into the future. I will be living in the Northern Virgina area, and you can contact me through my facebook, linkedin, or github about career opportunities. In the fall I with be returning back to school for one more year. My updated resume is presented below.",
      title: 'Contact'
    };

  });
