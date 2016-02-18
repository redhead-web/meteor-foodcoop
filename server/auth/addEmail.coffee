Meteor.methods
  "addEmail": (newEmail, oldEmail) ->
    check newEmail, String
    
    Accounts.addEmail @userId, newEmail
    
    Accounts.removeEmail @userId, oldEmail
    