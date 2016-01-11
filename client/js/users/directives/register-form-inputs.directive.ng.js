angular.module('meteor-running-auth')
  .directive('mrRegisterFormInputs', function ($state, $rootScope, $meteor) {
    return {
      restrict: 'A',
      scope: {
        credentials: '='
      },
      link: function($scope) {

      },
      templateUrl: '/packages/simonv3:meteor-running-auth/client/js/users/directives/register-form.ng.html',
    };
  });
