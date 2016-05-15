myApp.controller('LoginCtrl', ['$scope', '$window', '$location', 'UserAuthFactory', 'AuthenticationFactory',
    function($scope, $window, $location, UserAuthFactory, AuthenticationFactory) {
        $scope.login = function() {
            var username = $scope.mailad,
                password = $scope.password;
            if (username !== undefined && password !== undefined) {
                UserAuthFactory.login(username, password).success(function(data) {

                    $window.sessionStorage.token = data.token;
                    $location.path("/");
                }).error(function(status) {
                    alert('Adresse/mot de passe incorrect');
                });
            } else {
                alert('Invalid credentials');
            }
        };
    }
]);

myApp.controller('SigninCtrl', ['$scope', '$window', '$location', 'UserAuthFactory', 'AuthenticationFactory',
      function($scope, $window, $location, UserAuthFactory, AuthenticationFactory) {
        $scope.signin = function() {
          if ($scope.mailad !== undefined && $scope.password !== undefined) {
              UserAuthFactory.signin($scope.mailad, $scope.password, $scope.confpassword,$scope.nomad,$scope.prenomad,$scope.date_naissad,$scope.telad).success(function(data) {
                  $location.path("/");
              }).error(function(status) {
                  alert('Oops something went wrong!');
              });
          } else {
             alert('Invalid credentials 1');
          }
          }
  }
]);
