
{ Requests } = require './collection'

{ Meteor } = require 'meteor/meteor'

{ check } = require 'meteor/check'


if Meteor.isServer

  Meteor.publish "request", (_id) ->
    check requestId, String
    Requests.find {_id}, {limit: 1}
  
  Meteor.publish "requests", (options) ->  
    check options, Match.Optional Match.ObjectIncluding {
      sort: Match.Optional Object
      fields: Match.Optional Object
      skip: Match.Optional Match.Integer
      limit: Match.Optional Match.Integer
    }
    
    Requests.find {}
    , options
  