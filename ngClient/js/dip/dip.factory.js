
myApp.factory('dipFactory', function($http) {
    /** https://docs.angularjs.org/guide/providers **/
    var portLocal="http://localhost";
    var portDist="http://109.30.180.96"
    var urlBase = portDist+':3000/api/dip';
    var _dipFactory = {};
    return{
      getDiplomes:function(){
        return $http.get(urlBase);
      },
    addDip:function(nomDiplome,dureeDiplome){

      return $http.post(portDist+':3000/api/dip/addDip', {
          nomDiplome:nomDiplome,
          dureeDiplome:dureeDiplome
      });
    },
    }
});
myApp.factory('mydipFactory', function($http) {
    /** https://docs.angularjs.org/guide/providers **/
    var portLocal="http://localhost";
    var portDist="http://109.30.180.96";
    return{
    addDip:function(id,numDiplome,dateObtention){
      return $http.post(portDist+':3000/api/dip/addMyDip', {
          numDiplome:numDiplome,
          dateObtention:dateObtention,
          numAd:id
      });
    },
      getOne:function(id){
        return $http.post(portDist+':3000/api/dip/getMyDip', {
          numAd:id
      });
    },
    }
});
