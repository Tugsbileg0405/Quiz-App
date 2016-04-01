angular.module('starter.factory',[])

.factory('AuthService', function($http,$localStorage) {
  
  var service = {};
  isLogged:false,
  service.getAuthStatus = function() {
  	if($localStorage.userdata){
      return true;
    }
    else {
     return false;
   }	
 }
 
 return service;
 
});