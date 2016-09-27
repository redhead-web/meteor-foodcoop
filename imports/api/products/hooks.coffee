Products = require './collection'

Products.after.update (userId, doc, fieldNames, modifier, options) ->
  if doc.stocklevel? and doc.stocklevel <= 0 and @previous.stocklevel > 0
    if Meteor.isServer
      user = Meteor.users.findOne(doc.producer)
      
      Mailer.send
        to: "#{user.profile.name} <#{user.emails[0].address}>"
        subject: "#{doc.name} is sold out online"
        template: "soldOutMessage"
        data: {product:doc, producer: user}