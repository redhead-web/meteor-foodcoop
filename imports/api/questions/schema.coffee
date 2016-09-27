questionOrAnswer = new SimpleSchema
  createdAt: type: Date
  user: type: Object
  'user.id': type: String, regEx: SimpleSchema.RegEx.Id
  'user.name': type: String, max: 100
  body: type: String, max: 2400


exports.schema = new SimpleSchema
  itemId:
    type: String, regEx: SimpleSchema.RegEx.Id
  question: type: questionOrAnswer
  answer: type: questionOrAnswer, optional: true
  createdAt:
    type: Date
    defaultValue: new Date()
