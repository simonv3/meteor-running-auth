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
  }
});
