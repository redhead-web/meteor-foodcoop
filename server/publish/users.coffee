Meteor.publish 'currentUser', ->
  if @userId?
    Meteor.users.find @userId,
      fields: 
        emails: 1 
        'services.facebook.id':1
        'services.facebook.email': 1
  else
    @ready()
    return

# Meteor.publish "basic-user", (id) ->
#   check id, String
#
#   Meteor.users.find {_id: id},
#     fields:
#       emails: 1
#       'services.facebook.id':1
#       'profile.name':1
#       'profile.companyName': 1
#       'profile.personalPic.result':1