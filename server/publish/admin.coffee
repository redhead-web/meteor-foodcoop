

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

Meteor.publish 'orders', (options, start_date, end_date) ->
  check(start_date, String)
  check(end_date, String)


  if Roles.userIsInRole this.userId, 'admin'

    # Counts.publish this, 'filteredOrderCount', Subscriptions.find(
    #   $or: [
    #     {indefinate: true,
    #     $not: start_date: $gt: new Date(end_date).toISOString()}
    #
    #     end_date: $gte: new Date(start_date).toISOString()
    #   ]
    #
    # ), noReady: true

    return Subscriptions.find
    	$or: [
        {
          indefinate: true,
          start_date: $not: $gt: new Date(end_date)
        }

        end_date: $gte: new Date(start_date)
        start_date: $not: $gt: new Date(end_date)
      ]
  	 ,options
  else
    console.log "cannot publish orders to non admin"

Meteor.publish "user-list", (options, searchstring) ->
  unless searchstring?
    searchstring = ""

  options.fields =
    profile:1,
    emails:1,
    customerId:1,
    createdAt: 1

  if Roles.userIsInRole this.userId, 'admin'

    Counts.publish this, 'filteredUserCount', Meteor.users.find(
      'profile.name':
        '$regex': ".*#{searchstring}" or '' + '.*'
        '$options': 'i'
    ), noReady: true

    return Meteor.users.find
      'profile.name':
        '$regex': ".*#{searchstring}" or '' + '.*'
        '$options': 'i'
    , options

Meteor.publish "user", (userId) ->

  if Roles.userIsInRole this.userId, 'admin'
    Meteor.users.find
      _id: userId
    , {limit:1, fields: profile:1,emails:1, customerId:1, createdAt:1}
