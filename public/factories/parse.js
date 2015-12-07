angular.module('angularSiteApp')
.factory('Parse', function ($http){

    var req = {
      method: 'GET',
      url: 'https://api.parse.com/1/classes/project',
      headers: {
        'X-Parse-Application-Id': '82n18ioLKCw3fLyxCcZyVVctFOHinYlYDOeUuqpz',
        'X-Parse-REST-API-Key':'zYYYfvJ6hNVcgDJZ9TH9WRwd8anSghfvtcxYLMV1'
      }
    }
    return {
      getAllProjects: function(){
        return $http(req, function(data){
          return data.data;
        });
      }
    };
});