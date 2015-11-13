# describe "shopping in the co-op", ->
#   it "should find two default products", ->
#     expect Products.find().count()
#     .toBe 2
#
#   # it "should find a logged in user", (done) ->
#   #   Meteor.call "isLoggedIn", (error, id) ->
#   #     expect id
#   #     .toBeDefined()
#   #     expect error
#   #     .toBeUndefined()
#   #
#   #     done()
#
#   it "should be able to add a product to the user's cart and subtract that quantity from stocklevels", (done) ->
#     product = Products.findOne name: 'Plum Jam'
#
#     stocklevel = product.stocklevel
#
#     expect stocklevel
#     .toBe 50
#
#     expect product.name
#     .toBeDefined()
#
#     Meteor.call "addToCart", product, 10, ->
#       user = Meteor.users.findOne 'profile.name': "Sean Stanley Master Role"
#
#       expect user.profile.cart.products.length
#       .toBe 1
#
#       expect stocklevel
#       .toBe 50
#
#       product = Products.findOne name: 'Plum Jam'
#
#       expect product.carted[0].user
#       .toBe user._id
#
#       expect product.stocklevel
#       .toBe 40
#
#       done()
#       return
