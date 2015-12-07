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
