myApp.factory('membreFactory', function($http) {
    /** https://docs.angularjs.org/guide/providers **/
    var portLocal="http://localhost";
    var portDist="http://109.30.180.96"
    var urlBase = portLocal+':3000/api/members';
    var _membFactory = {};
    _membFactory.getMembres = function() {
        return $http.get(urlBase);
    };
    _membFactory.getOne = function(id) {
        return $http.get(urlBase+"/"+id);
    };
    _membFactory.update= function(id){
        return $http.put(urlBase+"/update/"+id);
    }
    return _membFactory;
});
