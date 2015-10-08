// Hijacking the login attempts on the account to make sure that
// the right conditions are met.
// TODO: this might need to be put in the meteor-running-admin package (since
// that is where setup happens).

Accounts.validateLoginAttempt(function(attemptInfo) {

  if (attemptInfo.type == 'resume') return true;

  if (attemptInfo.methodName == 'createUser' && !attemptInfo.error) {
    var numOfAdmin = Meteor.users.find({
      'is_admin': true
    }).count();
    if (attemptInfo.methodArguments[0].is_admin && numOfAdmin === 0) {
      return true;
    }
    throw new Meteor.Error('account-created', 'Verification e-mail sent.');
  }

  if (attemptInfo.methodName == 'login' && attemptInfo.allowed) {
    var verified = false;
    var email = attemptInfo.methodArguments[0].user.email;
    attemptInfo.user.emails.forEach(function(value, index) {
      if (email == value.address && value.verified) verified = true;
    });
    if (!verified) throw new Meteor.Error('verify-account', 'E-mail verification needed.');
  }

  return true;
});
