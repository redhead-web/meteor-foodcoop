saleSchema = new SimpleSchema
  qty: type: Number
  productId: type: String, regEx: SimpleSchema.RegEx.Id
  producerId: type: String, regEx: SimpleSchema.RegEx.Id
  price: type: Number, decimal: true
  productName: type: String
  packagingRefund: product.packagingRefund or 0
  packagingDescription: product.packagingDescription
  deliveryDay:
    type: Date
  orderId: type: String

Sales.attachSchema saleSchema
