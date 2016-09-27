
{ Questions } = require './collection'

{ Meteor } = require 'meteor/meteor'

{ check, Match } = require 'meteor/check'

if Meteor.isServer

  Meteor.publish "question", (_id) ->
    check _id, String
    Questions.find {_id}, {limit: 1}
  
  Meteor.publish "item-questions", (itemId, options) ->
    check itemId, String
    check options, Match.Optional Match.ObjectIncluding {
      sort: Match.Optional Object
      fields: Match.Optional Object
      skip: Match.Optional Match.Integer
      limit: Match.Optional Match.Integer
    }
    
    Questions.find {itemId}
    , options
  