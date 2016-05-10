myApp.controller("HeaderCtrl", ['$scope', '$location', 'UserAuthFactory', 'AuthenticationFactory',
    function($scope, $location, UserAuthFactory,AuthenticationFactory) {


        $scope.isActive = function(route) {
            return route === $location.path();
        }
        $scope.logout = function() {
            UserAuthFactory.logout();
        }
    }
]);

myApp.controller("HomeCtrl", ['$scope',
  function($scope) {
    $scope.name = "Home Controller";
  }
]);

myApp.controller("Page1Ctrl", ['$scope',
  function($scope) {
    $scope.name = "Page1 Controller";
  }
]);

myApp.controller("Page2Ctrl", ['$scope',
  function($scope) {
    $scope.name = "Page2 Controller";
    // below data will be used by checkmark filter to show a ✓ or ✘ next to it
    $scope.list = ['yes', 'no', true, false, 1, 0];
  }
]);

/// snipp
myApp.controller("MembresCtrl", ['$scope', 'membreFactory',
    function($scope, membreFactory) {
        $scope.members = [];
        // Access the factory and get the latest products list
        membreFactory.getMembres().then(function(data) {

             $scope.members= data.data.rows;
        });
    }
]);

myApp.controller("MembreCtrl", ['$scope', 'membreFactory','$routeParams',
    function($scope, membreFactory, $routeParams) {
      console.log($routeParams.id);
        $scope.profil = [];
        // Access the factory and get the latest products list
        membreFactory.getOne($routeParams.id).then(function(data) {

             $scope.profil= data.data.rows[0];
        });
        membreFactory.update($scope.profil).then(function(data){

        });
    }
]);
