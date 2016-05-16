
myApp.factory('HeaderFact',function($http){
  return{
    isAdmin:function(){
      var portLocal="http://localhost";
      var portDist="http://109.30.180.96"
      return $http.get(portLocal+":3000/admin");
    },
  }

});
