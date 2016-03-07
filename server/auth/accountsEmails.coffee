PrettyEmail.defaults.enrollAccount =
  heading: "Even better co-op ordering, click below to get started"
  buttonText: "Set a new Password"
  subject: "Food Co-op Account moved to new website"

Accounts.urls.resetPassword = (token) ->
  return Meteor.absoluteUrl("reset-password/" + token)