# Meteor.publish 'mySubscriptions', ->
#   Subscriptions.find({user: this.userId}, {transactionId: 0})
#
# Meteor.publish 'myAutomaticPaymentSubscriptions', ->
#   Subscriptions.find({user:this.userId, ap:true})

Meteor.publish "myOrders", ->

  Counts.publish this, 'total', Orders.find({user: this.userId}, {fields: _id:1, transactionTotal:1}),
    noReady: true
    countFromField: 'transactionTotal'

  Orders.find
    user: this.userId

Meteor.publish "myPurchases", (deliveryDay) ->
  check deliveryDay, String

  Sales.find
    deliveryDay: new Date deliveryDay
    customerId: this.userId
  ,
    fields: dateCreated: 1, price: 1, productName: 1, qty: 1, productId: 1, producerId: 1, packagingRefund:1

Meteor.publish "users", ->

  Meteor.users.find {},
    fields: 'profile.name':1



Meteor.publish "mySales", (deliveryDay) ->
  check deliveryDay, String

  Sales.find
    deliveryDay: new Date deliveryDay
    producerId: this.userId
  ,
    fields:
      dateCreated: 1
      price: 1
      productName: 1
      qty: 1
      productId: 1
      customerId: 1
      customerName: 1
      customerNumber:1
      packagingRefund:1
      butchery: 1
