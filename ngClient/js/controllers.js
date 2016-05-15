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



myApp.controller("MembresCtrl", ['$scope', 'membreFactory',
    function($scope, membreFactory) {
        $scope.members = [];

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

myApp.controller("MembreCtrl", ['$scope', 'membreFactory','$routeParams','mydipFactory',
    function($scope, membreFactory, $routeParams,mydipFactory) {
        $scope.profil = [];

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
        }

});

    }
]);
myApp.controller("myProfileCtrl", ['$scope', 'membreFactory','$routeParams','mydipFactory',
    function($scope, membreFactory, $routeParams,mydipFactory) {
        $scope.profil = [];

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

myApp.controller("addFormCtrl", ['$scope','$location', 'dipFactory','formFactory','$filter',
    function($scope,$location,dipFactory, formFactory, $filter) {
        $scope.diplomes = [];

        dipFactory.getDiplomes().then(function(data) {

             $scope.diplomes= data.data.rows;
        });
        $scope.addForm = function() {
          if ($scope.typeformation !== undefined && $scope.numdiplome !== undefined) {

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
myApp.controller("FormationsCtrl", ['$scope', 'formFactory','$routeParams','$route','$location',
    function($scope, formFactory,$routeParams,$route,$location) {
        $scope.formations = [];
        $scope.formationDetails = [];
        $scope.voir='all';
        // Access the factory and get the latest products list
        formFactory.getFormations().then(function(data) {

             $scope.formationsAll= data.data.rows;
             $scope.formations= data.data.rows;

        });
        $scope.affichage=function(param){
          j=0;
          $scope.formations=[];
          if(param=="all"){
            $scope.formations=$scope.formationsAll;
          }else if (param=="encours") {
            for (i=0;i<$scope.formationsAll.length;i++){

              if($scope.formationsAll[i].encours){

                $scope.formations[j]=$scope.formationsAll[i];
                j++;
              }

            }
          }else if (param=="termine") {
            for (i=0;i<$scope.formationsAll.length;i++){
              if($scope.formationsAll[i].fini){
                $scope.formations[j]=$scope.formationsAll[i];
                j++;
              }
            }
          }else if(param=="dispo"){
            for (i=0;i<$scope.formationsAll.length;i++){
              if(!$scope.formationsAll[i].fini && !$scope.formationsAll[i].encours){
                $scope.formations[j]=$scope.formationsAll[i];
                j++;
              }
            }
          }

        };
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
      $scope.validateForm=function(id){
        formFactory.validateForm(id,$routeParams.id);
      }
    }
]);
