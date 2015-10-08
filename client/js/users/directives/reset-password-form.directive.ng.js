angular.module('meteor-running-auth')
  .directive('mrResetPassword', function ($state, $stateParams, $rootScope, $meteor) {
    return {
      restrict: 'A',
      scope: {},
      link: function($scope) {

        $scope.token = $stateParams.token;

        $scope.credentials = {
          email: ''
        };

        $scope.newPassword = '';

        $scope.error = '';

        $scope.reset = function () {
          $meteor.forgotPassword($scope.credentials).then(
            function () {
              $state.go('reset-password-sent');
            },
            function (err) {
              $scope.error = err;
            }
          );
        };

        $scope.setNewPassword = function () {
          console.log($scope.newPassword);
          $meteor.resetPassword($scope.token, $scope.newPassword).then(
            function() {
              $state.go('index');
            },
            function (err) {
              $scope.error = err;
            });
        };
      },
      templateUrl: 'simonv3_meteor-running-auth_client/js/users/directives/reset-password-form.ng.html',
    };
  });
