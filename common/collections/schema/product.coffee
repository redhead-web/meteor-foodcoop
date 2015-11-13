certification = new SimpleSchema
  name: type: String
  img: type: String

Schema = new SimpleSchema
  name:
    type: String
    max: 100
  producer:
    type: String
    regEx: SimpleSchema.RegEx.Id
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
    max:10
  categories:
    type: [String]
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
    type: String
    label: "Product Image"
    optional:true
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
    max: 2000
  dateCreated:
    type: Date
    defaultValue: new Date()
  certification: type: certification, optional: true
  butcheryForm: type: String, optional:true
  ingredients: type: [String], optional: true
  minimumOrder: type: Number, optional: true
  packagingDescription: type: String, optional:true
  packagingRefund: type: Number, decimal: yes, optional: true


Products.attachSchema Schema
