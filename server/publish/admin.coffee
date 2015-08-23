Meteor.publish 'userCount', ->
  Counts.publish this, 'userCount', Meteor.users.find()
  undefined

Meteor.publish 'orderCount', ->
  Counts.publish this, 'upcoming-ordersCount', Subscriptions.find
    status: 'active'
  ,
    countFromField: 'qty'
  undefined

Meteor.publish 'orders', ->
  unless date
    date = new Date

  Meteor.users.find({},
    'profile.subscriptions': 1
    'profile.name': 1
    'profile.hub': 1
    'profile.phone':1
    'emails':1
  )
