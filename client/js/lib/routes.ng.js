angular.module('meteor-running-auth').run(function($rootScope, $state) {

  Meteor.subscribe("userData");

  $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
    // We can catch the error thrown when the $requireUser promise is rejected

    // and redirect the user back to the main page
    if (error === 'UNAUTHORIZED' ||
        error === 'AUTH_REQUIRED' ||
        error === 'ALREADY_LOGGED_IN') {
      console.log('Uh oh, error', error, ', redirecting!')
      $state.go('index');
    }

    if (error === 'NOT_SET_UP')
      $state.go('setup');
  });

  $rootScope.$watch('currentUser', function() {
    if (!$rootScope.loggingIn && $rootScope.currentUser === null) {
      console.log('No user was found, so redirecting')
      $state.go('index');
    }
  });

});

angular.module('meteor-running-auth').config([
  '$urlRouterProvider', '$stateProvider', '$locationProvider',
  function ($urlRouterProvider, $stateProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $stateProvider
      .state('login', {
        url: '/auth/login',
        templateUrl: 'simonv3_meteor-running-auth_client/js/users/views/login.ng.html',
        controller: 'LoginCtrl',
        controllerAs: 'lc',
        resolve: {
          // 'currentUser': ["$meteor", function($meteor){
          //   return $meteor.requireValidUser(function(user) {
          //     if (user) return 'ALREADY_LOGGED_IN';
          //     return true;
          //   });
          // }]
        }
      })
      .state('register',{
        url: '/auth/register',
        templateUrl: 'simonv3_meteor-running-auth_client/js/users/views/register.ng.html',
        controller: 'RegisterCtrl',
        controllerAs: 'rc',
        resolve: {
          // 'currentUser': ["$meteor", function($meteor){
          //   return $meteor.requireValidUser(function(user) {
          //     if (user) return 'ALREADY_LOGGED_IN';
          //     return true;
          //   });
          // }]
        }
      })
      .state('register-success', {
        url: '/auth/register/success',
        templateUrl: 'simonv3_meteor-running-auth_client/js/users/views/register-success.ng.html',
        resolve: {
          // 'currentUser': ["$meteor", function($meteor){
          //   return $meteor.requireValidUser(function(user) {
          //     if (user) return 'ALREADY_LOGGED_IN';
          //     return true;
          //   });
          // }]
        }
      })
      .state('reset-password-sent', {
        url: '/auth/reset-password-sent',
        templateUrl: 'simonv3_meteor-running-auth_client/js/users/views/reset-password-email-sent.ng.html',
        resolve: {
          // 'currentUser': ["$meteor", function($meteor){
          //   return $meteor.requireValidUser(function(user) {
          //     if (user) return 'ALREADY_LOGGED_IN';
          //     return true;
          //   });
          // }]
        }
      })
      .state('reset-password', {
        url: '/auth/reset-password',
        templateUrl: 'simonv3_meteor-running-auth_client/js/users/views/reset-password.ng.html',
        controller: 'ResetPasswordCtrl',
        controllerAs: 'rpc'
      })
      .state('reset-password-with-token', {
        url: '/auth/reset-password/:token',
        templateUrl: 'simonv3_meteor-running-auth_client/js/users/views/reset-password.ng.html',
        controller: 'ResetPasswordCtrl',
        controllerAs: 'rpc'
      })
      .state('logout', {
        url: '/auth/logout',
        resolve: {
          "logout": ['$meteor', '$state', function($meteor, $state) {
            return $meteor.logout().then(function(){
              $state.go('index');
            }, function(err){
              console.log('logout error - ', err);
            });
          }]
        }
      });

    $urlRouterProvider.otherwise("/");
  }]);
