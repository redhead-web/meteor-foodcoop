import _ from 'lodash'

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

Meteor.publish 'customers', (deliveryDay) ->
  check(deliveryDay, String)

  if Roles.userIsInRole this.userId, 'admin'

    customers = _.uniq(
      Sales.find(
        { deliveryDay: new Date(deliveryDay) }
      ).map((sale) -> sale?.customerId)
    )

    return Meteor.users.find { _id: { $in: customers } },
        fields:
          'emails.address': 1,
          'profile.phone': 1,
          'profile.name': 1,
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
