
{ Events } = require './collection'

{ Meteor } = require 'meteor/meteor'

{ check } = require 'meteor/check'

{ moment } = require 'meteor/momentjs:moment'

if Meteor.isServer

  Meteor.publish "event", (eventId) ->
    Events.find {_id: eventId}, {limit: 1}
  
  Meteor.publish "upcoming-events", (options, date) ->
    if date
      check new Date(date), Date
    if options and not options.fields?
      options.fields =
        attendees: 0
        description: 0
      
    
    Events.find 
      date: $gte: new Date(date)
    , options
  