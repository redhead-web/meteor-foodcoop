
Meteor.methods
  inviteUser: (user, producer) ->
    console.log user

    check user.profile.name, String
    check user.email, String


    userId = Accounts.createUser user

    if producer?
      Roles.addUsersToRoles userId, 'producer'
    Accounts.sendEnrollmentEmail userId
