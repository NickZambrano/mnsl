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
    _membFactory.update= function(id){
        return $http.put(urlBase+"/update/"+id);
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
