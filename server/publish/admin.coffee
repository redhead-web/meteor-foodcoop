Meteor.publish 'userCount', ->
  Counts.publish this, 'userCount', Meteor.users.find()

Meteor.publish 'orderCount', ->
  Counts.publish this, 'ordersCount', Meteor.users.find({
    'profile.subscriptions': $exists
    'profile.subscriptions':
      $elemMatch:
        status: 'active'
        $or: [
          end_date:
            $gte: new Date
          indefinate: true
        ]

  }, {
    'profile.subscriptions.qty': 1
    'profile.subscriptions.status': 1
    'profile.subscriptions.end_date': 1
    _id: 1
  })
  , {
    countFromField: (doc) -> _.reduce(doc.profile.subscriptions, (s, total) ->
      if s.status == 'active' and moment(s.end_date).isAfter(moment())
        total + s.qty
      else
        total
    , 0)
  }

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
