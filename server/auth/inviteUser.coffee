
Meteor.methods
  inviteUser: (user, wholesaleBuyer) ->
    console.log user

    check user.profile.name, String
    check user.email, String


    userId = Accounts.createUser user

    if wholesaleBuyer?
      Roles.addUsersToRoles userId, 'producer'
    Accounts.sendEnrollmentEmail userId
