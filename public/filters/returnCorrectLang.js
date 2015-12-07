angular.module('angularSiteApp')
.filter('returnCorrectLang', function(){
  return function(fileExtention){

  	if(fileExtention === 's'){return 'assembly'; }
  	else if(fileExtention === 'h'){ return 'cpp in .h'; }
  	else if(fileExtention === 'js'){ return 'javascript'; }
  	else if(fileExtention === 'm'){ return 'objective c'; }
  	else{ return fileExtention; }

  };
});