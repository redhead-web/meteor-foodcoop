mailChimpList = new MailChimpLists Meteor.settings.MailChimp.apiKey

Meteor.methods
  "mailchimp/subscribe": (userId) ->
    # Check Fails because _id is present but is not defiend in the schema (facepalm)
    # check applicant, share.creditApplicationSchema
    user = Meteor.users.findOne userId
    check user.emails[0].address, String
    
    listId = Meteor.settings.MailChimp.listId 

    try
      result = mailChimpList.subscribe
        id: listId
        email: email: user.emails[0].address
        merge_vars:
          FNAME: user.profile.name.split(" ")[0]
          LNAME: user.profile.name.split(" ")[1]
          mc_notes:[
            note: "Subscribed from successful signup at foodcoop.nz"
            note: "#{user.profile.name}"
          ]
        "send_welcome": true
        "double_optin": false
      
      return result
    catch e
      throw new Meteor.Error 500, e.message, e.stack
    
