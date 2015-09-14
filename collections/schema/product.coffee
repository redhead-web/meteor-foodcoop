Schema = new SimpleSchema
  name:
    type: String
    max: 100
  price:
    type: Number
    min: 0
    decimal: true
  monthPrice:
    type: Number
    min: 0
    decimal: true
    optional: true
  img:
    type: String
    regEx: /(http|https):\/\/(localhost:3000|freshfoodcollective\.com)\/upload\/\w+\/product-[\s\S]+?\.\w+/
    label: "Product Image"
    optional:true
  thumb:
    type: String
    regEx: /(http|https):\/\/(localhost:3000|freshfoodcollective\.com)\/upload\/\w+\/product-[\s\S]+?\.\w+/
    label: "Product Thumbnail Image"
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

Products.attachSchema Schema
