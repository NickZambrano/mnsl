myApp.factory('membreFactory', function($http) {
    /** https://docs.angularjs.org/guide/providers **/
    var portLocal="http://localhost";
    var portDist="http://109.30.180.96"
    var urlBase = portDist+':3000/api/members';
    var _membFactory = {};
    _membFactory.getMembres = function() {
        return $http.get(urlBase);
    };
    _membFactory.getOne = function(id) {
        return $http.get(urlBase+"/"+id);
    };
    _membFactory.getMy = function() {

        return $http.get(portDist+":3000/api/myProfile");
    };
    _membFactory.formateur= function(id){
        return $http.post(urlBase+"/formateur/",{
          mailad:id
        });
    }
    return _membFactory;
});
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
myApp.factory('formFactory', function($http) {
    /** https://docs.angularjs.org/guide/providers **/
    var portLocal="http://localhost";
    var portDist="http://109.30.180.96"
    var urlBase = portDist+':3000/api/form';
    var _formFactory = {};
    return{
      getFormations:function(){
        return $http.get(urlBase);
      },
    addForm:function(typeformation,numdiplome,datedebformation,datefinformation,nbplace){
      return $http.post(urlBase+'/addform', {
          typeformation:typeformation,
          numdiplome:numdiplome,
          datedebformation:datedebformation,
          datefinformation:datefinformation,
          nbplace:nbplace
      });
    },
    validateForm:function(id, numformation){
      return $http.post(urlBase+'/validateForm', {
          numFormation:numformation,
          numAd:id
      });
    },
    getOne : function(id) {
        return $http.get(urlBase+"/"+id);
    },
    addParticipation:function(id){
      return $http.post(urlBase+'/addParticipation',{
        numFormation:id
      })
    },
    deleteParticipation:function(id){
      return $http.post(urlBase+'/deleteParticipation',{
        numFormation:id
      })
    },
    deleteForm:function(id){
      return $http.post(urlBase+'/deleteForm',{
        numFormation:id
      })
    },
    }
});
myApp.factory('HeaderFact',function($http){
  return{
    isAdmin:function(){
      var portLocal="http://localhost";
      var portDist="http://109.30.180.96"
      return $http.get(portDist+":3000/admin");
    },
  }

});
