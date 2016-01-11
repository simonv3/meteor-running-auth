angular.module('meteor-running-auth')
  .directive('mrRegisterForm', function ($state, $rootScope, $meteor) {
    return {
      restrict: 'A',
      scope: {},
      link: function($scope) {

        $scope.credentials = {
          email: '',
          password: ''
        };

        $scope.error = '';

        $scope.register = function () {
          $meteor.createUser($scope.credentials).then(
            function (response) {
              console.log($scope.currentUser);
              $scope.success = true;
            },
            function (err) {
              if (err.error === 'account-created') $state.go('register-success');
              $scope.error = err;
            }
          );
        };
      },
      templateUrl: '/packages/simonv3:meteor-running-auth/client/js/users/directives/register-form.ng.html',
    };
  });
