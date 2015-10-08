Package.describe({
  name: 'simonv3:meteor-running-auth',
  version: '0.3.0',
  // Brief, one-line summary of the package.
  summary: 'Auth module for Meteor Running',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/simonv3/meteor-running-auth.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');

  api.use('mongo@1.1.0', ['client', 'server']);
  api.use('accounts-password@1.1.1');
  api.use('email@1.0.6', 'server');
  api.use('simonv3:meteor-running-models@0.0.2', ['client', 'server']);

  api.use('angular@1.0.1', 'client');

  api.addFiles('meteor-running-auth.js', 'client');

  var clientFiles = [
    // 'client/config/accounts.js',
    // 'client/js/directives/account-buttons.directive.ng.js',
    // 'client/js/directives/account-buttons.ng.html',
  //   'client/js/filters/displayName.js',
    'client/js/lib/routes.ng.js',
  //   'client/js/navbar/navBarCtrl.ng.js',
  //   'client/js/splash/controllers/splashCtrl.ng.js',
  //   'client/js/splash/views/splash.ng.html',
    'client/js/users/controllers/loginCtrl.ng.js',
    'client/js/users/controllers/registerCtrl.ng.js',
    'client/js/users/controllers/resetPasswordCtrl.ng.js',
    'client/js/users/directives/log-in-form.ng.html',
    'client/js/users/directives/log-in-form.directive.ng.js',
    'client/js/users/directives/reset-password-form.ng.html',
    'client/js/users/directives/reset-password-form.directive.ng.js',
    'client/js/users/directives/register-form.ng.html',
    'client/js/users/directives/register-form.directive.ng.js',
    'client/js/users/views/login.ng.html',
    'client/js/users/views/register-success.ng.html',
    'client/js/users/views/register.ng.html',
    'client/js/users/views/reset-password-email-sent.ng.html',
    'client/js/users/views/reset-password.ng.html',
  ];

  var serverFiles = [
    'server/config/accounts.js',
    'server/config/methods.js',
    'server/startup/initialDataLoad.js',
    'server/startup/setupSite.js',
  ];

  api.addFiles(clientFiles, 'client');
  api.addFiles(serverFiles, 'server');

});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('simonv3:meteor-running-auth');
  api.addFiles('meteor-running-auth-tests.js');
});
