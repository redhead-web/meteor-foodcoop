# Always upsert into this collection.

Likes = new Mongo.Collection('likes')
Likes.allow
  insert: (userId, doc) ->
    no
  update: (userId, doc, fieldNames, modifier) ->
    no
  remove: (userId, doc) ->
    doc.liker is userId
  fetch: [ 'liker', 'likee' ]

schema = new SimpleSchema
  liker:
    type: String
    regEx: SimpleSchema.RegEx.Id
    index: 1
  likee:
    type: String
    regEx: SimpleSchema.RegEx.Id
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
      
  Meteor.publish "userLikes", (userId) ->
    Likes.find 
      likee: userId
    , fields: liker: 0
    
  Meteor.publish "allLikes", ->
    Likes.find {},
      fields: liker: 0
    
  Meteor.publish "myLikes", ->
    Likes.find
      liker: @userId


if Meteor.isClient
  Meteor.subscribe 'myLikes'
  
Meteor.methods
  "/likes/add": (likee) ->
    query = 
      likee: likee
      liker: @userId
    result = Likes.upsert query, $set: query
    result
  