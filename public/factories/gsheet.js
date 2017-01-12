angular.module('angularSiteApp')
.factory('Gsheet', function ($http){
    return {
		getAllPosts: function(){
			return $http.get('gsheet/posts', function(data){
				return data.data;
			});
		},
		getCourses: function(){
			return $http.get('gsheet/courses', function(data){
				return data.data;
			});
		},
		getExperience: function(){
			return $http.get('gsheet/experience', function(data){
				return data.data;
			});
		},
		getHackathons: function(){
			return $http.get('gsheet/hackathons', function(data){
				return data.data;
			});
		},
		getSkills: function(){
			return $http.get('gsheet/skills', function(data){
				return data.data;
			});
		},
		getWeb: function(){
			return $http.get('gsheet/web', function(data){
				return data.data;
			});
		}
    };
});
