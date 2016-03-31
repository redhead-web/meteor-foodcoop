payment = new SimpleSchema
  dateCreated:
    type: Date
    defaultValue: new Date()
  amount: type: Number, decimal: true, min: 0
  method:
    type: String
    allowedValues: ['cash', 'internet banking', 'bitcoin', 'other']
  user:
    type: String
    regEx: SimpleSchema.RegEx.Id
  updateBalance:
    type: Boolean
    optional: true

Payments.attachSchema payment
