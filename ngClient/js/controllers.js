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
        $scope.currentPage = 0;
        $scope.pageSize = 10;
        $scope.numberOfPages=function(){
          return Math.ceil($scope.members.length/$scope.pageSize);
        }
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

myApp.controller("addFormCtrl", ['$scope','$location', 'dipFactory','formFactory','$filter',
    function($scope,$location,dipFactory, formFactory, $filter) {
        $scope.diplomes = [];
        // Access the factory and get the latest products list
        dipFactory.getDiplomes().then(function(data) {

             $scope.diplomes= data.data.rows;
        });
        $scope.addForm = function() {
          if ($scope.typeformation !== undefined && $scope.numdiplome !== undefined) {
          //  datedeb=$scope.datedebformation.getDate().slice(-2)+"/"+("0" + ($scope.datedebformation.getMonth() + 1))+"/"+$scope.datedebformation.getFullYear();
          //  datefin=$scope.datefinformation.getDate().slice(-2)+"/"+("0" + ($scope.datefinformation.getMonth() + 1))+"/"+$scope.datefinformation.getFullYear();
            console.log($scope.datefinformation);
              formFactory.addForm($scope.typeformation,$scope.numdiplome,$scope.datedebformation,$scope.datefinformation ,$scope.nbplace).success(function(data) {
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
        $scope.currentPage = 0;
        $scope.pageSize = 10;
        $scope.numberOfPages=function(){
          return Math.ceil($scope.diplomes.length/$scope.pageSize);
        }
    }
]);
myApp.controller("FormationsCtrl", ['$scope', 'formFactory','$routeParams','$route','$location',
    function($scope, formFactory,$routeParams,$route,$location) {
        $scope.formations = [];
        $scope.formationDetails = [];
        $scope.voir='all';
        // Access the factory and get the latest products list
        formFactory.getFormations().then(function(data) {

             $scope.formations= data.data.rows;

        });
        $scope.currentPage = 0;
        $scope.pageSize = 3;
        $scope.numberOfPages=function(){
          return Math.ceil($scope.formations.length/$scope.pageSize);
        }
        if($routeParams.id!=undefined){
        formFactory.getOne($routeParams.id).then(function(data) {
            $scope.participate=data.data.participate;
            $scope.encours=data.data.encours;
            $scope.fini=data.data.fini;
            console.log(data.data);
            $scope.form=data.data.form;
              $scope.nopart=data.data.nopart;
             $scope.formationDetails= data.data.rows;
        }); }
        $scope.addPart=function(id){
          formFactory.addParticipation(id);
           $route.reload();
           formFactory.getOne($routeParams.id).then(function(data) {
               $scope.participate=data.data.participate;
               $scope.form=data.data.form;
               $scope.nopart=data.data.nopart;
                $scope.formationDetails= data.data.rows;
           });
    }
    $scope.deletePart=function(id){
      formFactory.deleteParticipation(id);
       $route.reload();
       formFactory.getOne($routeParams.id).then(function(data) {
           $scope.participate=data.data.participate;
           $scope.form=data.data.form;
           $scope.nopart=data.data.nopart;
            $scope.formationDetails= data.data.rows;
       });
       }
       $scope.deleteForm=function(){
         formFactory.deleteForm($routeParams.id);
         $location.path("/Formations");
}
    }
]);
