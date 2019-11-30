import { Meteor } from 'meteor/meteor'

import { check } from 'meteor/check'

import moment from 'moment-timezone'

import { Events } from './collection'

# moment.tz.setDefault(Meteor.settings.public.tz)

if Meteor.isServer

  Meteor.publish "event", (eventId) ->
    Events.find {_id: eventId}, {limit: 1}

  Meteor.publish "upcoming-events", (options, date = moment().format()) ->
    if date
      check new Date(date), Date
    if options and not options.fields?
      options.fields =
        attendees: 0
        description: 0


    Events.find
      date: $gte: new Date(date)
    , options
