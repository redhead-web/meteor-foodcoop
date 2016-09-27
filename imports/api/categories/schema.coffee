Products = require './collection'
# SimpleSchema = require 'meteor/aldeed:collection-2'

schema = new SimpleSchema
  name: type: String

Categories.attachSchema schema

