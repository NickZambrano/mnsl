var myApp = angular.module('ngclient', ['ngRoute']);
myApp.config(function($routeProvider, $httpProvider) {
    $httpProvider.interceptors.push('TokenInterceptor');
    $routeProvider
        .when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'LoginCtrl',
            access: {
                requiredLogin: false
            }
        }).when('/signin',{
          templateUrl: 'partials/signin.html',
          controller: 'SigninCtrl',
          access: {
              requiredLogin: false
          }


        }).when('/', {
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl',
            access: {
                requiredLogin: true
            }
        }).when('/diplomes', {
            templateUrl: 'partials/diplomes.html',
            controller: 'DiplomesCtrl',
            access: {
                requiredLogin: true
            }
        }).when('/Formations', {
            templateUrl: 'partials/formations.html',
            controller: 'FormationsCtrl',
            access: {
                requiredLogin: true
            }
        }).when('/membres', {
            templateUrl: 'partials/membres.html',
            controller: 'MembresCtrl',
            access: {
                requiredLogin: true
            }
        }).when('/membres/:id', {
            templateUrl: 'partials/profil.html',
            controller: 'MembreCtrl',
            access: {
                requiredLogin: true
            }
        }).when('/membres/edit/:id', {
            templateUrl: 'partials/edit.html',
            controller: 'MembreCtrl',
            access: {
                requiredLogin: true
            }
        }).when('/myProfile', {
            templateUrl: 'partials/myProfile.html',
            controller: 'myProfileCtrl',
            access: {
                requiredLogin: true
            }
        }).when('/addFormation', {
            templateUrl: 'partials/addFormation.html',
            controller: 'addFormCtrl',
            access: {
                requiredLogin: true
            }
        }).when('/addDiplome', {
            templateUrl: 'partials/addDiplome.html',
            controller: 'addDipCtrl',
            access: {
                requiredLogin: true
            }
        }).when('/insciption/:id', {
            templateUrl: 'partials/formations.html',
            controller: 'FormationsCtrl',
            access: {
                requiredLogin: true
            }
        }).when('/Formations/:id', {
            templateUrl: 'partials/voirForm.html',
            controller: 'FormationsCtrl',
            access: {
                requiredLogin: true
            }
        }).otherwise({
            redirectTo: '/login'
        });
});
myApp.run(function($rootScope, $window, $location, AuthenticationFactory,HeaderFact) {
    // when the page refreshes, check if the user is already logged in
    AuthenticationFactory.check();
    $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
        if ((nextRoute.access && nextRoute.access.requiredLogin) && !AuthenticationFactory.isLogged) {
            $location.path("/login");
        } else {
            // check if user object exists else fetch it. This is incase of a page refresh
            if (!AuthenticationFactory.user) AuthenticationFactory.user = $window.sessionStorage.user;
            if (!AuthenticationFactory.userRole) AuthenticationFactory.userRole = $window.sessionStorage.userRole;
        }
    });
    $rootScope.$on('$routeChangeSuccess', function(event, nextRoute, currentRoute) {
        $rootScope.showMenu = AuthenticationFactory.isLogged;
        $rootScope.role = AuthenticationFactory.userRole;
        $rootScope.admin=false;
        if(AuthenticationFactory.isLogged){
          HeaderFact.isAdmin().then(function(data){
            if(data.data.role=='admin'){
              $rootScope.admin=true;
            }else{
              $rootScope.admin=false;
            }
          })
          }
        // if the user is already logged in, take him to the home page
        if (AuthenticationFactory.isLogged == true && $location.path() == '/login') {
            $location.path('/');
        }
    });
});
