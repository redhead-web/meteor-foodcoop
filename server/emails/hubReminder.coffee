# Meteor.methods
#   hubReminder: () ->
#     day = moment().format('dddd')
#
#     Hubs.find({dayOfTheWeek: day})
#     .forEach (hub) ->
#
#       cursor = Meteor.users.find {"hub.id":hub.id}, fields: "profile.name":1, "emails.address":1
#
#       recipients = cursor.map (user) ->
#         sub = Subscriptions.findOne
#           "user":user._id,
#           "status": "active"
#           $or: [
#             {"indefinate":true},
#             {"end_date": $gte: moment().add(1,'day').startOf('day').toDate() }
#           ]
#         , fields: _id:1
#         if sub
#           return "#{user.profile.name} <#{user.emails[0].address}>"
#         else
#           ""
#
#       recipients = _.compact recipients
#
#       result = Mailer.send
#         bcc: recipients.join ", "
#         subject: "Collect your Order Today"
#         template: "hubReminder"
#         data: hub
#
#       if result
#         console.log "Successfully sent hub reminder email"
#       else
#         console.log "Failed to send Hub Reminder for #{hub.title}"
