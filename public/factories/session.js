
angular.module('angularSiteApp')
.service('Session', function () {  
    this.create = function (id){ this.id = id; };
    this.getId = function(){ return this.id; }
});