myApp.controller("MembreCtrl", ['$scope', 'membreFactory','$routeParams','mydipFactory',
    function($scope, membreFactory, $routeParams,mydipFactory) {
        $scope.profil = [];
        // Access the factory and get the latest products list
        membreFactory.getOne($routeParams.id).then(function(data) {

             $scope.profil= data.data.rows[0];
             $scope.form=data.data.rows[0].formateur;
             mydipFactory.getOne($scope.profil.numad).then(function(data2) {
               $scope.profil.diplome=data2.data.rows;
               if($scope.profil.diplome.length==0){
                 $scope.nodip=true;
               }
        });
        $scope.formateur = function() {
          membreFactory.formateur($routeParams.id);
          $route.reload();
        }

});

    }
]);
myApp.controller("MembresCtrl", ['$scope', 'membreFactory',
    function($scope, membreFactory) {
        $scope.members = [];
        // Access the factory and get the latest products list
        membreFactory.getMembres().then(function(data) {

             $scope.members= data.data.rows;
        });
        $scope.currentPage = 0;
        $scope.pageSize = 10;
        $scope.numberOfPages=function(){
          return Math.ceil($scope.members.length/$scope.pageSize);
        }
    }
]);
myApp.controller("myProfileCtrl", ['$scope', 'membreFactory','$routeParams','mydipFactory',
    function($scope, membreFactory, $routeParams,mydipFactory) {
        $scope.profil = [];
        // Access the factory and get the latest products list
        membreFactory.getMy().then(function(data) {
             $scope.profil= data.data;
             mydipFactory.getOne($scope.profil.numad).then(function(data2) {
               $scope.profil.diplome=data2.data.rows;
               if($scope.profil.diplome.length==0){
                 $scope.nodip=true;
               }
        });
        });
    }
]);
