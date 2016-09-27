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
    fields: dateCreated: 1, price: 1, productName: 1, qty: 1, productId: 1, producerId: 1, producerName:1, producerCompanyName: 1, packagingRefund:1, extraMarkup: 1, status: 1

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
      status: 1
