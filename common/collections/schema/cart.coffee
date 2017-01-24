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
    label: "Quantity"
    type: Number
    min: 1
  "reminderLevel":
    type: Number
    min: 0
    optional: true

Cart.Items.attachSchema schema
