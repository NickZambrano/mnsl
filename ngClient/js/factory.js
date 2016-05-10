myApp.factory('membreFactory', function($http) {
    /** https://docs.angularjs.org/guide/providers **/
    var urlBase = 'http://109.30.180.96:3000/api/members';
    var _membFactory = {};
    _membFactory.getMembres = function() {
        return $http.get(urlBase);
    };
    _membFactory.getOne = function(id) {
        return $http.get(urlBase+"/"+id);
    };
    return _membFactory;
});
