Schema = new SimpleSchema
  title:
    type: String
    max: 50
  location:
    type: String
    max: 200
  coords:
    type: Object
    label: "Map Coordinates for Google Maps"
    blackbox: true
    optional: true
    autoValue: ->
      location = @field('location')
      if Meteor.isServer and location.isSet
        geo = new GeoCoder
        result = geo.geocode location.value
        return result[0]
  dayOfTheWeek:
    type: String
    allowedValues: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    defaultValue: 'Tuesday'
    max: 20
  openHours:
    type: String
    regEx: /((\d+)|(\d+)(:\d+))(am|pm)-((\d+)|(\d+)(:\d+))(am|pm)/
    label: "Hours of Operation"
  description:
    type: String
    label: "Hub Description"
    optional: true
    max: 2000
  show:
    type: Boolean
    label: "Show popup window on map when page loads"
    defaultValue: false

Hubs.attachSchema Schema
