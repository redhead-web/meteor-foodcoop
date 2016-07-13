exports.schema = new SimpleSchema
  date:
    type: Date
    index: 1
  title:
    type: String
    max: 100
    index: 1
  fbEventId:
    type: String
    optional: true
  venue:
    type: Object
    optional:true
    blackbox:true
  ticketPrice:
    type: Number
    min: 0
    decimal: true
    optional: true
  ticketTotal:
    type: Number
    min:0
    optional: true
  ticketsRemaining:
    type: Number
    index: 1
    min: 0
    optional: true
    autoValue: ->
      if @isInsert || !@isSet
        return @field('ticketTotal').value

  attendees:
    type: [Object]
    optional: true
  'attendees.$.qty':
    type: Number
    min: 1
  'attendees.$.userId':
    type: String
    regEx: SimpleSchema.RegEx.Id
    optional: true
  'attendees.$.name':
    type: String
  'attendees.$.email':
    type: String
  'attendees.$.transactionIds':
    type: [String]
    optional: true
  'attendees.$.free':
    type: Boolean
    optional: true
  'attendees.$.boughtInPerson':
    type: Boolean
    optional: true
  'attendees.$.timestamp':
    type: Date
  img:
    type: Object
    label: "Product Image"
    optional:true
  'img.result': type: String, label: "cloudinary public_id"
  'img.url': type: String, label: "cloudinary url of image"
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
  contact: 
    type: Object
    optional: true
  "contact.call":
    type: String
  "contact.sms":
    type: String
  "contact.email":
    type: String
  "contact.facebook":
    type: String #1512866918959784 facebook id
