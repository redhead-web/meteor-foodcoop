Meteor.publish "products", ->
  Products.find
    published: true
    published: $exists: true
