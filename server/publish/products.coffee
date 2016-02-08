Meteor.publish "active-products", ->
  Products.find
    published: true
  ,
    fields:
      description: 0
      ingredients: 0
      
Meteor.publish "product", (id) ->
  Products.find
    _id: id
  , limit: 1
    
Meteor.publish "my-products", ->
  Products.find
    producer: @userId

Meteor.publish "all-products", ->
  Products.find