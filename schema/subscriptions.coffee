subscriptions = new SimpleSchema
  last_modified:
    type: Date
  status:
    type: String
    allowedValues: ['active', 'paused', 'cancelled', 'expiring', 'expired']
  productId:
    type: String
    regEx: SimpleSchema.RegEx.Id
  productDetails:
    type: Object
    blackbox: true
  qty:
    type: Number
    min: 1
  start_date:
    type: Date
  end_date:
    type: Date
    optional: true
  pause_date:
    type: Date
    optional: true
  indefinate:
    type: Boolean
    optional: true
  user:
    type: String
    regEx: SimpleSchema.RegEx.Id
