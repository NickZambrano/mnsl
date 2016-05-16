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
        $route.reload();
      }
      $scope.failedForm=function(id){
        formFactory.failedForm(id,$routeParams.id);
        $route.reload();
      }
    }
]);
