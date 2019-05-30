
Meteor.methods
  "mailchimp/subscribe": (userId) ->
    # Check Fails because _id is present but is not defiend in the schema (facepalm)
    # check applicant, share.creditApplicationSchema
    user = Meteor.users.findOne userId
    check user.emails[0].address, String

    if Meteor.settings.MailChimp.apiKey
      mailChimpList = new MailChimpLists Meteor.settings.MailChimp.apiKey
    else
      return

    listId = Meteor.settings.MailChimp.listId

    result = mailChimpList.subscribe
      id: listId
      email: email: user.emails[0].address
      merge_vars:

        FNAME : user.profile.name.substr(0, user.profile.name.indexOf(' '))
        LNAME : user.profile.name.substr(user.profile.name.indexOf(' ')+1) || ''
        USER_TYPE : if Roles.userIsInRole(user._id, 'producer') then 'producer' else 'customer'

        mc_notes:[
          note: "Subscribed from successful signup at kaicoop.nz"
          note: "#{user.profile.name}"
        ]
      "send_welcome": false
      "double_optin": false

    result
