saleSchema = new SimpleSchema
  qty: type: Number
  producerId: type: String, regEx: SimpleSchema.RegEx.Id
  producerName: type: String
  producerNumber: type: Number
  price: type: Number, decimal: true
  productId: type: String, regEx: SimpleSchema.RegEx.Id
  productName: type: String
  unitOfMeasure: type: String
  deliveryDay:
    type: Date
  orderId: type: String
  customerId: type: String, regEx: SimpleSchema.RegEx.Id
  customerName: type: String
  customerNumber: type: Number
  packagingRefund: type: Number, decimal: true, optional:true
  packagingDescription: type: String, optional: true
  butchery: type: Object, optional: true, blackbox: true

Sales.attachSchema saleSchema
