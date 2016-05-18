Events = require './collection'

certification = new SimpleSchema
  name: type: String
  img: type: String, optional: true

Schema = new SimpleSchema
  date:
    type: Date
    index: 1
  name:
    type: String
    max: 100
    index: 1
  venue:
    type: Object
    optional:true
    blackbox:true
  ticketPrice:
    type: Number
    min: 0
    decimal: true
    optional: true
  totalTickets:
    type: Number
    min:0
    optional: true
  ticketsRemaining:
    type: String
    index: 1
    min: 0
    optional: true
    autovalue: ->
      if @isInsert || !@isSet
        return @field('totalTickets').value
  
  attendees:
    type: [Object]
    optional: true
  'attendees.$.qty':
    type: Number
    min: 1
  'attendees.$.user':
    type: String
    regEx: SimpleSchema.RegEx.Id
  'attendees.$.timestamp':
    type: Date
  leadImg:
    type: Object
    label: "Product Image"
    optional:true
  'leadImg.result': type: String, label: "cloudinary public_id"
  'leadImg.url': type: String, label: "cloudinary url of image"
  description:
    type: String
    label: "Product Description"
    optional: true
    trim: false
    max: 2500
  dateCreated:
    type: Date
    defaultValue: new Date()
  daysNotice: type: Number, min: 0, optional: true # tickets can close a certain number of days before the event if necessary


Events.attachSchema Schema
