angular.module('angularSiteApp')
.factory('mlab', function ($http){
    return {
		getProject: function(name){
			return $http.get('/mlab/'+name, function(data){
				return data;
			});
		},
		getAllProjects: function(){
			return $http.get('/mlab', function(data){
				return data;
			});
		}	
    };
});