
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

myApp.controller("addMyDipCtrl", ['$scope','$location','mydipFactory','$routeParams','dipFactory',
    function($scope,$location, mydipFactory, $routeParams,dipFactory) {
      $scope.diplomes = [];
      // Access the factory and get the latest products list
      dipFactory.getDiplomes().then(function(data) {

           $scope.diplomes= data.data.rows;
      });
      $scope.addMyDip = function() {

        if ($scope.numdiplome !== undefined && $scope.dateObtention !== undefined) {
            mydipFactory.addDip($routeParams.id,$scope.numdiplome,$scope.dateObtention).success(function(data) {
              $location.path("/membres");
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
