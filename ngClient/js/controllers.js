myApp.controller("HeaderCtrl", ['$scope','$rootScope', '$location', 'UserAuthFactory', 'AuthenticationFactory','HeaderFact',
    function($scope,$rootScope, $location, UserAuthFactory,AuthenticationFactory, HeaderFact) {



        $scope.isActive = function(route) {
            return route === $location.path();
        }
        $scope.logout = function() {
          $rootScope.admin=false;
            UserAuthFactory.logout();
        }
    }
]);

myApp.controller("HomeCtrl", ['$scope',
  function($scope) {
    $scope.name = "Home Controller";
  }
]);

/// snipp


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
