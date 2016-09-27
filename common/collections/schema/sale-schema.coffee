saleSchema = new SimpleSchema
  qty: type: Number
  producerId: type: String, regEx: SimpleSchema.RegEx.Id
  producerName: type: String
  producerNumber: type: Number
  price: type: Number, decimal: true
  gst: type: String, max: 30, optional: true #GST Number
  productId: type: String, regEx: SimpleSchema.RegEx.Id
  productName: type: String
  unitOfMeasure: type: String
  deliveryDay:
    type: Date
  dateCreated:
    type: Date
    defaultValue: new Date()
  orderId: type: String
  customerId: type: String, regEx: SimpleSchema.RegEx.Id
  customerName: type: String
  customerNumber: type: Number
  packagingRefund: type: Number, decimal: true, optional:true
  packagingDescription: type: String, optional: true
  extraMarkup: type: Number, decimal: true, optional: true
  status:
    type: String
    allowedValues: ['undelivered', 'sorted', 'collected', 'delivered', 'exchanged', 'cancelled', 'refunded']
    defaultValue: 'undelivered'
  daysNotice: type: Number, min: 0, optional: true 

Sales.attachSchema saleSchema
