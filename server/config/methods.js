// In your server code: define a method that the client can call
Meteor.methods({
  sendEmail: function (to, from, subject, text) {
    if (Meteor.user() && Meteor.user().is_admin) {
      check([to, from, subject, text], [String]);

      // Let other method calls from the same client start running,
      // without waiting for the email sending to complete.
      this.unblock();

      Email.send({
        to: to,
        from: from,
        subject: subject,
        text: text
      });
    }
  },

  resendVerificationEmail: function(email) {
    var relevantUser = Meteor.users.findOne({ "emails.address" : email });
    Accounts.sendVerificationEmail(relevantUser._id, email);
  },

  isAdmin: function() {
    console.log('checking')
    if (Meteor.user()) {
      console.log('there is a user')
      if (Meteor.user().is_admin)
        return true;
      console.log('is not admin')

      if (Meteor.settings.public.isInSandstorm) {
        console.log('its in sandstorm')
        if(Meteor.user()) {
          console.log('theres a user')
          var sandstorm = Meteor.user().services.sandstorm;
          if (sandstorm && sandstorm.permissions.indexOf('owner') > -1) {
            console.log('found the owner')
            return true;
          }
        }
      }
    }
    console.log('returning false')
    return false;
  }
});
