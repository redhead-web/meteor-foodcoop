# product =
#   name: 'Plum Jam'
#   producer: Meteor.users.findOne()._id
#   producerName: Meteor.users.findOne().name
#   price: 5
#   unitOfMeasure: "400 g jar"
#   categories: ["processed goods", "jam", "fruit", "vegan"]
#   stocklevel: 50
#   published: true
#
#
# describe "Products Collection", ->
#
#   it "should be able to insert a very simple product", (done) ->
#
#     Products.insert product, (err, id) ->
#       expect(err).toBeNull()
#
#       expect(id).toBeDefined()
#
#       p = Products.findOne id
#
#       expect(p.published).toBe true
#       expect(p.name).toBe 'Plum Jam'
#       expect(p.price).toBe 5
#       done()
#
#   it "should decrease stock levels when a user adds an item to their cart", (done) ->
#     id = Products.insert product
#
#     Meteor.call "addToCart", product, 10, (error) ->
#       expect error
#       .toBeUndefined()
#       done()
