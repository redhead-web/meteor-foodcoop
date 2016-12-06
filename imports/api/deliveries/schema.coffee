# SimpleSchema = require 'meteor/aldeed:collection-2'

exports.schema = new SimpleSchema
  dateCreated:
    type: Date
    defaultValue: new Date()
  last_modified:
    optional: true
    type: Date
    autoValue: ->
      if @isUpdate
        return new Date()
  address:
    type: String,
  userId:
    type: String,
  userName:
    type: String,
  customerNumber:
    type: String,
  deliveryDay:
    type: Date,
    index: true,
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
  courierName:
    type: String
    optional: true
  courierId:
    type: String
    optional: true
  status:
    type: String
    allowedValues: ['waiting for courier assignment', 'delivered', 'courier assigned', 'on-route']
    defaultValue: 'waiting for courier assignment'
  archived:
    type: Boolean
    defaultValue: false
