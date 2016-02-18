Meteor.publish "gst", (orderId) ->
  check orderId, String
  
  Sales.find orderId: orderId,
    fields: 
      packagingRefund: 0
      packagingDescription: 0
      