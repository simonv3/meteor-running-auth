Meteor.startup(function () {

  Accounts.config({
    'sendVerificationEmail': true,
  });

  return Accounts.urls.resetPassword = function(token) {
    return Meteor.absoluteUrl('auth/reset-password/' + token);
  };

});
