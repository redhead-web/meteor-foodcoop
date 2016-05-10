
callback = (error, result) ->
  if error
    console.error(error)
  if result
    console.log result


# Meteor.setTimeout ->
#
#   Meteor.call "/email/producerOrder", (error, result) ->
#     if error
#       console.error(error)
#     if result
#       console.log result
# , 1000



#if process.env.METEOR_ENVIRONMENT == 'production'
job = new Meteor.Cron
  events: 
    # email producers their orders every night at Midnight and send out targeted reminders every day too. 
    '0 0 * * *': ->
      Meteor.call "/email/early-shopping-reminder", callback
        
      Meteor.call "/email/producerOrder", callback
    # email producers their sale summaries every night at midnight
    '0 0 * * 3': ->
      Meteor.call "/email/producerSalesWeeklySummary", callback
    
 