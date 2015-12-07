angular.module('angularSiteApp')
.factory('Auth', function ($http, Session){
    return {
      login: function (username, password){
          return $http.post('/login', {
              username: username,
              password: password
          }).then(function (data){
              if(data.data !== 'failure'){ 
                Session.create(data.data); 
                return 'success';
              }
              else{
                return 'failure';
              }
          });
      },
    };
});