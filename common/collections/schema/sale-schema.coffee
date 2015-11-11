saleSchema = new SimpleSchema
  qty: type: Number
  productId: type: String, regEx: SimpleSchema.RegEx.Id
  producerId: type: String, regEx: SimpleSchema.RegEx.Id
  price: type: Number, decimal: true
  productName: type: String
  packagingRefund: type: Number, decimal: true, optional:true
  packagingDescription: type: String, optional: true
  deliveryDay:
    type: Date
  orderId: type: String

Sales.attachSchema saleSchema
