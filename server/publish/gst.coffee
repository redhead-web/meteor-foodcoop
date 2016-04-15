Meteor.publish 'gst', (orderId) ->
  sales = undefined
  check orderId, String
  salesCursor = Sales.find({ orderId: orderId }, fields:
      packagingRefund: 0
      packagingDescription: 0)
  producers = salesCursor.map (s) -> return s.producerId
  products = salesCursor.map (s) -> return s.productId
  
  [
    salesCursor
    Orders.find(_id: orderId),
    Products.find({ _id: $in: products }, fields: 
      'img.result':1
    ),
    Meteor.users.find({ _id: $in: producers }, fields:
      'profile.name': 1
      'profile.companyName': 1
      'profile.gst': 1)
  ]