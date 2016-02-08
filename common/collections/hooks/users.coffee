Meteor.users.after.insert (userId, doc) ->
  if Meteor.isServer
    if doc._id and process.env.METEOR_ENVIRONMENT == 'production'
      Meteor.call "mailchimp/subscribe", doc._id, (error, result) ->
        if error
          console.log "error", error
        if result
          console.log result.fresh
          console.log result.grocery