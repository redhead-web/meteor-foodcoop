# Meteor.publish 'mySubscriptions', ->
#   Subscriptions.find({user: this.userId}, {transactionId: 0})
#
# Meteor.publish 'myAutomaticPaymentSubscriptions', ->
#   Subscriptions.find({user:this.userId, ap:true})

# Meteor.publish "myOrders", (deliveryDay) ->
#   check deliveryDay, String
#
#   Orders.find
#     deliveryDay: new Date deliveryDay

Meteor.publish "myPurchases", (deliveryDay) ->
  check deliveryDay, String

  Sales.find
    deliveryDay: new Date deliveryDay
    customer: this.userId
  ,
    fields: dateCreated: 1, price: 1, productName: 1, qty: 1, productId: 1, producerId: 1, packagingRefund:1
