myApp.controller('LoginCtrl', ['$scope', '$window', '$location', 'UserAuthFactory', 'AuthenticationFactory',
    function($scope, $window, $location, UserAuthFactory, AuthenticationFactory) {
        $scope.login = function() {
            var username = $scope.mailad,
                password = $scope.password;
            if (username !== undefined && password !== undefined) {
                UserAuthFactory.login(username, password).success(function(data) {
                    AuthenticationFactory.isLogged = true;
                    AuthenticationFactory.user = data.user.mailad;
                    AuthenticationFactory.userRole = data.user.role;
                    $window.sessionStorage.token = data.token;
                    $window.sessionStorage.user = data.user.mailad; // to fetch the user details on refresh
                    $window.sessionStorage.userRole = data.user.role; // to fetch the user details on refresh
                    $location.path("/");
                }).error(function(status) {
                    alert('Oops something went wrong!');
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
