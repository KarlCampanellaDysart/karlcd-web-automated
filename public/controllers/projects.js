'use strict';

/**
 * @ngdoc function
 * @name angularSiteApp.controller:ProjectsCtrl
 * @description
 * # ProjectsCtrl
 * Controller of the angularSiteApp
 */
angular.module('angularSiteApp')
  .controller('ProjectsCtrl', function ($scope, github, Parse) {

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


    // Parse.getAllProjects().then(function(data){
    //   console.log(data);
    // });
    // $scope.riscEmulator = {
    //   title: "RISC Processor emulator",
    //   p1: "As required by the class we created a basic RISC emulator with assembly code with instructions, ADD, ADDI, SUB, SUBI, LOAD, BE, BNE, READS, DISP, and END. The program took 32-bit instructions, decoded them and executed their instruction. The PC, memory, and registers were emulated on a COLDFIRE processor. We used codeWarrior as our IDE.",
    //   p2: "My role in this project was to implement BE, BNE, READS, DISP, and END. BE and BNE were a little tricky because of the fact that we could backtrack to ta previous instruction. So to implement this I had to check if the value that increments the PC was positive or negative. In any case, if the instruction did branch I would just need to add the fetched immediate value in the 32-bit instruction to the emulated PC. The READS and DISP instructions involved initializing both the LEDs and dip-switches, this was simple because we did this in previous labs. To read I had to move a value from a specific address, to display, I had to move a value to a specific address. This turned out to be very easy to implement although I had a small issue when I tried to initialize the dip-switches before the LEDs. To fix this unknown issue if just reversed the order of initialization. In addition to my own part, I of course had a role in debugging and testing the entire project after all the emulated instructions were implemented.",
    //   link: "https://github.com/KarlCampanellaDysart/ee357final-project"
    // };

    // $scope.lots = {
    //   title: "Lord of the Swords",
    //   p1: "Lord of the Swords is a basic rpg, where a players goal is to attack and beat other players by bringing their heath down to zero. There are 2 separate teams that are assigned randomly to a player at the start of the match. Players spawn on opposite corners of a four quadrant map. There are items in the other 2 quadrants where players don't spawn. The initial goal of the game is to gather as many items in those 2 quadrants as possible before the other team. They don't get you any extra points, but the items either: make your attack stronger, make your defense stronger, or boost your health. Which ever team is eliminated first loses. The game currently supports up to 4 players per team.",
    //   p2: "This game is networked, so it has a client-server architecture. Both the client and server are coded in java and our team did not choose to use a game engine because of time constraints. For this game, I basically wrote the whole server side of the game and did all the graphics. I'm not too great at graphic design, but I'm getting better. It takes me time to make anything that is mildly pleasant to look at. This was a first for me, so I learned a lot about the limitations of networked applications and ways of going about applications with a client-server architecture.",
    //   link: "https://github.com/KarlCampanellaDysart/cs201final-project"
    // };

    // $scope.inStyle = {
    //   title: "InStyle iPhone app",
    //   intro: "InSyle is an iPhone application that intends to branch the worlds of fashion and comfort. InStyle allows anyone, anywhere, to wear comfortable good-looking clothes and answers the age-old question of 'what should I wear?' Essentially, InSyle pulls and processes data from 2 APIs. It pulls weather from the worldweatheronline free API using the users current location obtained from iPhone core data. It also pulls a clothing query from the GILT API to suggest relevant clothing.",
    //   feature: {
    //     title: "Key Features",
    //     content: "There is a login screen with text boxes for a username and password. The user can either login or create an account. Some aspects of the account are determined by core location. There's a Collection view of types of clothes which displays all relevant clothing types (shirts, shoes, pants, etc.). A type of clothes can be selected and the types of clothes that are displayed are dependent on the current temperature and type of weather. The clothing types are displayed are relevant to the current weather. Clothes are displayed generically and when the clothing type is clicked clothes of that type are displayed. Pulls bestselling clothes from the GILT API when the clothing item is clicked. A screen with a larger picture is displayed with a short description. The user can open an internet search of that item and they can add the item to their closet. When the item is opened in a web view the user can navigate a Google search of that item. There's a table view of the users closet where the user can delete items and the user can click on items and open the same web view as before."
    //   },
    //   link: ""
    // };

    // $scope.dp = {
    //   title: "Dysartp.com Tonnetz",
    //   p1: "Dysartp.com is a website I built for my father. He was using some freeware to build a website, but it was very outdate and low quality. I upgraded him to a single page website built with html/css/jquery. I can't say I understand the content on the website (I'm not much of a music buff), but I think I put it together in a way that I can be better understood. The website focuses on a topic in music theory (Tonnetz).",
    //   link: "https://dysartp.com",
    //   linkCode: "https://github.com/KarlCampanellaDysart/dysartp-website"
    // };

    // $scope.hh = {
    //   title: "HouseHold iPhone App",
    //   intro: "Household is a IOS application that I built for my sister as a present because I didn't have any money to buy her something real. In short, it is a shared notifications list based on location. A user can add or take away from a few different categories of lists if they have access to that account. A user can discover accounts based on their location. The idea is that if your are in someone's house, they can share certain information with you without actually telling you anything.",
    //   p1: "I used core location and the apigee API sdk for objective-c to store data in a noSQL like database.",
    //   link: "https://github.com/KarlCampanellaDysart/household-shared-list"
    // };

    // $scope.javaSim = {
    //   title: "Java Factory Simulator",
    //   intro: "This was an assignment for my Principles of Software Development class. I had to make a simulation of a factory with a the elements of a factory (workers, tools, resources). It was animated so that I was visually able to see a worker use a tool with a resource. The time simulations took to complete was the time for a job to be finished. Jobs were submitted over the network from a form. A text file was serialized and sent to the main application where it was pending until I accepted the order. Orders could be stacked and they started once the previous one was done. This application demonstrated my knowledge of multithreaded programing. Additionally, there was a bit of AI implemented in the movement of the workers to their desired resource/tool/work station. This was built in Java using the swing library for the GUI.",
    //   link: "https://github.com/KarlCampanellaDysart/java-factory-simulator"
    // };

    // $scope.comp = {
    //   title: "Complimentr",
    //   intro: "Complimentr is a Web application used to make people feel good. The application has two distinct functions: to send people compliments (which are auto genrated) and to share photos of cute animals with people. The application doesn't allow a user to send something to a specific person, but it rather sends content to another random user. This will keep user's recieved feeds much more evenly distributed. The content of the cute animal pictures comes from instagram, and the complements are pre-inserted into a database.",
    //   tech: "Complimentr was build using PHP and the Laravel framework in the backend. A mySQL database was used for persistant storage. In the frontend, pusher was used to create real-time commenting on posts. Of course the instagram API was used to generate photos of cute animals. I used the facebook API for user logins (they can also use username/passwords that is stored on the sql database). Socialite for Laravel was used to interface with the facebook API. Travis CI is implemented. The deployment of this app is automatically deployed to heroku from its master branch on github.",
    //   notes: "Most of my difficulty in building this application was with the facebook API. The facebook SDK for PHP is implemented using raw sessions, but in Laravel sessions are abstracted and simplified, so there are coflicts and code tends to be long and messy. I searched for SDK wrappers and found 2 specifically for Laravel. I used Socailite - the simpler of the 2. The other wrapper could do more than pull data from facebook, but for the scope of this project I only needed to login and pull FB profile data. Later on I might improve this application by allowing users to post pictures and compliments to a friend's facebook wall, or something similar.",
    //   linkCode: "https://github.com/KarlCampanellaDysart/complimentr",
    //   link: "http://screencast.com/t/eqkT16G6L8a"
    // };

    // $scope.mahlet = {
    //   title: "Mahlet Manager",
    //   intro: "Mahlet Manager is a web application that I created during my summer 2015 internship at Mahlet Consulting Inc. It manages an R&D hardware system called Callisto. The manager can give input to and recieve output from Callisto. In addition, the manager has graphs to visually see a statistic of Callisto over a certain period of time. I also build an API into the application so that third parties can use Callisto via web interface. The manager has an account system, so different users have different permissions for Callisto. Third party users are identified with their API key obtained through Mahlet Manager. The visualization of the hardware system was done with the HTML5 canvas. The Callisto hardware is meant to be visualized differently based on it's version. Due to this, I had to make a dynamic module to allow for the customization of the Callisto visuals. This was probably the hardest part of the application.",
    //   tech: "Mahlet Manager was built with Node.js on the backend and mostly plain javascript on the frontend. I used a few common javascript libraries to help with the UI on the frontend, like bootstrap jquery and chart.js (built on top of D3)."
    // };

    // $scope.totallyjs = {
    //   title: "Totally.js",
    //   linkCode: "https://github.com/KarlCampanellaDysart/totallyjs"
    // };

});

angular.module('angularSiteApp')
  .factory('github', function ($http, $cacheFactory){
    return {        
      getAllRepos: function(){
        if($cacheFactory.get('allRepos')){
          return new Promise(function(resolve, reject){
            return $cacheFactory.get('allRepos');
          });   
        }
        else{
          return $http.get('github/repos', function(data){
            $cacheFactory.put('allRepos', data.data);
            return data.data;
          });
        }        
      },

      getReadme: function(owner, repo){
        if($cacheFactory.get(repo)){
          return new Promise(function(resolve, reject){
            return $cacheFactory.get(repo);
          });   
        }
        else{
          return $http.get('github/'+owner+'/'+repo+'/readme', function(data){
            $cacheFactory.put(repo, data.data);
            return data.data;
          });
        }
      }
    };
  });

