# SimpleSchema = require 'meteor/aldeed:collection-2'

exports.schema = new SimpleSchema
  title: type: String, max: 50
  cost: type: Number, decimal: true, min: 0, max: 100000
  description: type: String, max: 100
