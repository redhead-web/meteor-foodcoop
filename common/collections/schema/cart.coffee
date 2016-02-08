schema = new SimpleSchema
  "userId":
    type: String
    regEx: SimpleSchema.RegEx.Id
    index: 1
    optional: true
  "deviceId":
    type: String
    regEx: SimpleSchema.RegEx.Id
    index: 1
    optional: true
  "productId":
    type: String
    regEx: SimpleSchema.RegEx.Id
  "details":
    type: Object
    blackbox: true
  "qty":
    type: Number
    min: 1

Cart.Items.attachSchema schema
