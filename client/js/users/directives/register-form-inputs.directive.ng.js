angular.module('meteor-running-auth')
  .directive('mrRegisterFormInputs', function ($state, $rootScope, $meteor) {
    return {
      restrict: 'A',
      scope: {
        credentials: '='
      },
      link: function($scope) {

      },
      templateUrl: 'simonv3_meteor-running-auth_client/js/users/directives/register-form.ng.html',
    };
  });
