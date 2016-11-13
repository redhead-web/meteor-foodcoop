deliverySchema = new SimpleSchema
  address:
    type: Object,
    blackbox: true,
  cost:
    type: Number,
    decimal: true,
  discount:
    type: Number,
    decimal: true,
    optional: true,
  discountId:
    type: String,
    optional: true,
  deliveryId: # store delivery setting id that sets the cost
    type: String
  method: # delivery setting title
    type: String
  notes:
    type: String
    optional: true

order = new SimpleSchema
  dateCreated:
    type: Date
    defaultValue: new Date()
  orderTotal: type: Number, decimal: true
  cardAmount: type: Number, decimal: true, defaultValue: 0
  balanceAmount: type: Number, decimal: true, defaultValue: 0
  cashAmount: type: Number, decimal: true, optional: true
  cashDeposited: type: Boolean, optional: true # bool flag to mark when an order has had cash deposited for it.
  dateDeposited: type: Date, optional: true

  status:
    type: String
    allowedValues: ['unpaid', 'paid', 'authroized', 'cancelled', 'refunded']
  cashDeposited: type: Boolean, optional: true
  user:
    type: String
    regEx: SimpleSchema.RegEx.Id
  transactionId:
    type: String
    optional:true
  delivery:
    type: deliverySchema
    optional: true

Orders.attachSchema order
