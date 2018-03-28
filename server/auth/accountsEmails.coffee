Accounts.urls.resetPassword = (token) ->
  return Meteor.absoluteUrl("reset-password/" + token)
