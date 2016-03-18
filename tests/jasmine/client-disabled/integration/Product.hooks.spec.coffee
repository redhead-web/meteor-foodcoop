#
# describe "product upload on behalf as an admin", ->
#   beforeEach (done) ->
#     Meteor.subscribe 'list-of-producers', ->
#       console.log('subscribed to producers')
#       done()
#
#   it "should auto correct the producer name on insert", (done) ->
#     console.log "starting tests"
#     otherUser = Meteor.users.findOne('profile.name': "Sean Stanley Producer Role")
#
#     expect Meteor.users.find().count()
#     .toBe 2
#
#     expect otherUser
#     .toBeDefined()
#
#     expect otherUser._id
#     .not.toBe Meteor.userId()
#
#     console.log "finished testing users"
#
#     product =
#       {
#         name: 'Peaches',
#         producer: otherUser._id,
#         producerName: Meteor.user().profile.name,
#         price: 5,
#         unitOfMeasure: "kg",
#         category: "produce",
#         stocklevel: 50,
#         published: true
#       }
#
#     Products.insert product, (err, id) ->
#       expect(err).toBeUndefined()
#       console.log "inserted Product"
#
#       expect(id).toBeDefined()
#
#       p = Products.findOne(id)
#
#       expect p.producer
#       .toBe otherUser._id
#
#       expect p.producerName
#       .toBe "Sean Stanley Producer Role"
#
#       done()
#
#
#
