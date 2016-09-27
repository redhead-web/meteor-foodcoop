
{ Offers } = require './collection'

{ Meteor } = require 'meteor/meteor'

{ check, Match } = require 'meteor/check'

if Meteor.isServer

  Meteor.publish "offer", (_id) ->
    check _id, String
    Offers.find {_id}, {limit: 1}

  Meteor.publish "request-offers", (request, options) ->
    check request, String
    check options, Match.Optional Match.ObjectIncluding {
      sort: Match.Optional Object
      fields: Match.Optional Object
      skip: Match.Optional Match.Integer
      limit: Match.Optional Match.Integer
    }

    Offers.find {request}
    , options
