angular.module('angularSiteApp')
.factory('parse', function ($http){
    return {
		getProject: function(name){
			return $http.get('/parse/'+name, function(data){
				return data;
			});
		},
		getAllProjects: function(){
			return $http.get('/parse', function(data){
				return data;
			});
		}	
    };
});