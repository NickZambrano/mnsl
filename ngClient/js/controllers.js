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
        $scope.profil = [];
        // Access the factory and get the latest products list
        membreFactory.getOne($routeParams.id).then(function(data) {

             $scope.profil= data.data.rows[0];
        });
        membreFactory.update($scope.profil).then(function(data){

        });
    }
]);
myApp.controller("myProfileCtrl", ['$scope', 'membreFactory','$routeParams',
    function($scope, membreFactory, $routeParams) {
      console.log("test");
        $scope.profil = [];
        // Access the factory and get the latest products list
        membreFactory.getMy().then(function(data) {
             $scope.profil= data.data;
        });
    }
]);

myApp.controller("addFormCtrl", ['$scope','$location', 'dipFactory','formFactory',
    function($scope,$location,dipFactory, formFactory) {
        $scope.diplomes = [];
        // Access the factory and get the latest products list
        dipFactory.getDiplomes().then(function(data) {

             $scope.diplomes= data.data.rows;
        });
        $scope.addForm = function() {
          if ($scope.typeformation !== undefined && $scope.numdiplome !== undefined) {
              formFactory.addForm($scope.typeformation,$scope.numdiplome,$scope.datedebformation,$scope.datefinformation,$scope.nbplace).success(function(data) {
                $location.path("/Formations");
              }).error(function(status) {
                  alert('Oops something went wrong!');
              });
          } else {
             alert('Invalid credentials');
          }
    }}
]);
myApp.controller("addDipCtrl", ['$scope','$location','dipFactory','$routeParams',
    function($scope,$location, dipFactory, $routeParams) {
      $scope.addDip = function() {

        if ($scope.nomdiplome !== undefined && $scope.dureediplome !== undefined) {
            dipFactory.addDip($scope.nomdiplome,$scope.dureediplome).success(function(data) {
              $location.path("/diplomes");
            }).error(function(status) {
                alert('Oops something went wrong!');
            });
        } else {
           alert('Invalid credentials');
        }
        }
    }
]);
myApp.controller("DiplomesCtrl", ['$scope', 'dipFactory',
    function($scope, dipFactory) {
        $scope.diplomes = [];
        // Access the factory and get the latest products list
        dipFactory.getDiplomes().then(function(data) {

             $scope.diplomes= data.data.rows;
        });
    }
]);
myApp.controller("FormationsCtrl", ['$scope', 'formFactory','$routeParams',
    function($scope, formFactory,$routeParams) {
        $scope.formations = [];
        // Access the factory and get the latest products list
        formFactory.getFormations().then(function(data) {

             $scope.formations= data.data.rows;
        });
        $scope.addPart=function(id){
          console.log(id);
          formFactory.addParticipation(id);
    }
    }
]);
