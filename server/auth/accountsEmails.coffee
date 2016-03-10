PrettyEmail.defaults.enrollAccount =
  heading: "Want to sell to Kaikohe?"
  buttonText: "Get Started"

Accounts.urls.resetPassword = (token) ->
  return Meteor.absoluteUrl("reset-password/" + token)