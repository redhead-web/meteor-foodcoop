Meteor.publish 'userCount', ->
  Counts.publish this, 'userCount', Meteor.users.find()
  undefined

Meteor.publish 'orderCount', ->
  Counts.publish this, 'upcoming-ordersCount', Sales.find
    deliveryDay: new Date GetDeliveryDay()
  undefined

Meteor.publish 'product-count', ->
  Products.find {}, fields: _id: 1

Meteor.publish 'order', (id) ->
  Orders.find _id:id

Meteor.publish 'orders', (deliveryDay) ->
  check(deliveryDay, String)

  if Roles.userIsInRole this.userId, 'admin'

    return Sales.find
      deliveryDay: new Date(deliveryDay)
  else
    console.log "cannot publish orders to non admin"

Meteor.publish "user-basics", () ->
  if Roles.userIsInRole this.userId, 'admin'
    Meteor.users.find {},
      fields:
        'profile.name':1
        'profile.customerNumber': 1
        'profile.companyName': 1
        'profile.personalPic.result':1
  else
    @ready()
    return

Meteor.publish "user-list", (options, searchstring) ->
  unless searchstring?
    searchstring = ""

  options.fields =
    emails:1,
    roles: 1,
    createdAt: 1
    'profile.name':1
    'profile.customerNumber': 1
    'profile.companyName': 1
    'profile.phone':1
    'profile.balance': 1

  if Roles.userIsInRole this.userId, 'admin'

    Counts.publish this, 'filteredUserCount', Meteor.users.find(
      'profile.name':
        '$regex': ".*#{searchstring}"
        '$options': 'i'
    ), noReady: true

    return Meteor.users.find
      'profile.name':
        '$regex': ".*#{searchstring}"
        '$options': 'i'
    , options

Meteor.publish "user", (user) ->

  if Roles.userIsInRole @userId, 'admin'
    Meteor.users.find
      _id: user
    , 
      limit:1
      fields: 
        emails:1
        createdAt:1
        roles:1
        profile:1
        'services.facebook.id':1
        'services.facebook.email': 1
  else
    @ready()
    return
        
