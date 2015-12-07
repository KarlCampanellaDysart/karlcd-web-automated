angular.module('angularSiteApp')
.filter('trustHTML', function($sce){
  return function(stringToParse){
    return $sce.trustAsHtml(stringToParse);
  };
});