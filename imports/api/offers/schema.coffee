
exports.schema = new SimpleSchema
  request:
    type: String, regEx: SimpleSchema.RegEx.Id
  user:
    type: String, regEx: SimpleSchema.RegEx.Id
  name:
    type: String, max: 100
  companyName:
    type: String, optional: true, max: 400
  bid: type: Number, decimal: true
  quantity: type: Number, optional: true, min: 1
  status:
    type: String
    allowedValues: ['withdrawn', 'active', 'expired', 'aggregate', 'accepted']
    defaultValue: 'active'
  description: type: String, max: 2400
  dateCreated:
    type: Date
    defaultValue: new Date()
