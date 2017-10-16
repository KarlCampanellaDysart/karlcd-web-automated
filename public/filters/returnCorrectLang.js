angular.module('angularSiteApp')
.filter('returnCorrectLang', function(){
  return function(fileExtention){

  	if(fileExtention === 's'){return 'assembly'; }
  	else if(fileExtention === 'h'){ return 'C++'; }
  	else if(fileExtention === 'js'){ return 'javascript'; }
  	else if(fileExtention === 'm'){ return 'objective c'; }
  	else if(fileExtention === 'cpp') { return 'C++'; }
  	else if(fileExtention === 'py') { return 'python'; }
  	else if(fileExtention === 'c') { return 'C'; }
  	else{ return fileExtention; }

  };
});