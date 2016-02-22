PrettyEmail.options =
  from: 'accounts@freshfoodcollective.com'
  logoUrl: '{{process.env.ROOT_URL}}/logo.png'
  companyName: 'Whangarei Food Co-op'
  companyUrl: process.env.ROOT_URL
  companyAddress: 'Whangarei, New Zealand'
  companyTelephone: '+1234567890'
  companyEmail: 'sean@foodcoop.nz'
  siteName: 'Whangarei Food Co-op ordering website'

PrettyEmail.defaults.enrollAccount =
  heading: "To start using our new ordering website, simply click below"
  buttonText: "Set a Password"

Accounts.urls.resetPassword = (token) ->
  return Meteor.absoluteUrl("reset-password/" + token)