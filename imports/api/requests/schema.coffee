creator = new SimpleSchema
  name: type: String
  companyName: type: String, optional: true
  creatorId: type: String, regEx: SimpleSchema.RegEx.Id


exports.schema = new SimpleSchema
  creator:
    type: creator
  title:
    type: String
    max: 100
  description:
    type: String
    label: "Product Description"
    optional: true
    trim: false
    max: 2500
  status:
    type: String
    allowedValues: ['open', 'closed', 'partial']
    defaultValue: 'open'
  price:
    type: Number
    min: 0
    max: 2
  shipping: type: String, max: 100
  deadline: type: Date, optional: true
  quantity: type: Number, optional: true, decimal: true, min: 0
  unitOfMeasure: type: String, max: 100, optional: true
  fixedPrice: type: Number, min: 0, decimal: true, optional: true
  dateCreated:
    type: Date
    defaultValue: new Date()
  
