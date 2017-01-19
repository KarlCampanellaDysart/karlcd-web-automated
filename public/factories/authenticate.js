angular.module('angularSiteApp')
.factory('Auth', function ($http, $cookies){
    return {
      login: function (username, password){
          return $http.post('/login', {
              username: username,
              password: password
          }).then(function (data){
              if(data.data.success){ 
                $cookies.put('auth_token', data.data.token);
                return 'success'; 
              }
              else{
                return 'failure';
              }
          });
      },
    };
});