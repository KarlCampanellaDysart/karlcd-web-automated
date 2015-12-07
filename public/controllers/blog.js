angular.module('angularSiteApp')
  .controller('BlogCtrl', function ($scope, Gsheet) {

    Gsheet.getAllPosts().then(function(data){
      // var options = { 
      //   weekday: 'long', 
      //   year: 'numeric', 
      //   month: 'long', 
      //   day: 'numeric',
      //   timeZone: 'UTC',
      //   timeZoneName: 'short'
      // };
      // for(var i=0;i<data.data.length;i++){
      //   data.data[i].created_at = (new Date(Date.parse(data.data[i].created_at))).toLocaleDateString('en-US', options);
      //   data.data[i].updated_at = (new Date(Date.parse(data.data[i].updated_at))).toLocaleDateString('en-US', options);
      // }
        $scope.posts = data.data;
    });
});