import { increaseCartReminderLevel } from '../emails/cartReminder/cartReminder.coffee'

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
    # email producers their orders every day at 6am
    # and send out targeted reminders every day too.
    '0 6 * * *': ->
      Meteor.call "/email/early-shopping-reminder", callback


    # email producers their sale summaries every Tuesday at 6am
    '0 6 * * 2': ->
      Meteor.call "/email/producerOrder", callback

    # increment cart age every day at 7am
    '0 7 * * *': ->
      Cart.Items.find({ reminderLevel: { $gt: 3 } })
      .forEach((item) -> Meteor.call "removeFromCart", item._id )
      Meteor.call "/email/cartReminder"

    # check if event reminders need to be sent every day at 8am
    '0 8 * * *': ->
      Meteor.call "eventTodayReminder", callback

    '0 0 * * *': ->
      increaseCartReminderLevel()
