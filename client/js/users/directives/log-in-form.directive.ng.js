angular.module('meteor-running-auth')
  .directive('mrLogInForm', function ($state, $rootScope, $meteor) {
    return {
      restrict: 'A',
      scope: {},
      link: function($scope) {

        $scope.credentials = {
          email: '',
          password: ''
        };

        $scope.error = '';

        $scope.sendEmailVerification = function() {
          Meteor.call('resendVerificationEmail', $scope.credentials.email);
        };

        $scope.login = function () {
          console.log('log in');
          $meteor.loginWithPassword($scope.credentials.email, $scope.credentials.password).then(
            function () {
              $state.go('index');
            },
            function (err) {
              $scope.error = err;
            }
          );
        };
      },
      templateUrl: '/packages/simonv3:meteor-running-auth/client/js/users/directives/log-in-form.ng.html',
    };
  });
