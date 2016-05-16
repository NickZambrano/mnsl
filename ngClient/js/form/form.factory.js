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
    failedForm:function(id, numformation){
          return $http.post(urlBase+'/failedForm', {
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
