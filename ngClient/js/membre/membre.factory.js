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
