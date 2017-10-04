import moment from 'moment';


eventTodayReminder = ->
  if @isSimulation
    return
  event = Events.find(date:
    $gte: moment().startOf('day').toDate()
    $lt: moment().startOf('day').add(1, 'day').toDate()).forEach((event) ->

    if !event.attendees
      return
    ref = event.attendees
    i = 0
    len = ref.length

    while i < len
      attendee = ref[i]
      sent = Mailer.send(
        to: "#{attendee.name} <#{attendee.email}>"
        replyTo: "#{Meteor.settings.email.name} <#{Meteor.settings.email.address}>"
        subject: "#{event.title} at #{moment(event.date).format("h a")} today"
        template: 'eventReminder'
        data:
          event: event
          recipient: name: attendee.name)
      if !sent
        console.error "Event Reminder Message failed to send to #{attendee.name} at #{attendee.email}"
      i++
    return
  )
  return

Meteor.methods
  eventTodayReminder: eventTodayReminder

return
