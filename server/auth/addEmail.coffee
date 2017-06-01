Meteor.methods
  "addEmail": (userId, newEmail, oldEmail) ->
    check userId, String
    check newEmail, String

    if userId != @userId and not Roles.userIsInRole @userId, 'admin'
      throw new Meteor.Error 'addEmail', 'Unauthorized'
    try
      Accounts.addEmail userId, newEmail
      Accounts.removeEmail userId, oldEmail
    catch error
      throw new Meteor.Error 'addEmail', error.message


    return 201
