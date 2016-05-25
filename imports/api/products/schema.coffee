
certification = new SimpleSchema
  name: type: String
  img: type: String, optional: true

exports.schema = new SimpleSchema
  name:
    type: String
    max: 100
    index: 1
  producer:
    type: String
    regEx: SimpleSchema.RegEx.Id
    index: 1
  producerName:
    type: String
    max:50
  producerCompanyName:
    type: String
    max: 60
    optional:true
  price:
    type: Number
    min: 0
    decimal: true
  unitOfMeasure:
    type: String
    max:30
  category:
    type: String
    index: 1
  stocklevel:
    type: Number, min:0, optional: true
  carted:
    type: [Object]
    optional: true
  'carted.$.qty':
    type: Number
    min: 1
  'carted.$.user':
    type: String
    regEx: SimpleSchema.RegEx.Id
  'carted.$.timestamp':
    type: Date
  img:
    type: Object
    label: "Product Image"
    optional:true
  'img.result': type: String, label: "cloudinary public_id"
  'img.url': type: String, label: "cloudinary url of image"
  extraMarkup: type: Number, optional: true, decimal: true, min: 0 # e.g. 0.1 adds another 10% markup
  wholeSaleOnly:
    type: Boolean
    defaultValue: false
    optional:true
  published:
    type: Boolean
    defaultValue:false
  description:
    type: String
    label: "Product Description"
    optional: true
    trim: false
    max: 2500
  dateCreated:
    type: Date
    defaultValue: new Date()
  last_modified:
    optional: true
    type: Date
    autoValue: ->
      if @isUpdate
        new Date()
  certification: type: certification, optional: true
  butcheryForm: type: String, optional:true
  ingredients: type: [String], optional: true
  minimumOrder: type: Number, optional: true
  packagingDescription: type: String, optional:true
  packagingRefund: type: Number, decimal: yes, optional: true

  stockcode: type: String, max: 12, optional: true
  daysNotice: type: Number, min: 0, optional: true
  ###
   number of days notice needed for this order
   0 is same day (good for items in stock)
   1 is delivery day -1 (can order day before delivery day)
   2 is delivery day -2 (can order two days before delivery day) (Whangarei Default)
   5 is delivery day -5 (can order 5 days before delivery day or cannot order if less than 5 days till delivery day)
  ###

