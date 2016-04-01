
    

#
# Meteor.setTimeout ->
#
#   Meteor.call "/email/producerOrder", (error, result) ->
#     if error
#       console.error(error)
#     if result
#       console.log result
# , 1000



if process.env.METEOR_ENVIRONMENT == 'production'
  job = new Meteor.Cron
    events: 
      # email producers their orders every Wednesday at Midnight 
      '0 0 * * 3': ->
        Meteor.call "/email/producerOrder", (error, result) ->
          if error
            console.error(error)
          if result
            console.log result
