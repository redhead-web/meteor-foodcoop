# Always upsert into this collection.

Likes = new Mongo.Collection('likes')
Likes.allow
  insert: (userId, doc) ->
    no
  update: (userId, doc, fieldNames, modifier) ->
    no
  remove: (userId, doc) ->
    doc.liker is userId
  fetch: [ 'liker' ]

schema = new SimpleSchema
  liker:
    type: String
    regEx: SimpleSchema.RegEx.Id
    index: 1
  likee:
    type: String
    regEx: SimpleSchema.RegEx.Id
    index: 1
  category:
    type: String
    index: 1

Likes.attachSchema schema
      
        
# schema.addValidator ->
#   likerField = @field('liker')
#   likeeField = @field('likee')
#   if likerField.isSet and likeeField.isSet
#     Meteor.call "/likes/uniqueLikePair", likerField.value, likeeField.value, (err, match) ->
#       unless match
#         return "uniqueLikePair"
#
# schema.messages
#   'uniqueLikePair':'You cannot like that user twice'

    
if Meteor.isServer

  # Meteor.methods
#     "/likes/uniqueLikePair": (liker, likee) ->
#       match = Likes.findOne
#         liker:liker
#         likee:likee
#       if match
#         return false
#       return true
   
  # get all the likes on a given target  anonymously
  Meteor.publish "targetLikes", (userId) ->
    Likes.find 
      likee: userId
    , fields: liker: 0
  
  # get all the likes anonymously
  Meteor.publish "allLikes", ->
    Likes.find {},
      fields: liker: 0
  # get all the currentUser's likes
  Meteor.publish "myLikes", ->
    if @userId
      Likes.find
        liker: @userId
    else
      @ready()


if Meteor.isClient
  Meteor.subscribe 'myLikes'
  
Meteor.methods
  "/likes/add": (likee, category) ->
    if @userId
      pair = 
        likee: likee
        liker: @userId
        category: category
      result = Likes.upsert pair, $set: pair
      result
    else 
      throw new Meteor.Error 401, "You must be logged in to register a like on something."
  