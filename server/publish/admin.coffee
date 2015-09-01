

Meteor.publish 'userCount', ->
  Counts.publish this, 'userCount', Meteor.users.find()
  undefined

Meteor.publish 'orderCount', ->
  Counts.publish this, 'upcoming-ordersCount', Subscriptions.find
    status: 'active'
  ,
    countFromField: 'qty'
  undefined

Meteor.publish 'product-count', ->
  Counts.publish this, 'product-count', Products.find()
  undefined

Meteor.publish 'orders', ->
  if Roles.userIsInRole this.userId, 'admin'
    return Subscriptions.find()
  else
    console.log "cannot publish orders to non admin"

Meteor.publish "users-admin", (options) ->
  if options.fields?
    options.fields = {profile:1, emails:1, customerId:1}
  if Roles.userIsInRole this.userId, 'admin'
    return Meteor.users.find {}, options
