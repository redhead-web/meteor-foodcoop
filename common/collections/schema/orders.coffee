order = new SimpleSchema
  dateCreated:
    type: Date
    defaultValue: new Date()
  orderTotal: type: Number, decimal: true
  transactionTotal: type: Number, decimal: true
  status:
    type: String
    allowedValues: ['unpaid', 'paid', 'cancelled']
  user:
    type: String
    regEx: SimpleSchema.RegEx.Id
  transactionId:
    type: String
    optional:true

Orders.attachSchema order
