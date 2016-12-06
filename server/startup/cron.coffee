
callback = (error, result) ->
  if error
    console.error(error)
  if result
    console.log result


# Meteor.setTimeout ->
#
#   result = Meteor.call "/email/early-shopping-reminder"
#   console.log result
# , 3000

#if process.env.METEOR_ENVIRONMENT == 'production'
job = new Meteor.Cron
  events:
    # email producers their orders every day at 6am and send out targeted reminders every day too.
    '0 6 * * *': ->
      Meteor.call "/email/early-shopping-reminder", callback

      Meteor.call "/email/producerOrder", callback
    # email producers their sale summaries every day at 5am
    '0 5 * * 3': ->
      Meteor.call "/email/producerSalesWeeklySummary", callback
    # check if event reminders need to be sent every day at 8am
    '0 8 * * *': ->
      Meteor.call "eventTodayReminder", callback
