{ Deliveries } = require '../../imports/api/deliveries'

Meteor.publish 'userCount', ->
  Counts.publish this, 'userCount', Meteor.users.find()
  @ready()
  undefined

Meteor.publish 'orderCount', ->
  Counts.publish this, 'upcoming-ordersCount', Sales.find
    deliveryDay: GetNextDeliveryDay().toDate()
  @ready()
  undefined

Meteor.publish 'deliveryCount', ->
  Counts.publish this, 'upcoming-deliveries', Deliveries.find
    deliveryDay: GetNextDeliveryDay().toDate()
  @ready()
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
    @ready()

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

Meteor.publish "cart-any-user", (userId) ->
  if Roles.userIsInRole @userId, 'admin'
    Cart.Items.find({userId: userId})
  else
    @ready()
    return

Meteor.publish "user-list", (options, searchstring) ->
  unless searchstring?
    searchstring = ""

  unless options?
    options = {}

  options.fields =
    emails:1,
    roles: 1,
    createdAt: 1
    'profile.name':1
    'profile.customerNumber': 1
    'profile.companyName': 1
    'profile.phone':1
    'profile.balance': 1
    'profile.bankAccount': 1

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
  else
    @ready()

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

Meteor.publish "cash-orders", () ->
  if Roles.userIsInRole @userId, 'admin'
    Orders.find cashAmount: $exists: 1
    ,
      sort: dateCreated: 1
      fields:
        cardAmount: 0
        balanceAmount: 0
  else
    @ready()
    return

Meteor.publish "userOrders", (userId) ->
  if Roles.userIsInRole @userId, 'admin'
    Orders.find user: userId
    ,
      sort: dateCreated: -1
