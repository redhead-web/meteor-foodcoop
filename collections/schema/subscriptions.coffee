subscriptions = new SimpleSchema
  last_modified:
    type: Date
    autoValue: ->
      new Date()
  status:
    type: String
    allowedValues: ['active', 'paused', 'cancelled', 'expiring', 'expired', 'no payment received']
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
  cancelled_date:
    type: Date
    optional:true
  continuous:
    type: Boolean
    optional: true
  user:
    type: String
    regEx: SimpleSchema.RegEx.Id
  transactionId:
    type: String
    optional:true
  subscriptionId:
    type:String
    optional:true
  invoiceId:
    type: String
    optional: true
  ap:
    type:Boolean
    optional: true

Subscriptions.attachSchema subscriptions
